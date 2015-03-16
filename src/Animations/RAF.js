var global = typeof window === "undefined" ? {} : window;

//TODO: better RAF implementation
var requestAnimationFrame = function (win, t) {
    return win["r" + t] ||
        win["webkitR" + t] ||
        win["mozR" + t] ||
        win["msR" + t] ||
        function (fn) {
            return setTimeout(fn, 60)
        }
}(global, "equestAnimationFrame");

var cancelAnimationFrame = function (win, t) {
    return win["c" + t] ||
        win["webkitC" + t] ||
        win["mozC" + t] ||
        win["msC" + t] ||
        undefined;
}(global, "ancelAnimationFrame");

if (!cancelAnimationFrame) {
    cancelAnimationFrame = function (win, t) {
        return win["c" + t] ||
            win["webkitC" + t] ||
            win["mozC" + t] ||
            win["msC" + t] ||
            function (id) {
                clearTimeout(id);
            };
    }(global, "ancelRequestAnimationFrame");
}

module.exports = {
    RequestAnimationFrame: requestAnimationFrame.bind(global),
    CancelAnimationFrame: cancelAnimationFrame.bind(global)
}