# jQuery Timer

[![Build Status](https://travis-ci.org/jchavannes/jquery-timer.svg?branch=master)](https://travis-ci.org/jchavannes/jquery-timer)

Basically setTimeout with more options.

View demo: [http://jchavannes.com/jquery-timer/demo](http://jchavannes.com/jquery-timer/demo)  
  
Download: [http://jchavannes.com/download/jquery-timer-demo.zip](http://jchavannes.com/download/jquery-timer-demo.zip)

---

## $.timer()

#### $.timer( [ action ] , [ time ], [ autostart ] )

* **action** A Function to be called by the timer.

* **time A Number** determining how long between actions in milliseconds.

* **autostart** A Boolean indicating whether to start the timer. Defaults to false.

---

## Usage

```
var timer = $.timer(function() {
    alert('This message was sent by a timer.');
});
timer.set({ time : 5000, autostart : true });
```

```
timer.set(options);
timer.play(reset);  // Boolean. Defaults to false.
timer.pause();
timer.stop();  // Pause and resets
timer.toggle(reset);  // Boolean. Defaults to false.
timer.once(time);  // Number. Defaults to 0.
timer.isActive  // Returns true if timer is running
timer.remaining // Remaining time when paused
```
