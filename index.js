var CoreGraphics = {};
var Foundation = {};
var Kit = require('./src/Kit/Kit');

CoreGraphics.Geometry = require('./src/CoreGraphics/Geometry/Geometry');
CoreGraphics.Geometry.DataTypes = {
    Point: require('./src/CoreGraphics/Geometry/DataTypes/Point'),
    Size: require('./src/CoreGraphics/Geometry/DataTypes/Size'),
    Rect: require('./src/CoreGraphics/Geometry/DataTypes/Rect'),
    Vector: require('./src/CoreGraphics/Geometry/DataTypes/Vector')
};
CoreGraphics.Geometry.Constants = require('./src/CoreGraphics/Geometry/GeometryConstants');

Foundation.DataTypes = {
    IndexPath: require('./src/Foundation/DataTypes/IndexPath')
};

Kit.DataTypes = {
    EdgeInsets: require('./src/Kit/DataTypes/EdgeInsets')
};
Kit.KitConstants = {
    IndexPath: require('./src/Kit/KitConstants')
};

module.exports = {
    CoreGraphics: CoreGraphics,
    Foundation: Foundation,
    Kit: Kit
};