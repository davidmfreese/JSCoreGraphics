var t = require('tcomb-validation');

var Point = t.struct({
    x: t.Num,
    y: t.Num
}, 'Point');

module.exports = Point;