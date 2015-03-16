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

var isAnimating = false;
var upperRight = true;
function onAnimate() {
    if (isAnimating === true) {
        animatableView.cancelCurrentAnimation();
        setTimeout(function () {
            upperRight = !upperRight;
            isAnimating = false;
            onAnimate();
        }, 60);
    }

    isAnimating = true;
    var nextFrame = new Rect({
        origin: new Point({
            x: upperRight ? window.innerWidth - animatableView.frame.size.width - 10 : 0,
            y: upperRight ? window.innerHeight - animatableView.frame.size.height - 10 : 0
        }),
        size: animatableView.frame.size
    });
    var nextOpacity = upperRight ? 0.10 : 1;
    var animations = {
        frame: nextFrame,
        alpha: nextOpacity
    };

    upperRight = !upperRight;
    animatableView.animateWithDurationAndOptions(1000, 0, AnimationEasingType.AnimationEastInOutCubic, animations, function (success) {
        console.log(success);
        isAnimating = false;
    });


}

animateButton.addEventListener("click", onAnimate);

