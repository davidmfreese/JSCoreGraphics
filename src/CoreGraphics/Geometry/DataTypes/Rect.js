var t = require("tcomb-validation");
var Size = require("./Size");
var Point = require("./Point");

var Rect = t.struct({
    origin: Point,
    size: Size
}, "Frame");

module.exports = Rect;
