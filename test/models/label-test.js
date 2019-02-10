const test = require('ava');

const Label = require('../../models/label');

test('an unconstructed label should be undefined', t => {
  const lbl = new Label();
  t.is(lbl.name, undefined);
});

test('an unconstructed label should be 0 points', t => {
  const lbl = new Label();
  t.is(lbl.points, 0);
});

test('a constructed, unscored label should be 0 points', t => {
  const lbl = new Label('label');
  t.is(lbl.name, 'label');
  t.is(lbl.points, 0);
});

test('a label "0" should be 0 points', t => {
  const lbl = new Label('0');
  t.is(lbl.name, '0');
  t.is(lbl.points, 0);
});

test('a label "3" should be 3 points', t => {
  const lbl = new Label('3');
  t.is(lbl.points, 3);
});

// Points suffix

test('a label "3 points" should be 3 points"', t => {
  const lbl = new Label('3 points');
  t.is(lbl.points, 3);
});

test('a label "3-points" should be 3 points"', t => {
  const lbl = new Label('3-points');
  t.is(lbl.points, 3);
});

test('a label "3:points" should be 3 points"', t => {
  const lbl = new Label('3-points');
  t.is(lbl.points, 3);
});

test('a label "3 Points" should be 3 points"', t => {
  const lbl = new Label('3 Points');
  t.is(lbl.points, 3);
});

test('a label "3-Points" should be 3 points"', t => {
  const lbl = new Label('3-Points');
  t.is(lbl.points, 3);
});

test('a label "3:Points" should be 3 points"', t => {
  const lbl = new Label('3:Points');
  t.is(lbl.points, 3);
});

// Story Points suffix

test('a label "3 story points" should be 3 points"', t => {
  const lbl = new Label('3 story points');
  t.is(lbl.points, 3);
});

test('a label "3-story-points" should be 3 points"', t => {
  const lbl = new Label('3-story-points');
  t.is(lbl.points, 3);
});

test('a label "3:story points" should be 3 points"', t => {
  const lbl = new Label('3:story points');
  t.is(lbl.points, 3);
});

test('a label "3:story-points" should be 3 points"', t => {
  const lbl = new Label('3:story-points');
  t.is(lbl.points, 3);
});

test('a label "3 Story Points" should be 3 points"', t => {
  const lbl = new Label('3 Story Points');
  t.is(lbl.points, 3);
});

test('a label "3-Story-Points" should be 3 points"', t => {
  const lbl = new Label('3-Story-Points');
  t.is(lbl.points, 3);
});

test('a label "3:Story Points" should be 3 points"', t => {
  const lbl = new Label('3:Story Points');
  t.is(lbl.points, 3);
});

test('a label "3:Story-Points" should be 3 points"', t => {
  const lbl = new Label('3:Story-Points');
  t.is(lbl.points, 3);
});

// Points prefix

test('a label "points 3" should be 3 points"', t => {
  const lbl = new Label('points 3');
  t.is(lbl.points, 3);
});

test('a label "points-3" should be 3 points"', t => {
  const lbl = new Label('points-3');
  t.is(lbl.points, 3);
});

test('a label "points:3" should be 3 points"', t => {
  const lbl = new Label('points:3');
  t.is(lbl.points, 3);
});

test('a label "Points 3" should be 3 points"', t => {
  const lbl = new Label('Points 3');
  t.is(lbl.points, 3);
});

test('a label "Points-3" should be 3 points"', t => {
  const lbl = new Label('Points-3');
  t.is(lbl.points, 3);
});

test('a label "Points:3" should be 3 points"', t => {
  const lbl = new Label('Points:3');
  t.is(lbl.points, 3);
});

// Story Points prefix

test('a label "story points 3" should be 3 points"', t => {
  const lbl = new Label('story points 3');
  t.is(lbl.points, 3);
});

test('a label "story-points-3" should be 3 points"', t => {
  const lbl = new Label('story-points-3');
  t.is(lbl.points, 3);
});

test('a label "story points:3" should be 3 points"', t => {
  const lbl = new Label('story points:3');
  t.is(lbl.points, 3);
});

test('a label "story-points:3" should be 3 points"', t => {
  const lbl = new Label('story-points:3');
  t.is(lbl.points, 3);
});

test('a label "Story Points" should be 3 points"', t => {
  const lbl = new Label('Story Points 3');
  t.is(lbl.points, 3);
});

test('a label "Story-Points" should be 3 points"', t => {
  const lbl = new Label('Story-Points-3');
  t.is(lbl.points, 3);
});

test('a label "Story Points:3" should be 3 points"', t => {
  const lbl = new Label('Story Points:3');
  t.is(lbl.points, 3);
});

test('a label "Story-Points:3" should be 3 points"', t => {
  const lbl = new Label('Story-Points:3');
  t.is(lbl.points, 3);
});
