var Example1 = $.stopwatch(function () {
    var output = this.getFormattedTime() + " - <i>(" + this.getTime() + " milliseconds)</i>";
    $("#stopwatch").html(output);
});

var Example2 = $.countdown(function() {
    $("#countdown").html(this.getFormattedTime());
    if (this.isFinished()) {
        alert("Example 2: Countdown complete!");
    }
}, 20);

/**
 * The purpose of this example is to demonstrate the original
 * reason I built jQuery timer, to preserve the time remaining
 * when pausing a timer.
 *
 * Notice the increment time is set to 2500.  If you click
 * 'Play / Pause' immediately after an image changes, you should
 * see a value close to 2.5 seconds remaining.  Once you click
 * play again, the timer continues where it ended instead of
 * starting over again.
 */
var Example4 = new (function() {
    var $galleryImages, // An array of image elements
        $timeRemaining, // Usually hidden element to display time when paused
        imageId = 0, // Which image is being shown
        incrementTime = 2500,
        updateTimer = function() {
            $galleryImages.eq(imageId).stop(true,true).fadeOut(500);
            imageId++;
            if (imageId > $galleryImages.length) {
                imageId = 0;
            }
            $galleryImages.eq(imageId).stop(true,false).fadeIn(500);
        },
        init = function() {
            $galleryImages = $('.galleryImages img');
            $timeRemaining = $('#timeRemaining');
            Example4.Timer = $.timer(updateTimer, incrementTime, true).once();
        };
    this.toggleGallery = function() {
        if (this.Timer.isActive) {
            this.Timer.pause();
            var remaining = this.Timer.remaining / 1000;
            $timeRemaining.html(remaining + " seconds remaining.<br/>");
        }
        else {
            this.Timer.play();
            $timeRemaining.html("<br/>");
        }
    };
    $(init);
});


/**
 * Example 4 is as simple as it gets.  Just a timer object and
 * a counter that is displayed as it updates.
 */
var count = 0,
    timer = $.timer(function() {
        count++;
        $('#counter').html(count);
    });
timer.set({ time : 1000, autostart : true });


// Common functions
function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {str = '0' + str;}
    return str;
}
function formatTime(time) {
    var min = parseInt(time / 6000),
        sec = parseInt(time / 100) - (min * 60),
        hundredths = pad(time - (sec * 100) - (min * 6000), 2);
    return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2) + ":" + hundredths;
}
