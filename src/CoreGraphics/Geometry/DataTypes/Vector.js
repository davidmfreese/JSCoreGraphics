var t = require('tcomb');

var Vector = t.struct({
    dx: t.Num,
    dy: t.Num
}, 'Vector');

module.exports = Vector;