#!/usr/bin/env node
/* jshint esversion: 6 */

const boost = require('apollo-boost')
const gql = require('graphql-tag')
const fetch = require('node-fetch')

const cache = new boost.InMemoryCache()

const token = process.env.TOKEN
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
    query: gql`
      {
        repository(owner: "MikeCoats", name: "github-column-counter") {
          projects(orderBy: { field: CREATED_AT, direction: DESC }) {
            totalCount
          }
        }
      }
    `
  })
  .then(result => console.log(result))
  .catch(err => console.error(err))
