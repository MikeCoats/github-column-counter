const test = require('ava');

const Column = require('../../models/column');
const Issue = require('../../models/issue');
const Label = require('../../models/label');

test('an unconstructed column should be undefined', t => {
  const col = new Column();
  t.is(col.name, undefined);
  t.is(col.issues, undefined);
});

test('an unconstructed column should be 0 points', t => {
  const col = new Column();
  t.is(col.points, 0);
});

test('a constructed, empty column should be 0 points', t => {
  const col = new Column('column', []);
  t.is(col.points, 0);
});

test('a constructed, column with an empty issue should be 0 points', t => {
  const col = new Column('column', [new Issue()]);
  t.is(col.points, 0);
});

test('a constructed, column with an issue with an empty label should be 0 points', t => {
  const col = new Column('column', [new Issue('issue', [new Label()])]);
  t.is(col.points, 0);
});

test('a constructed, column with an issue with an 8 point label should be 8 points', t => {
  const col = new Column('column', [
    new Issue('issue', [new Label('story points: 8')])
  ]);
  t.is(col.points, 8);
});

test('a constructed, column with two scored issues should be 8 points', t => {
  const col = new Column('column', [
    new Issue('issue', [new Label('story points: 5')]),
    new Issue('issue', [new Label('3-points')])
  ]);
  t.is(col.points, 8);
});

test('a constructed, column with three issues, two scored, should be 13 points', t => {
  const col = new Column('column', [
    new Issue('issue', [new Label('8-points')]),
    new Issue('issue', [new Label('Story Points: Woo!')]),
    new Issue('issue', [new Label('5-points')])
  ]);
  t.is(col.points, 13);
});
