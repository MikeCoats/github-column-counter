/* jshint esversion: 6 */
'use strict';

/**
 * A label on an issue.
 */
class Label {
  /**
   * Create a new label, with a supplied name.
   * @constructor
   * @param {string} name name of the label
   */
  constructor(name) {
    this.name = name;
  }

  /**
   * Get the number of points the label represents.
   */
  get points() {
    const labelSuffixRegex = /^(\d+)[\s-:]*(?:story?)?[\s-:]*(?:points?)?$/i;
    const labelPrefixRegex = /^(?:story?)?[\s-:]*(?:points?)?[\s-:]*(\d+)$/i;

    const suffixMatched = labelSuffixRegex.exec(this.name);
    if (suffixMatched && suffixMatched.length > 1) {
      const parsed = parseInt(suffixMatched[1], 10);
      if (!isNaN(parsed)) {
        return parsed;
      }
    }

    const labelPrefixResults = labelPrefixRegex.exec(this.name);
    if (labelPrefixResults && labelPrefixResults.length > 1) {
      const parsed = parseInt(labelPrefixResults[1], 10);
      if (!isNaN(parsed)) {
        return parsed;
      }
    }

    return 0;
  }
}

module.exports = Label;
