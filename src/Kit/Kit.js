var EdgeInsets = require("./DataTypes/EdgeInsets");
var Constants = require("./KitConstants");
var Kit = {};

Kit.edgeInsetsZero = Constants.INSETS_ZERO;

Kit.edgeInsetsMake = function (left, top, right, bottom) {
    return new EdgeInsets({
        left: left,
        top: top,
        right: right,
        bottom: bottom
    });
};

module.exports = Kit;