var TargetRenderer = require('./TargetRenderer');

function RingTargetRenderer() {
    TargetRenderer.prototype.constructor.apply(this);

    this.style.drawFullTarget = false;
    this.style.ringLineWidth = 1;
}

RingTargetRenderer.prototype = new TargetRenderer();
RingTargetRenderer.prototype.constructor = RingTargetRenderer;
module.exports = RingTargetRenderer;

// --- External API ---
RingTargetRenderer.prototype.setTarget = function (target) {
    this.target = target;

    return this;
};

// --- Internal API ---
RingTargetRenderer.prototype.drawTarget = function () {
    this.drawBackground();
    this.drawRings();
    this.drawNumbers();
};

RingTargetRenderer.prototype.drawBackground = function () {
    var ctx = this.context;
    var size = this.getSize();

    // draw back
    var backSize = this.getMaxSize();
    ctx.fillStyle = this.style.backColor;

    ctx.beginPath();
    ctx.arc(0, 0, backSize * size, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();

    // draw front
    var frontSize = Math.min(this.target.frontSize, this.getMaxSize());
    ctx.fillStyle = this.style.frontColor;

    ctx.beginPath();
    ctx.arc(0, 0, frontSize * size, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
};

RingTargetRenderer.prototype.drawRings = function () {
    var ctx = this.context;
    var frontSize = this.target.frontSize;
    var ringSizes = this.target.ringSizes;
    var size = this.getSize();

    for (var idx in ringSizes) {
        var ringSize = ringSizes[idx];

        if (ringSize > this.getMaxSize()) {
            continue;
        }

        var isFrontRing = ringSize > frontSize;
        ctx.strokeStyle = isFrontRing
            ? this.style.frontColor
            : this.style.backColor;
        ctx.lineWidth = this.style.ringLineWidth;

        ctx.beginPath();
        ctx.arc(0, 0, ringSize * size, 0, Math.PI*2, true);
        ctx.closePath();

        ctx.stroke();
    }
};

RingTargetRenderer.prototype.drawNumbers = function () {
    var ctx = this.context;
    var size = this.getSize();

    for (var i = this.target.numbersFrom; i <= this.target.numbersTo; ++i) {
        var lowerRingSize = this.target.ringSizes[i - 1];
        var upperRingSize = this.target.ringSizes[i];

        if (lowerRingSize > this.getMaxSize()) {
            continue;
        }

        var d = (lowerRingSize + upperRingSize) / 2 * size;

        if (lowerRingSize > this.target.frontSize) {
            ctx.fillStyle = this.style.frontColor;
        } else {
            ctx.fillStyle = this.style.backColor;
        }

        this.drawNumber(i, -d, 0);
        this.drawNumber(i, d, 0);
        this.drawNumber(i, 0, -d);
        this.drawNumber(i, 0, d);
    }
};

RingTargetRenderer.prototype.drawNumber = function (number, dx, dy) {
    var ctx = this.context;
    var size = this.getSize();

    ctx.font = "36px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    ctx.save();
    ctx.translate(dx, dy);
    ctx.scale(1/500 * size, 1/500 * size);

    ctx.fillText(number, 0, 0);

    ctx.restore();
};

RingTargetRenderer.prototype.getSize = function () {
    return this.scale * Math.min(this.rect.width, this.rect.height)/2;
};

RingTargetRenderer.prototype.getMaxSize = function () {
    var maxSize = 1;

    if (!this.style.drawFullTarget)
        maxSize = Math.min(maxSize, 1 / this.scale);

    return maxSize;
};
