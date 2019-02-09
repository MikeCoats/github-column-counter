/* jshint esversion: 6 */
'use strict';

const gql = require('graphql-tag');

function ownerRepositoryProject(owner, repository, project) {
  return gql`
    {
      repository(owner: "${owner}", name: "${repository}") {
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
    `;
}

module.exports = {ownerRepositoryProject};
