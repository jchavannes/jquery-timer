function Test() {}

/**
 * @param {function} end
 */
Test.prototype.setEnd = function(end) {
    this.end = end;
};

/**
 * @throws Error
 */
Test.prototype.start = function() {
    throw new Error("Must override start.");
};

module.exports = Test;
