var t = require("tcomb-validation");

var Vector = t.struct({
    dx: t.Num,
    dy: t.Num
}, "Vector");

module.exports = Vector;