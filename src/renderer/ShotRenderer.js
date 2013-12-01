var Renderer = require('./Renderer');

var MARKER_SIZE = 1/20;

function ShotRenderer() {
    Renderer.prototype.constructor.apply(this);

    this.initialize();
}

ShotRenderer.prototype = new Renderer();
ShotRenderer.prototype.constructor = ShotRenderer;
module.exports = ShotRenderer;

// --- External API ---
ShotRenderer.prototype.setStyle = function (style) {
    for (var key in this.style) {
        if (style.hasOwnProperty(key))
            this.style[key] = style[key];
    }

    return this;
};

ShotRenderer.prototype.setShots = function (shots) {
    this.shots = shots;

    return this;
};

ShotRenderer.prototype.setScale = function (scale) {
    this.scale = scale;

    return this;
};

// --- Internal API ---
ShotRenderer.prototype.initialize = function () {
    this.scale = 1;
    this.shots = {};
    this.style = {
        gaugeSize:.015,
        gaugeColor:'rgb(0, 0, 0)',
        markerColor:'rgb(0, 255, 0)',
        lastMarkerColor:'rgb(255, 0, 0)'
    };
};

ShotRenderer.prototype.draw = function () {
    var ctx = this.context;
    ctx.save();

    this.centerContext();
    this.drawShots();

    ctx.restore();
};

ShotRenderer.prototype.drawShots = function () {
    // draw first n-1 shots
    var shot = null;
    for (var idx in this.shots) {
        if (shot) {
            this.drawShot(shot, this.style.markerColor);
        }

        shot = this.shots[idx];
    }

    // draw last shot with special color
    if (shot)
        this.drawShot(shot, this.style.lastMarkerColor);
};

ShotRenderer.prototype.drawShot = function (shot, markerColor) {
    var ctx = this.context;
    var scale = this.scale * Math.min(this.rect.width, this.rect.height)/2;

    ctx.save();
    ctx.scale(scale, scale);
    ctx.translate(shot.x, shot.y);

    if (this.style.gaugeSize > .7*MARKER_SIZE) {
        this.renderShotWithoutGauge(shot, markerColor, scale);
    } else {
        this.renderShotWithGauge(shot, markerColor);
    }

    ctx.restore();
};

ShotRenderer.prototype.renderShotWithGauge = function (shot, markerColor) {
    var ctx = this.context;

    // draw marker
    ctx.beginPath();
    ctx.arc(0, 0, MARKER_SIZE, 0, Math.PI*2, true);
    ctx.closePath();

    ctx.fillStyle = markerColor;
    ctx.fill();

    // draw gauge
    ctx.beginPath();
    ctx.arc(0, 0, this.style.gaugeSize, 0, Math.PI*2, true);
    ctx.closePath();

    ctx.fillStyle = this.style.gaugeColor;
    ctx.fill();
};

ShotRenderer.prototype.renderShotWithoutGauge = function (shot, markerColor, scale) {
    var ctx = this.context;
    ctx.save();

    ctx.beginPath();
    ctx.arc(0, 0, this.style.gaugeSize, 0, Math.PI*2, true);
    ctx.closePath();

    ctx.fillStyle = markerColor;
    ctx.fill();

    ctx.scale(1/scale, 1/scale);
    ctx.strokeStyle = this.style.gaugeColor;
    ctx.stroke();

    ctx.restore();
};
