var t = require("tcomb-validation");

var IndexPath = t.struct({
    row: t.Num,
    section: t.maybe(t.Num)
}, "IndexPath");

module.exports = IndexPath;

