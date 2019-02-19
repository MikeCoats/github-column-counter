const test = require('ava');

const queries = require('../queries');

test('getting a query returns a gql document', t => {
  const q = queries.ownerRepositoryProject('test1', 'test2', 'test3');
  t.truthy(q);
  t.is(q.kind, 'Document');
});
