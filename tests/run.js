jQuery = {};
require("../jquery.timer.js");
var Test = require("./Test.js");
var TestManager = require("./TestManager.js");

var testManager = new TestManager();

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

function NoAutostartTest() {}
NoAutostartTest.prototype = new Test();
NoAutostartTest.prototype.start = function() {
    var self = this;
    var finish = function() {
        self.end("NoAutostartTest", true);
    };
    jQuery.timer(finish, 1000);
    setTimeout(finish, 2500);
};
testManager.add(NoAutostartTest);

function PlayTest() {}
PlayTest.prototype = new Test();
PlayTest.prototype.start = function() {
    var self = this;
    var timer = jQuery.timer();
    timer.set(function() {
        this.stop();
        self.end("PlayTest", true);
    }, 1000);
    timer.play();
};
testManager.add(PlayTest);

function PauseTest() {}
PauseTest.prototype = new Test();
PauseTest.prototype.start = function() {
    var self = this;
    var finish = function() {
        self.end("PauseTest", true);
    };
    var timer = jQuery.timer(finish, 1000, true);
    timer.pause();
    setTimeout(finish, 2500);
};
testManager.add(PauseTest);

function PausePlayTest() {}
PausePlayTest.prototype = new Test();
PausePlayTest.prototype.start = function() {
    var self = this;
    var finish = function() {
        this.stop();
        self.end("PausePlayTest", true);
    };
    var timer = jQuery.timer(finish, 1000, true);
    timer.pause();
    timer.play();
};
testManager.add(PausePlayTest);

function StopTest() {}
StopTest.prototype = new Test();
StopTest.prototype.start = function() {
    var self = this;
    var finish = function() {
        self.end("StopTest", true);
    };
    var timer = jQuery.timer(finish, 1000, true);
    timer.stop();
    setTimeout(finish, 2500);
};
testManager.add(StopTest);

function ToggleTest() {}
ToggleTest.prototype = new Test();
ToggleTest.prototype.start = function() {
    var self = this;
    var finish = function() {
        this.stop();
        self.end("ToggleTest", true);
    };
    var timer = jQuery.timer(finish, 1000);
    timer.toggle();
};
testManager.add(ToggleTest);

function ToggleNegativeTest() {}
ToggleNegativeTest.prototype = new Test();
ToggleNegativeTest.prototype.start = function() {
    var self = this;
    var finish = function() {
        self.end("ToggleNegativeTest", true);
    };
    var timer = jQuery.timer(finish, 1000, true);
    timer.toggle();
    setTimeout(finish, 2500);
};
testManager.add(ToggleNegativeTest);

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

function IsActiveTest() {}
IsActiveTest.prototype = new Test();
IsActiveTest.prototype.start = function() {
    var self = this;
    var timer = jQuery.timer(function() {}, 1000, true);
    if (timer.isActive) {
        self.end("IsActiveTest", true);
    }
    else {
        self.end("IsActiveTest", false);
    }
    timer.stop();
};
testManager.add(IsActiveTest);

function RemainingTest() {}
RemainingTest.prototype = new Test();
RemainingTest.prototype.start = function() {
    var self = this;
    var timer = jQuery.timer(function() {}, 1000, true);
    timer.pause();
    if (timer.remaining > 0) {
        self.end("RemainingTest", true);
    }
    else {
        self.end("RemainingTest", false);
    }
};
testManager.add(RemainingTest);

testManager.run();
