var Renderer = require('./Renderer');

function TargetRenderer() {
    Renderer.prototype.constructor.apply(this);

    this.initialize();
}

TargetRenderer.prototype = new Renderer();
TargetRenderer.prototype.constructor = TargetRenderer;
module.exports = TargetRenderer;

// --- External API ---
TargetRenderer.prototype.setStyle = function (style) {
    for (var key in this.style) {
        if (style.hasOwnProperty(key))
            this.style[key] = style[key];
    }

    return this;
};

TargetRenderer.prototype.setScale = function (scale) {
    this.scale = scale;

    return this;
};

// --- Internal API ---
TargetRenderer.prototype.initialize = function () {
    this.scale = 1;
    this.style = {
        backColor:'rgb(255, 255, 255)',
        frontColor:'rgb(0, 0, 0)'
    };
};

TargetRenderer.prototype.draw = function () {
    var ctx = this.context;
    ctx.save();

    this.centerContext();
    this.drawTarget();

    ctx.restore();
};

TargetRenderer.prototype.drawTarget = function () {
    // to be overloaded
};
