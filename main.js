#!/usr/bin/env node
/* jshint esversion: 6 */
'use strict'

const boost = require('apollo-boost')
const gql = require('graphql-tag')
const fetch = require('node-fetch')

class Label {
  constructor(name) {
    this.name = name
  }

  get points() {
    return 0
  }
}

class Issue {
  constructor(title, labels) {
    this.title = title
    this.labels = labels
  }

  get points() {
    return this.labels.reduce((pts, label) => pts + label.points)
  }
}

class Column {
  constructor(name, issues) {
    this.name = name
    this.issues = issues
  }

  get points() {
    return this.issues.reduce((pts, issue) => pts + issue.points)
  }
}

const cache = new boost.InMemoryCache()

const token = process.env.TOKEN
const owner = 'MikeCoats'
const repo = 'github-column-counter'
const project = 'Test Example Board'

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

const link = new boost.HttpLink({
  uri: 'https://api.github.com/graphql',
  fetch: fetch,
  headers: {
    authorization: `Bearer ${token}`
  }
})

const client = new boost.ApolloClient({ cache, link })

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

    console.log(JSON.stringify(columns))
    columns.forEach(col => {
      console.log(col.name + ': ' + JSON.stringify(col.points))
    })
  })
  .catch(err => console.error(err))
