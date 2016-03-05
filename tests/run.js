jQuery = {};
require("../jquery.timer.js");
var Test = require("./Test.js");
var TestManager = require("./TestManager.js");

var testManager = new TestManager();

function NoAutostartTest() {}
NoAutostartTest.prototype = new Test();
NoAutostartTest.prototype.start = function() {
    var self = this;
    jQuery.timer(function() {
        this.stop();
        self.end("NoAutostartTest", true);
    }, 1000, true)
};
testManager.add(NoAutostartTest);

function FunctionTest() {}
FunctionTest.prototype = new Test();
FunctionTest.prototype.start = function() {
    var self = this;
    jQuery.timer(function() {
        this.stop();
        self.end("FunctionTest", true);
    }, 1000, true)
};
testManager.add(FunctionTest);

function ObjectTest() {}
ObjectTest.prototype = new Test();
ObjectTest.prototype.start = function() {
    var self = this;
    jQuery.timer({
        action: function() {
            this.stop();
            self.end("ObjectTest", true);
        },
        time: 1000,
        autostart: true
    });
};
testManager.add(ObjectTest);

function SetFunctionTest() {}
SetFunctionTest.prototype = new Test();
SetFunctionTest.prototype.start = function() {
    var self = this;
    var timer = jQuery.timer();
    timer.set(function() {
        this.stop();
        self.end("SetFunctionTest", true);
    }, 1000, true);
};
testManager.add(SetFunctionTest);

function SetObjectTest() {}
SetObjectTest.prototype = new Test();
SetObjectTest.prototype.start = function() {
    var self = this;
    var timer = jQuery.timer();
    timer.set({
        action: function() {
            this.stop();
            self.end("SetObjectTest", true);
        },
        time: 1000,
        autostart: true
    });
};
testManager.add(SetObjectTest);

function PlayTest() {}
PlayTest.prototype = new Test();
PlayTest.prototype.start = function() {
    var self = this;
    var timer = jQuery.timer();
    timer.set(function() {
        this.stop();
        self.end("PlayTest", true);
    });
    timer.play();
};
testManager.add(PlayTest);

function OnceTest() {}
OnceTest.prototype = new Test();
OnceTest.prototype.start = function() {
    var self = this;
    var timer = jQuery.timer(function() {
        self.end("OnceTest", true);
    });
    timer.once();
};
testManager.add(OnceTest);

testManager.run();
