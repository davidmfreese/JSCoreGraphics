var AnimationEasingType = require("./AnimationEasingType");
var RAF = require("./RAF");
var EasingFunctions =  require("./EasingFunctions");

if (!Date.now) {
    Date.now = function now() {
        return new Date().getTime();
    };
}

//taken from http://www.sitepoint.com/simple-animations-using-requestanimationframe/
function Animate(duration, animationEasingType, stepFunction, success) {
    var rafId = -1;
    this.cancelAnimation = function () {
        if (rafId) {
            RAF.CancelAnimationFrame(rafId);
            rafId = undefined;
        }
        success("cancelled");

    };
    this.finishAnimation = function () {
        if (rafId) {
            RAF.CancelAnimationFrame(rafId);
            rafId = undefined;
        }
        stepFunction(1);
        success("success");

    };

    var end = Date.now() + duration;
    var step = function () {
        var current = Date.now();
        var remaining = end - current;
        var tScaled = remaining / duration;

        if (rafId === undefined) {
            return;
        }
        else if (remaining < 16) {
            stepFunction(1);
            success("success");
            return;
        }
        else {
            var rate = 0;
            var t = 0;
            if (!animationEasingType || animationEasingType === AnimationEasingType.AnimationEaseLinear) {
                var t = EasingFunctions.EaseLinear(tScaled);
                rate = EasingFunctions.GetRate(t);
            }
            else if (animationEasingType === AnimationEasingType.AnimationEaseOutQuad) {
                var t = EasingFunctions.EaseOutQuad(tScaled);
                rate = EasingFunctions.GetRate(t);
            }
            else if (animationEasingType === AnimationEasingType.AnimationEastInOutCubic) {
                var t = EasingFunctions.EaseInOutCubic(tScaled);
                rate = EasingFunctions.GetRate(t);
            }
            stepFunction(rate);
        }

        rafId = RAF.RequestAnimationFrame(step);
    };
    step();

    return this;
}

module.exports = Animate;



