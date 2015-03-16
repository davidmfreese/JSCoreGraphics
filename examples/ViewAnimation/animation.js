var View = window["JSCoreGraphics"].Kit.Views.View;
var Rect = window["JSCoreGraphics"].CoreGraphics.Geometry.DataTypes.Rect;
var Point = window["JSCoreGraphics"].CoreGraphics.Geometry.DataTypes.Point;
var Size = window["JSCoreGraphics"].CoreGraphics.Geometry.DataTypes.Size;
var AnimationEasingType = window["JSCoreGraphics"].Animations.AnimationEasingType;

var animateButton = document.getElementById("animateButton");
var animatable = document.getElementById("animatable");
var frame = new Rect({
    origin: new Point({
        x: Number(animatable.style.left.replace("px", "")),
        y: Number(animatable.style.top.replace("px", ""))
    }),
    size: new Size({
        width: Number(animatable.style.width.replace("px", "")),
        height: Number(animatable.style.height.replace("px", ""))
    })
});
var animatableView = new View({
    frame: frame,
    alpha: Number(animatable.style.opacity),
    scrollPosition: new Point({
        x: Number(animatable.scrollLeft),
        y: Number(animatable.scrollTop)
    }),
    domElement: animatable
}, true);//make mutable

var opacity = 1.0;
function onAnimate() {
    var plusX = 25;
    var plusY = 25;

    var nextFrame = new Rect({
        origin: new Point({
            x: animatableView.frame.origin.x + plusX,
            y: animatableView.frame.origin.y + plusY
        }),
        size: animatableView.frame.size
    });


    var nextOpacity = opacity == 1 ? 0.25 : 1;
    var animations = {
        frame: nextFrame,
        alpha: nextOpacity
    };

    animateButton.disabled = true;
    animatableView.animateWithDurationAndOptions(200, 0, AnimationEasingType.AnimationEastInOutCubic, animations, function(success) {
        animateButton.disabled = false;
        animatableView.frame = nextFrame;
        animatableView.alpha = nextOpacity;
        opacity = nextOpacity;
        console.log(success);
    });
}

animateButton.addEventListener("click", onAnimate);

