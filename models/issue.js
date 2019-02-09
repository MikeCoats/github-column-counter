/* jshint esversion: 6 */
'use strict';

/**
 * An issue in a column.
 */
class Issue {
  /**
   * Create a new issue, with a supplied title and list of labels.
   * @constructor
   * @param {string} title title of the issue
   * @param {Label[]} labels list of labels on the issue
   */
  constructor(title, labels) {
    this.title = title;
    this.labels = labels;
  }

  /**
   * Get the maximum number of points in the labels on the issue.
   */
  get points() {
    if (this.labels) {
      return this.labels.reduce((pts, label) => Math.max(pts, label.points), 0);
    }

    return 0;
  }
}

module.exports = Issue;
