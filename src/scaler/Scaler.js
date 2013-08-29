function Scaler() {
    this.shots = [];
}

module.exports = Scaler;

// --- External API ---
Scaler.prototype.setShots = function (shots) {
    this.shots = shots;

    return this;
};

Scaler.prototype.getScale = function () {
    // to be overloaded
};
