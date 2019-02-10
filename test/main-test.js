const test = require('ava');

const main = require('../main');

test.beforeEach(t => {
  t.context = {
    // This is a valid response from the ownerRepositoryProject query.
    ownerRepositoryProject: {
      data: {
        repository: {
          projects: {
            nodes: [
              {
                columns: {
                  nodes: [
                    {
                      name: 'Backlog',
                      cards: {
                        nodes: [
                          {
                            content: {
                              title: 'Test Issue 10',
                              labels: {nodes: [{name: '2 points'}]}
                            }
                          },
                          {
                            content: {
                              title: 'Test Issue 9',
                              labels: {nodes: [{name: 'story-points-5'}]}
                            }
                          }
                        ]
                      }
                    },
                    {
                      name: 'In Progress',
                      cards: {
                        nodes: [
                          {
                            content: {
                              title: 'Test Issue 7',
                              labels: {
                                nodes: [{name: '1'}]
                              }
                            }
                          },
                          {
                            content: {
                              title: 'Test Issue 8',
                              labels: {
                                nodes: [{name: 'point-8'}]
                              }
                            }
                          }
                        ]
                      }
                    },
                    {
                      name: 'For Review',
                      cards: {
                        nodes: [
                          {
                            content: {
                              title: 'Test Issue 6',
                              labels: {
                                nodes: [{name: '2 points'}]
                              }
                            }
                          },
                          {
                            content: {
                              title: 'Test Issue 5',
                              labels: {
                                nodes: [
                                  {
                                    name: 'Story Points: 3'
                                  }
                                ]
                              }
                            }
                          },
                          {
                            content: {
                              title: 'Test Issue 4',
                              labels: {
                                nodes: [{name: 'point: 13'}]
                              }
                            }
                          }
                        ]
                      }
                    },
                    {
                      name: 'UAT',
                      cards: {
                        nodes: [
                          {
                            content: {
                              title: 'Test Issue 3',
                              labels: {
                                nodes: [{name: 'point-8'}]
                              }
                            }
                          }
                        ]
                      }
                    },
                    {
                      name: 'Done',
                      cards: {
                        nodes: [
                          {
                            content: {
                              title: 'Test Issue 2',
                              labels: {
                                nodes: [
                                  {
                                    name: 'story-points-5'
                                  }
                                ]
                              }
                            }
                          },
                          {
                            content: {
                              title: 'Test Issue 1',
                              labels: {
                                nodes: [
                                  {
                                    name: 'Story Points: 3'
                                  }
                                ]
                              }
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      }
    }
  };
});

test('valid owner repository project result parsed', t => {
  const validOwnerRepositoryProjectResult = t.context.ownerRepositoryProject;
  const cols = main.parseColumns(
    validOwnerRepositoryProjectResult.data.repository.projects.nodes[0].columns
  );
  t.is(cols.length, 5);

  t.is(cols[0].name, 'Backlog');
  t.is(cols[0].points, 7);
  t.is(cols[0].issues.length, 2);

  t.is(cols[1].name, 'In Progress');
  t.is(cols[1].points, 9);
  t.is(cols[1].issues.length, 2);

  t.is(cols[2].name, 'For Review');
  t.is(cols[2].points, 18);
  t.is(cols[2].issues.length, 3);

  t.is(cols[3].name, 'UAT');
  t.is(cols[3].points, 8);
  t.is(cols[3].issues.length, 1);

  t.is(cols[4].name, 'Done');
  t.is(cols[4].points, 8);
  t.is(cols[4].issues.length, 2);
});
