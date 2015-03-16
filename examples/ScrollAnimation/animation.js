var View = window["JSCoreGraphics"].Kit.Views.View;
var Rect = window["JSCoreGraphics"].CoreGraphics.Geometry.DataTypes.Rect;
var Point = window["JSCoreGraphics"].CoreGraphics.Geometry.DataTypes.Point;
var Size = window["JSCoreGraphics"].CoreGraphics.Geometry.DataTypes.Size;
var AnimationEasingType = window["JSCoreGraphics"].Animations.AnimationEasingType;

var animateButton = document.getElementById("animateButton");
var animatable = document.getElementById("animatable");
var frame = new Rect({
    origin: new Point({
        x: 0,
        y: 0
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

function onAnimate() {
    var plusScrollLocationY = 1000;
    animatableView.scrollPosition = new Point({
        x: Number(animatableView.domElement.scrollLeft),
        y: Number(animatableView.domElement.scrollTop)
    });

    var newScrollPosition = new Point({ //Todo: update the values based on the element location??
        x: animatableView.scrollPosition.x,
        y: animatableView.scrollPosition.y + plusScrollLocationY
    });

    var animations = {
        scrollPosition: newScrollPosition
    };

    animateButton.disabled = true;
    animatableView.animateWithDurationAndOptions(500, 0, AnimationEasingType.AnimationEaseOutQuad, animations, function(success) {
        animateButton.disabled = false;
        animatableView.scrollPosition = newScrollPosition;
        console.log(success);
    });
}

animateButton.addEventListener("click", onAnimate);

