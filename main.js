#!/usr/bin/env node
/* jshint esversion: 6 */
'use strict'

const boost = require('apollo-boost')
const gql = require('graphql-tag')
const fetch = require('node-fetch')
const argv = require('yargs').argv

const Label = require('./models/label');
const Issue = require('./models/issue');
const Column = require('./models/column');


// Try to get the auth token from the environment.
let token = ''
if(process.env.TOKEN) {
  token = process.env.TOKEN
}

// Try to get the owner from the command line.
let owner = ''
if(argv.owner) {
  owner = argv.owner
}

// Try to get the repository from the command line.
let repo = ''
if(argv.repo) {
  repo = argv.repo
}

// Try to get the project from the command line.
let project = ''
if(argv.project) {
  project = argv.project
}

// This is a query that gets the columns, issues & labels from a
// repository-level project.
const repoProjectQuery = gql`
{
  repository(owner: "${owner}", name: "${repo}") {
    projects(orderBy: { field: CREATED_AT, direction: DESC }, search:"${project}", first: 1) {
      nodes {
        columns(first:10) {
          nodes {
            name, cards(first:100) {
              nodes {
                content {
                   ... on Issue {
                    title, labels(first:10) {
                      nodes {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`

// Establish a link for Apollo connecting to the GitHub API using the supplied
// fetch library as we're using node---not a browser--- with a token for
// authentication.
const link = new boost.HttpLink({
  uri: 'https://api.github.com/graphql',
  fetch: fetch,
  headers: {
    authorization: `Bearer ${token}`
  }
})

// Create a new client using a memory based cache over the link.
const client = new boost.ApolloClient({
  cache: new boost.InMemoryCache(),
  link
})

// Get the results of the query, then parse the returned data into a collection
// of objects. We then use the getter methods on the objects to map-reduce our
// way to a list of columns and totals.
client
  .query({
    query: repoProjectQuery
  })
  .then(result => {
    const columns = result.data.repository.projects.nodes[0].columns.nodes.map(
      x => {
        const issues = x.cards.nodes.map(y => {
          const labels = y.content.labels.nodes.map(z => {
            return new Label(z.name)
          })
          return new Issue(y.content.title, labels)
        })
        return new Column(x.name, issues)
      }
    )

    columns.forEach(col => {
      console.log(`${col.name}: ${col.points}`)
    })
  })
  .catch(err => console.error(err))
