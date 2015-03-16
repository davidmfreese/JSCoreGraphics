var t = require("tcomb-validation");

var Point = require("./DataTypes/Point");
var Size = require("./DataTypes/Size");
var Rect = require("./DataTypes/Rect");
var Vector = require("./DataTypes/Vector");
var Constants = require("./GeometryConstants");

var Geometry = {};

Geometry.shouldValidate = false;

Geometry.pointMake = function(x, y) {
    if(this.shouldValidate) { t.validate(x, t.Num); t.validate(y, t.Num);}
    return new Point({
        x: x,
        y: y
    });
};
Geometry.sizeMake = function(width, height) {
    if(this.shouldValidate) { t.validate(width, t.Num); t.validate(height, t.Num); }
    return new Size({
        width: width,
        height: height
    });
};
Geometry.rectMake = function(x, y, width, height) {
    return new Rect({
        origin: this.pointMake(x, y),
        size: this.sizeMake(width, height)
    });
};

Geometry.pointEqualToPoint = function(point1, point2) {
    if(this.shouldValidate) { Point.is(point1); Point.is(point2); }
    return point1.x == point2.x && point1.y == point2.y;
};
Geometry.sizeEqualToSize = function(size1, size2) {
    if(this.shouldValidate) { Size.is(size1); Size.is(size2); }
    return size1.width == size2.width && size1.height == size2.height;
};
Geometry.rectEqualToRect = function(rect1, rect2) {
    if(this.shouldValidate) { Rect.is(rect1); Rect.is(rect1); }
    return this.pointEqualToPoint(rect1.origin, rect2.origin) && this.sizeEqualToSize(rect1.size, rect2.size);
};

Geometry.rectGetMinX = function(rect) {
    if(this.shouldValidate) { Rect.is(rect); }
    return rect.origin.x;
};
Geometry.rectGetMaxX = function(rect) {
    if(this.shouldValidate) { Rect.is(rect); }
    return rect.origin.x + rect.size.width;
};
Geometry.rectGetMinY = function(rect) {
    if(this.shouldValidate) { Rect.is(rect); }
    return rect.origin.y;
};
Geometry.rectGetMaxY = function(rect) {
    if(this.shouldValidate) { Rect.is(rect); }
    return rect.origin.y + rect.size.height;
};
Geometry.rectGetMidX = function(rect) {
    if(this.shouldValidate) { Rect.is(rect); }
    return this.rectGetMinX(rect) + rect.size.width/2;
};
Geometry.rectGetMidY = function(rect) {
    if(this.shouldValidate) { Rect.is(rect); }
    return this.rectGetMinY(rect) + rect.size.height/2;
};

Geometry.rectContainsPoint = function(rect, point) {
    if(this.shouldValidate) { Rect.is(rect); Point.is(point); }
    var minX = this.rectGetMinX(rect);
    var maxX = this.rectGetMaxX(rect);
    var minY = this.rectGetMinY(rect);
    var maxY = this.rectGetMaxY(rect);

    return !(point.x < minX || point.x > maxX || point.y < minY || point.y > maxY);
};
Geometry.rectContainsRect = function(rect, possibleInnerRect) {
    if(this.shouldValidate) { Rect.is(rect); Rect.is(possibleInnerRect); }
    var upperLeftPoint = possibleInnerRect.origin;
    var lowerLeftPoint = new Point({
        x: this.rectGetMaxX(possibleInnerRect),
        y: this.rectGetMaxY(possibleInnerRect)
    });

    return this.rectContainsPoint(rect, upperLeftPoint) && this.rectContainsPoint(rect, lowerLeftPoint);
};

Geometry.isPointZero = function(point) {
    if(this.shouldValidate) { Point.is(point); }
    return this.pointEqualToPoint(point, Constants.pointZero);
};
Geometry.isSizeZero = function(size) {
    if(this.shouldValidate) { Size.is(size); }
    return this.sizeEqualToSize(size, Constants.sizeZero);
};
Geometry.isRectZero = function(rect) {
    if(this.shouldValidate) { Rect.is(rect); }
    return this.rectEqualToRect(rect, Constants.rectZero);
};

//TODO: Should this include Contains?
Geometry.rectIntersectsRect = function(rect1, rect2) {
    var intersects =
        !(
            rect1.origin.x + rect1.size.width < rect2.origin.x
            || rect2.origin.x + rect2.size.width < rect1.origin.x
            || rect1.origin.y + rect1.size.height < rect2.origin.y
            || rect2.origin.y + rect2.size.height < rect1.origin.y
        );

    return intersects || this.rectContainsRect(rect2, rect1);
};

module.exports = Geometry;