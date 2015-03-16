var AnimationEasingType = require("./AnimationEasingType");

var global = typeof window === "undefined" ? {} : window;

//TODO: better RAF implementation
var _requestAnimationFrame = function(win, t) {
    return  win["r" + t] ||
    win["webkitR" + t] ||
    win["mozR" + t] ||
    win["msR" + t] ||
    function(fn) { return setTimeout(fn, 60) }
}(global, "equestAnimationFrame");

var _cancelAnimationFrame = function(win, t) {
    return win["c" + t] ||
    win["webkitC" + t] ||
    win["mozC" + t] ||
    win["msC" + t] ||
    undefined;
}(global, "ancelAnimationFrame");

if(!_cancelAnimationFrame) {
    var _cancelAnimationFrame = function(win, t) {
        return win["c" + t] ||
        win["webkitC" + t] ||
        win["mozC" + t] ||
        win["msC" + t] ||
        function(id) { clearTimeout(id); };
    }(global, "ancelRequestAnimationFrame");
}

if (!Date.now) {
    Date.now = function now() {
        return new Date().getTime();
    };
}

function getRate(t) {
    return 1 - t;
}

function easelinear(t) { return t }

function easeOutQuad(t) { return t*(2-t) }

function easeInOutCubic(t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 }

//taken from http://www.sitepoint.com/simple-animations-using-requestanimationframe/
function Animate(duration, animationEasingType, stepFunction, success) {
    var rafId = -1;
    this.cancelAnimation = function() {
        if(rafId) {
            _cancelAnimationFrame(rafId);
            rafId = undefined;
        }
        success("cancelled");

    };
    this.finishAnimation = function() {
        if(rafId) {
            _cancelAnimationFrame(rafId);
            rafId = undefined;
        }
        stepFunction(1);
        success("success");

    };

    var end = Date.now() + duration;
    var step = function() {
        var current = Date.now();
        var remaining = end - current;
        var tScaled = remaining/duration;

        if(rafId === undefined) {
            return;
        }
        else if(remaining < 16) {
            stepFunction(1);
            success("success");
            return;
        }
        else {
            var rate = 0;
            var t = 0;
            if(!animationEasingType || animationEasingType === AnimationEasingType.AnimationEaseLinear) {
                var t = easelinear(tScaled);
                rate = getRate(t);
            } else if(animationEasingType === AnimationEasingType.AnimationEaseOutQuad) {
                var t = easeOutQuad(tScaled);
                rate = getRate(t);
            } else if(animationEasingType === AnimationEasingType.AnimationEastInOutCubic) {
                var t = easeInOutCubic(tScaled);
                rate = getRate(t);
            }
            stepFunction(rate);
        }

        rafId = _requestAnimationFrame(step);
    };
    step();

    return this;
}

module.exports = Animate;



