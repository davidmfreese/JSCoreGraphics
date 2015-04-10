var t = require("tcomb-validation");

var Rect = require("../../CoreGraphics/Geometry/DataTypes/Rect");
var Point = require("../../CoreGraphics/Geometry/DataTypes/Point");
var CAAnimation = require("../../Animations/CAAnimation");
var AnimationEasingType = require("../../Animations/AnimationEasingType");
var Size = require("../../CoreGraphics/Geometry/DataTypes/Size");

//TODO: add more animatable properties
var AnimatableStyleProps = {
    top: 1,
    left: 2,
    bottom: 3,
    right: 4,
    opacity: 5,
    height: 6,
    width:7
};

function AnimatableProp(propertyName, startValue, endValue, appendValue, duration) {
    this.propertyName = propertyName;
    this.startValue = startValue;
    this.endValue = endValue;
    this.duration = duration;
    this.currentValue = startValue;
    this.appendValue = appendValue;
    this.updateCurrentValue = function (rate) {
        this.currentValue = this.startValue - rate * (this.startValue - this.endValue);
    }.bind(this);
}

function updateAnimatableProps(view, animatableProps) {
    var newFrame = new Rect({
        origin: new Point({
            x: view.frame.origin.x,
            y: view.frame.origin.y
        }, true),
        size: new Size({
            width: view.frame.size.width,
            height: view.frame.size.height
        }, true)
    }, true);

    var newScrollPosition = new Point({
        x: view.scrollPosition.x,
        y: view.scrollPosition.y
    }, true)

    for (var i = 0; i < animatableProps.length; i++) {
        var prop = animatableProps[i];
        if (prop.propertyName === "left") {
            newFrame.origin.x = prop.currentValue;
        }
        else if (prop.propertyName === "top") {
            newFrame.origin.y = prop.currentValue;
        }
        else if (prop.propertyName === "width") {
            newFrame.size.width = prop.currentValue;
        }
        else if (prop.propertyName === "height") {
            newFrame.size.height = prop.currentValue;
        }
        else if (prop.propertyName === "scrollLeft") {
            newScrollPosition.x = prop.currentValue;
        }
        else if (prop.propertyName === "scrollTop") {
            newScrollPosition.y = prop.currentValue;
        }
        else if (prop.propertyName === "opacity") {
            view.alpha = prop.currentValue;
        }
    }

    view.frame = newFrame;
    view.scrollPosition = newScrollPosition;

};

var View = t.struct({
    frame: Rect,
    alpha: t.Num,
    scrollPosition: Point,
    domElement: t.Obj //no way to check this is really a dom element?
}, "View");

View.prototype.updateToCurrentProperties = function() {
    this.domElement.style["position"] = "absolute";
    if(this.scrollPosition) {
        this.domElement["scrollTop"] = this.scrollPosition.y;
        this.domElement["scrollLeft"] = this.scrollPosition.x;
    }
    if(this.frame) {
        this.domElement.style["left"] = this.frame.origin.x + "px";
        this.domElement.style["top"] = this.frame.origin.y + "px";
        this.domElement.style["width"] = this.frame.size.width + "px";
        this.domElement.style["height"] = this.frame.size.height + "px";
    }
    if(this.alpha) {
        this.domElement.style["opacity"] = this.alpha;
    }
};

View.prototype.animateWithDurationAndOptions = function (duration, delay, animationEasingType, animations, completion) {
    var easingType = AnimationEasingType.AnimationEaseLinear;
    for (var animationEasingTypeKey in AnimationEasingType) {
        var value = AnimationEasingType[animationEasingTypeKey];
        if (animationEasingType === value) {
            easingType = value;
        }
    }
    if (animationEasingType && AnimationEasingType[animationEasingType] > 0) {
        easingType = AnimationEasingType[animationEasingType];
    }

    var animatableProps = [];
    if (animations["frame"] != null) {
        if (animations["frame"].origin.x != this.frame.origin.x) {
            animatableProps.push(new AnimatableProp("left", this.frame.origin.x, animations["frame"].origin.x, "px", duration));
        }
        if (animations["frame"].origin.y != this.frame.origin.y) {
            animatableProps.push(new AnimatableProp("top", this.frame.origin.y, animations["frame"].origin.y, "px", duration));
        }
        if (animations["frame"].size.width != this.frame.size.width) {
            animatableProps.push(new AnimatableProp("width", this.frame.size.width, animations["frame"].size.width, "px", duration));
        }
        if (animations["frame"].size.height != this.frame.size.height) {
            animatableProps.push(new AnimatableProp("height", this.frame.size.height, animations["frame"].size.height, "px", duration));
        }
    }

    if (animations["alpha"] != null) {
        if (animations["alpha"] != this.alpha) {
            animatableProps.push(new AnimatableProp("opacity", this.alpha, animations["alpha"], "", duration));
        }
    }

    if (animations["scrollPosition"] != null) {
        var newScrollPosition = animations["scrollPosition"];
        if (newScrollPosition != null && newScrollPosition.x != this.scrollPosition.x) {
            animatableProps.push(new AnimatableProp("scrollLeft", this.scrollLeft, newScrollPosition.x, duration));
        }

        if (newScrollPosition != null && newScrollPosition.y != this.scrollPosition.y) {
            animatableProps.push(new AnimatableProp("scrollTop", this.scrollPosition.y, newScrollPosition.y, duration));
        }
    }

    var that = this;
    setTimeout(function () {
        var stepFunctions = [];
        for (var i = 0; i < animatableProps.length; i++) {
            var stepFunction = (function (animatable) {
                return function (rate) {
                    animatable.updateCurrentValue(rate);
                    if (AnimatableStyleProps[animatable.propertyName] > 0) {
                        that.domElement.style[animatable.propertyName] = animatable.currentValue + animatable.appendValue;
                    }
                    else {
                        that.domElement[animatable.propertyName] = animatable.currentValue + animatable.appendValue;
                    }
                }
            })(animatableProps[i]);
            stepFunctions.push(stepFunction);
        }

        var combinedStepFunction = function (rate) {
            for (var i = 0; i < stepFunctions.length; i++) {
                stepFunctions[i](rate);
            }

            updateAnimatableProps(that, animatableProps);
        };

        that.currentAnimation = new CAAnimation(duration, easingType, combinedStepFunction,
            function (success) {
                that.currentAnimation = undefined;
                completion(success);
            }
        );
    }, delay);
};

View.prototype.cancelCurrentAnimation = function () {
    if (this.currentAnimation != null) {
        this.currentAnimation.cancelAnimation();
    }
};

View.prototype.finishCurrentAnimation = function () {
    if (this.currentAnimation != null) {
        this.currentAnimation.finishAnimation();
    }
};

module.exports = View;
