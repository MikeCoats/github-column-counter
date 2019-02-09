/* jshint esversion: 6 */
'use strict';

/**
 * A column on a project board.
 */
class Column {
  /**
   * Create a new column, with a supplied name and list of issues.
   * @constructor
   * @param {string} name name of the column
   * @param {Issue[]} issues list of issues in the column
   */
  constructor(name, issues) {
    this.name = name;
    this.issues = issues;
  }

  /**
   * Get the total number of points in the issues in the column.
   */
  get points() {
    if (this.issues) {
      return this.issues.reduce((pts, issue) => pts + issue.points, 0);
    }

    return 0;
  }
}

module.exports = Column;
