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
	$.timer_once = function(func, time) {
	 	var realthis = this;
		window.setTimeout(function() { func(); realthis = undefined;}, time);
		this.cancel = function() {
			func = undefined;
			realthis = undefined;
		};
	};
	$.timer = function(func, time, begin) {
		var realthis = this;
	 	this.load = function(func, time, begin) {
		 	this.whatHappens = func;
		 	if(time != undefined) {
			 	this.intervalTime = time;
		 	}
		 	if(begin == true) {		 	 
			 	this.active = 2;
			 	this.setTimer();
		 	}
	 	};
	 	this.once = function(time) {
		 	this.tempTime = this.intervalTime;
		 	this.intervalTime = time;
	 	 	this.active = 1;
		 	this.setTimer();
			return this;
	 	};
	 	this.go = function() {
	 		if(this.active > 0) {	 			
	 			this.whatHappens();
		 		if(this.active == 1) {
		 		 	this.active = 0;
				 	this.intervalTime = this.tempTime;
		 		} else {
		 			this.setTimer();
		 		}
	 		}
	 	};
		this.pause = function() {
			this.active = 0;
			this.clearTimer();
			return this;
		};
		this.play = function() {
			this.active = 2;
			this.setTimer();
			return this;
		};
		this.toggle = function() {
			if(this.active > 0) {
				this.pause();
			} else {
				this.play();
			}
			return this;
		};
		this.reset = function() {
			this.pause().play();
		};
	 	this.setTimer = function() {
			this.clearTimer();
			var realthis = this;
			this.timeoutObject = window.setTimeout(function() {realthis.go();}, this.intervalTime);
		};
		this.clearTimer = function() {
			window.clearTimeout(this.timeoutObject);
		};
	 	this.load(func, time, begin);
	};
})(jQuery);