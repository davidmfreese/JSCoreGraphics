var t = require("tcomb-validation");

var EdgeInsets = t.struct({
    top: t.Num,
    left: t.Num,
    bottom: t.Num,
    right: t.Num
}, "EdgeInsets");

module.exports = EdgeInsets;

