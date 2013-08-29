function Renderer() {
    this.rect = {
        x:0,
        y:0,
        width:0,
        height:0
    };
}

module.exports = Renderer;

// --- External API ---
Renderer.prototype.render = function () {
    const ctx = this.context;

    ctx.save();

    this.clipContext();
    this.draw();

    ctx.restore();
};

Renderer.prototype.setPosition = function (x, y) {
    this.rect.x = x;
    this.rect.y = y;

    return this;
};

Renderer.prototype.setSize = function (width, height) {
    this.rect.width = width;
    this.rect.height = height;

    return this;
};

Renderer.prototype.setRect = function (rect) {
    this.rect = rect;

    return this;
};

Renderer.prototype.setContext = function (context) {
    this.context = context;

    return this;
};

// --- Internal API ---
Renderer.prototype.centerContext = function () {
    var ctx = this.context;

    ctx.translate(this.rect.x, this.rect.y);
    ctx.translate(this.rect.width/2, this.rect.height/2);
};

Renderer.prototype.draw = function () {
    // to be overloaded
};

Renderer.prototype.clipContext = function () {
    var ctx = this.context;

    ctx.save();
    this.centerContext();

    ctx.beginPath();
    ctx.rect(-this.rect.width/2, -this.rect.height/2, this.rect.width, this.rect.height);
    ctx.closePath();
    ctx.restore();

    ctx.clip();
};
