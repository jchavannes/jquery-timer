/**
 * jquery.timer.js
 *
 * Copyright (c) 2011 Jason Chavannes <jason.chavannes@gmail.com>
 *
 * http://code.google.com/p/jquery-timer/
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
	$.timer = function(func, time, autostart) {	
	 	this.set = function(func, time, autostart) {
	 	 	if(typeof func == 'object') {
		 	 	var params = ['autostart', 'time', 'action'];
	 	 	 	for(var arg in params) {
		 	 		if(func[params[arg]] != undefined) {
		 	 			eval(params[arg] + " = func[params[arg]]");
		 	 		}
	 	 	 	};
 	 			func = func.action;
	 	 	}
	 	 	if(typeof func == 'function') {
			 	this.action = func;
			}
		 	if(!isNaN(time)) {
			 	this.intervalTime = time;
		 	}
		 	if(autostart) {
			 	this.active = true;
			 	this.setTimer();
		 	}
		 	return this;
	 	};
	 	this.once = function(time) {
	 		if(!isNaN(time)) {
		 		this.setOnce(time);
	 		} else {
		 		this.setOnce();
		 	}
	 		return this;
	 	};
		this.play = function() {
			if(!this.active) {
				this.active = true;
				this.setTimer();
			}
			return this;
		};
		this.pause = function() {
			this.active = false;
			this.clearTimer();
			return this;
		};
		this.toggle = function() {
			if(this.active) {
				this.pause();
			} else {
				this.play();
			}
			return this;
		};
		this.reset = function() {
			this.pause().play();
			return this;
		};
		this.clearTimer = function() {
			window.clearTimeout(this.timeoutObject);
		};
	 	this.setTimer = function(time) {
	 	 	if(isNaN(time)) {
	 	 		time = this.intervalTime;
	 	 	}
			var timer = this;
			this.clearTimer();
			this.timeoutObject = window.setTimeout(function() {timer.go();}, time);
		};
		this.setOnce = function(time) {
	 	 	if(isNaN(time)) {
	 	 		time = 0;
	 	 	}
			var timer = this;
			window.setTimeout(function() {timer.action();}, time);
		};
	 	this.go = function() {
	 		if(this.active) {
	 			this.action();
	 			this.setTimer();
	 		}
	 	};

	 	if(this.action != undefined) {
	 		return new $.timer(func, time, autostart);
	 	} else {
			this.set(func, time, autostart);
	 	 	return this;
	 	}
	};
})(jQuery);