var Point = require("./DataTypes/Point");
var Size = require("./DataTypes/Size");
var Rect = require("./DataTypes/Rect");

var POINT_ZERO = new Point({x: 0, y: 0});
var SIZE_ZERO = new Size({height:0, width:0});
var RECT_ZERO = new Rect({
    origin: POINT_ZERO,
    size: SIZE_ZERO
});

var GeometryConstants = {};

GeometryConstants.pointZero = POINT_ZERO;

GeometryConstants.sizeZero = SIZE_ZERO;

GeometryConstants.rectZero = RECT_ZERO;

module.exports = GeometryConstants;