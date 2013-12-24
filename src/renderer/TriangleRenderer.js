var Renderer = require('./Renderer');

function TriangleRenderer() {
    Renderer.prototype.constructor.apply(this);

    this.initialize();
}

TriangleRenderer.prototype = new Renderer();
TriangleRenderer.prototype.constructor = TriangleRenderer;
module.exports = TriangleRenderer;

// --- External API ---
TriangleRenderer.prototype.setStyle = function (style) {
    for (var key in this.style) {
        if (style.hasOwnProperty(key))
            this.style[key] = style[key];
    }

    return this;
};

// --- Internal API ---
TriangleRenderer.prototype.initialize = function () {
    this.style = {
        color:'rgb(150, 150, 150)',
        size:.2
    };
};

TriangleRenderer.prototype.draw = function () {
    var ctx = this.context;
    var size = this.style.size;

    ctx.save();

    ctx.translate(this.rect.x, this.rect.y);
    ctx.scale(this.rect.width, this.rect.width);

    ctx.beginPath();
    ctx.moveTo(1, 0);
    ctx.lineTo(1 - size, 0);
    ctx.lineTo(1, size);
    ctx.closePath();

    ctx.fillStyle = this.style.color;
    ctx.fill();

    ctx.restore();
};
