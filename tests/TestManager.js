function TestManager() {
    /** @type {Test[]} this.tests */
    this.tests = [];
    this.finished = 0;
    this.finishedSuccessfully = 0;
    this.timeout = null;
    this.finishedNames = [];
}

/**
 * @param {Test} test
 */
TestManager.prototype.add = function(test) {
    this.tests.push(test);
};

TestManager.prototype.run = function() {
    var test;
    var self = this;
    var timeout = 10;
    this.timeout = setTimeout(function() {
        if (self.finished === self.tests.length) {
            console.log(self.finishedSuccessfully + " of " + self.finished + " tests successful.");
            if (self.finishedSuccessfully === self.finished) {
                process.exit(0);
            }
        }
        console.log("FAILURE: Tests did not finish successfully.");
        process.exit(1);
    }, timeout * 1000);
    for (var i = 0; i < this.tests.length; i++) {
        test = new this.tests[i]();
        test.setEnd(function() {
          self.end.apply(self, arguments);
        });
        test.start();
    }
};

/**
 * @param {string} name
 * @param {bool} success
 * @throws Error
 */
TestManager.prototype.end = function(name, success) {
    this.finished++;
    if (this.finishedNames.indexOf(name) !== -1) {
        throw new Error(name + " already ended. Cannot call end again.");
    }
    this.finishedNames.push(name);
    if (success === true) {
        this.finishedSuccessfully++;
        console.log("Finished successfully: " + name);
    }
    else {
      console.log("Failed: " + name);
    }
};

module.exports = TestManager;
