const test = require('ava');

const Issue = require('../../models/issue');
const Label = require('../../models/label');

test('an unconstructed issue should be undefined', t => {
  const iss = new Issue();
  t.is(iss.title, undefined);
  t.is(iss.labels, undefined);
});

test('an unconstructed issue should be 0 points', t => {
  const iss = new Issue();
  t.is(iss.points, 0);
});

test('a constructed, empty issue should be 0 points', t => {
  const iss = new Issue('issue', []);
  t.is(iss.points, 0);
});

test('a single label issue should be 3 points', t => {
  const iss = new Issue('issue', [new Label('3 points')]);
  t.is(iss.points, 3);
});

test('a single no scored label issue should be 0 points', t => {
  const iss = new Issue('issue', [new Label('no points')]);
  t.is(iss.points, 0);
});

test('a two label issue should be the larger which is 3 points', t => {
  const iss = new Issue('issue', [
    new Label('3 points'),
    new Label('2 points')
  ]);
  t.is(iss.points, 3);
});

test('a three label, two scored label issue should be the larger which is 3 points', t => {
  const iss = new Issue('issue', [
    new Label('3 points'),
    new Label('no points'),
    new Label('2 points')
  ]);
  t.is(iss.points, 3);
});
