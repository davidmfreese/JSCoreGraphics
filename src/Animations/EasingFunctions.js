function getRate(t) {
    return 1 - t;
}

function easelinear(t) {
    return t;
}

function easeOutQuad(t) {
    return t * (2 - t);
}

function easeInOutCubic(t) {
    return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

module.exports = {
    GetRate: getRate,
    EaseLinear: easelinear,
    EaseOutQuad: easeOutQuad,
    EaseInOutCubic: easeInOutCubic
};
