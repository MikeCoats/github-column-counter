#!/usr/bin/env node
/* jshint esversion: 6 */

const boost = require('apollo-boost')
const gql = require('graphql-tag')
const fetch = require('node-fetch')

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
                    labels(first:10) {
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
    console.log(result.data)

    const columns = result.data.repository.projects.nodes[0].columns.nodes.map(
      x => {
        return x.name
      }
    )

    console.log(columns)
  })
  .catch(err => console.error(err))
