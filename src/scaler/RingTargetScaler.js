var Scaler = require('./Scaler');

function RingTargetScaler() {
    Scaler.prototype.constructor.apply(this);
}

RingTargetScaler.prototype = new Scaler();
RingTargetScaler.prototype.constructor = RingTargetScaler;
module.exports = RingTargetScaler;

// --- External API ---
RingTargetScaler.prototype.setTarget = function (target) {
    this.target = target;

    return this;
};

RingTargetScaler.prototype.getScale = function () {
    // find the largest distance from center to shot
    var maxDist = 0;
    var numShots = 0;
    for (var idx in this.shots) {
        var shot = this.shots[idx];
        var r = Math.sqrt(shot.x*shot.x + shot.y*shot.y);

        maxDist = Math.max(maxDist, r);
        ++numShots;
    }

    if (numShots == 0) {
        maxDist = .2;
    }

    // find rings containing all shots
    var ringSizes = [];
    for (var idx in this.target.ringSizes) {
        var ringSize = this.target.ringSizes[idx];

        if (ringSize > maxDist) {
            ringSizes.push(ringSize);
        } else {
            break;
        }
    }

    // scale to one ring larger than the smallest ring containing all shots
    var size = 1;
    if (ringSizes.length > 1) {
        size = ringSizes[ringSizes.length - 2];
    }

    return 1 / size;
};
