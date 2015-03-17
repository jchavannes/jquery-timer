/**
 * jquery.timer.js
 *
 * Copyright (c) 2011 Jason Chavannes <jason.chavannes@gmail.com>
 *
 * http://jchavannes.com/jquery-timer
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
 * BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

;(function($) {

    $.timer     = Timer;
    $.stopwatch = Stopwatch;
    $.countdown = Countdown;

    $.timerUtil = {
        pad: pad,
        formatTime: formatTime
    };

    /**
     * First parameter can either be a function or an object of parameters.
     *
     * @param {function | {
     *   action: function,
     *   time: int=,
     *   autostart: boolean=
     * }} action
     * @param {int=} time
     * @param {boolean=} autostart
     * @returns {Timer}
     */
    function Timer(action, time, autostart) {

        if (typeof this == "function" || this.init) {
            return new Timer(action, time, autostart);
        }

        this.set(action, time, autostart);

        return this;

    }

    /**
     * @see Timer
     *
     * @param {function | {
     *   action: function,
     *   time: int=,
     *   autostart: boolean=
     * }} action
     * @param {int=} time
     * @param {boolean=} autostart
     * @returns {Timer}
     */
    Timer.prototype.set = function(action, time, autostart) {

        this.init = true;

        if (typeof action == "object") {

            if (action.time) {
                time = action.time;
            }

            if (action.autostart) {
                autostart = action.autostart;
            }

            action = action.action;

        }

        if (typeof action == "function") {
            this.action = action;
        }

        if (!isNaN(time)) {
            this.intervalTime = time;
        }

        if (autostart && this.isReadyToStart()) {
            this.isActive = true;
            this.setTimer();
        }

        return this;

    };

    Timer.prototype.isReadyToStart = function() {

        var notActive = !this.active;
        var hasAction = typeof this.action == "function";
        var hasTime   = !isNaN(this.intervalTime);

        return notActive && hasAction && hasTime;

    };

    /**
     * @param {int=} time
     * @returns {Timer}
     */
    Timer.prototype.once = function(time) {

        var timer = this;

        if (isNaN(time)) {
            timer.action();
            return this;
        }

        window.setTimeout(fnTimeout, time);
        return this;

        function fnTimeout() {
            timer.action();
        }

    };

    /**
     * @param {boolean=} reset
     * @returns {Timer}
     */
    Timer.prototype.play = function(reset) {

        if (this.isReadyToStart()) {

            if (reset) {
                this.setTimer();
            }
            else {
                this.setTimer(this.remaining);
            }

            this.isActive = true;

        }

        return this;

    };

    /**
     * @returns {Timer}
     */
    Timer.prototype.pause = function() {

        if (this.isActive) {

            this.isActive   = false;
            this.remaining -= new Date() - this.last;

            this.clearTimer();

        }

        return this;

    };

    /**
     * @returns {Timer}
     */
    Timer.prototype.stop = function() {

        this.isActive  = false;
        this.remaining = this.intervalTime;

        this.clearTimer();

        return this;

    };

    /**
     * @param {boolean=} reset
     * @returns {Timer}
     */
    Timer.prototype.toggle = function(reset) {

        if (this.isActive) {
            this.pause();
        }
        else if (reset) {
            this.play(true);
        }
        else {
            this.play();
        }

        return this;

    };

    /**
     * @returns {Timer}
     */
    Timer.prototype.reset = function() {

        this.isActive = false;
        this.play(true);

        return this;

    };

    /**
     * @returns {Timer}
     */
    Timer.prototype.clearTimer = function() {
        window.clearTimeout(this.timeoutObject);
        return this;
    };

    /**
     * @returns {Timer}
     */
    Timer.prototype.setTimer = function(time) {

        var timer = this;

        if (isNaN(time)) {
            time = this.intervalTime;
        }

        this.remaining = time;
        this.last      = new Date();

        this.clearTimer();

        this.timeoutObject = window.setTimeout(fnTimeout, time);

        return this;

        function fnTimeout() {
            timer.execute();
        }

    };

    /**
     * @returns {Timer}
     */
    Timer.prototype.execute = function() {

        if (this.isActive) {

            try {
                this.action();
            }
            finally {
                this.setTimer();
            }

        }

        return this;

    };

    /**
     * @param {function=} updateFunction
     */
    function Stopwatch(updateFunction) {

        if (typeof this == "function" || this.init) {
            return new Stopwatch(updateFunction);
        }

        this.set(updateFunction);

        return this;
    }

    /**
     * @param {function=} updateFunction
     */
    Stopwatch.prototype.set = function(updateFunction) {

        if (typeof updateFunction != "function") {
            return;
        }

        this.init = true;
        this.updateFunction = updateFunction;
        this.startTime = new Date().getTime();
        this.pauseStart = 0;
        this.setInterval();

    };

    Stopwatch.prototype.timeUpdate = function() {

        if (this.startTime == 0) {
            this.timePassed = 0;
        }
        else {
            this.timePassed = new Date().getTime() - this.startTime;
        }

        this.updateFunction.apply(this);

    };

    /**
     * @returns {int}
     */
    Stopwatch.prototype.getTime = function() {
        return this.timePassed > 0 ? this.timePassed : 0;
    };

    /**
     * @returns {string}
     */
    Stopwatch.prototype.getFormattedTime = function() {
        return formatTime(this.getTime());
    };

    Stopwatch.prototype.stop = function() {
        this.clearInterval();
        this.startTime = 0;
        this.timeUpdate();
    };

    Stopwatch.prototype.pause = function() {
        this.clearInterval();
        this.pauseStart = new Date().getTime();
        this.timeUpdate();
    };

    Stopwatch.prototype.toggle = function() {
        if (this.pauseStart  || this.startTime == 0) {
            this.start();
        }
        else {
            this.pause();
        }
    };

    Stopwatch.prototype.setInterval = function() {

        this.clearInterval();
        this.interval = setInterval(interval, 1000/30);

        var self = this;
        function interval() {
            self.timeUpdate();
        }

    };

    Stopwatch.prototype.clearInterval = function() {
        clearInterval(this.interval);
    };

    Stopwatch.prototype.start = function() {

        if (!this.startTime) {
            this.startTime = new Date().getTime();
        }
        else if (this.pauseStart) {
            this.startTime += (new Date().getTime() - this.pauseStart);
            this.pauseStart = 0;
        }
        else {
            return;
        }

        this.setInterval();

    };

    /**
     * @param {function=} updateFunction
     * @param {int=} countdown
     */
    function Countdown(updateFunction, countdown) {

        if (typeof this == "function" || this.init) {
            return new Countdown(updateFunction, countdown);
        }

        this.set(updateFunction, countdown);

        return this;
    }

    Countdown.prototype = new Stopwatch();

    /**
     * @param {int} countdown
     */
    Countdown.prototype.setCountdown = function(countdown) {
        this.countdown = countdown * 1000;
    };

    /**
     * @param {function=} updateFunction
     * @param {int=} countdown
     */
    Countdown.prototype.set = function(updateFunction, countdown) {
        this.setCountdown(countdown);
        Stopwatch.prototype.set.apply(this, [updateFunction]);
    };

    /**
     * @returns {int}
     */
    Countdown.prototype.getTime = function() {

        var time = this.countdown - Stopwatch.prototype.getTime.apply(this);

        if (time <= 0) {
            time = 0;
            this.finished = true;
            this.startTime = 0;
            this.clearInterval();
        }
        else {
            this.finished = false;
        }

        return time;

    };

    /**
     * @returns {boolean}
     */
    Countdown.prototype.isFinished = function() {
        return this.finished;
    };

    Countdown.prototype.start = function() {
        if (this.getTime() == 0) {
            this.startTime = 0;
        }
        Stopwatch.prototype.start.apply(this);
    };

    /**
     * @param {int} number
     * @param {int} length
     * @returns {string}
     */
    function pad(number, length) {
        var str = '' + number;
        while (str.length < length) {str = '0' + str;}
        return str;
    }

    /**
     * @param {int} time (in milliseconds)
     * @returns {string}
     */
    function formatTime(time) {
        var min = parseInt(time / 60000),
            sec = parseInt(time / 1000) - (min * 60),
            hundredths = pad(parseInt(time / 10 - (sec * 100) - (min * 6000)), 2);
        return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2) + ":" + hundredths;
    }

})(jQuery);
