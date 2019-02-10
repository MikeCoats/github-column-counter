#!/usr/bin/env node
/* jshint esversion: 6 */
'use strict';

const boost = require('apollo-boost');
const fetch = require('node-fetch');
const {argv} = require('yargs');

const Label = require('./models/label');
const Issue = require('./models/issue');
const Column = require('./models/column');

const queries = require('./queries');

function getArguments(env, argv) {
  return {
    token: env && env.TOKEN ? env.TOKEN : '',
    owner: argv && argv.owner ? argv.owner : '',
    repo: argv && argv.repo ? argv.repo : '',
    project: argv && argv.project ? argv.project : ''
  };
}

function parseColumns(columns) {
  const parsedCols = columns.nodes.map(x => {
    const issues = x.cards.nodes.map(y => {
      const labels = y.content.labels.nodes.map(z => {
        return new Label(z.name);
      });
      return new Issue(y.content.title, labels);
    });
    return new Column(x.name, issues);
  });
  return parsedCols;
}

async function main() {
  const theArgs = getArguments(process.env, argv);

  if (
    theArgs.token === '' ||
    theArgs.owner === '' ||
    theArgs.repo === '' ||
    theArgs.project === ''
  ) {
    console.error('Nope.');
    return;
  }

  const link = new boost.HttpLink({
    uri: 'https://api.github.com/graphql',
    fetch,
    headers: {
      authorization: `Bearer ${theArgs.token}`
    }
  });

  const client = new boost.ApolloClient({
    cache: new boost.InMemoryCache(),
    link
  });

  try {
    const result = await client.query({
      query: queries.ownerRepositoryProject(
        theArgs.owner,
        theArgs.repo,
        theArgs.project
      )
    });

    const columns = parseColumns(
      result.data.repository.projects.nodes[0].columns
    );

    columns.forEach(col => {
      console.log(`${col.name}: ${col.points}`);
    });
  } catch (error) {
    console.error(error);
  }
}

main();

module.exports = {getArguments, parseColumns};
