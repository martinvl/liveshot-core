function RingTargetBuilder() {
    this.reset();
}

module.exports = RingTargetBuilder;

// --- External API ---
RingTargetBuilder.createBlankTarget = function () {
    var target = {
        ringSizes:[1],
        frontSize:1,
        numbersFrom:1,
        numbersTo:1
    };

    return target;
};

RingTargetBuilder.prototype.reset = function () {
    this.target = this.constructor.createBlankTarget();

    return this;
};

RingTargetBuilder.prototype.getTarget = function () {
    return this.target;
};

RingTargetBuilder.prototype.setRingSizes = function (ringSizes) {
    this.target.ringSizes = ringSizes;

    return this;
};

RingTargetBuilder.prototype.setFrontSize = function (frontSize) {
    this.target.frontSize = frontSize;

    return this;
};

RingTargetBuilder.prototype.setNumbersFrom = function (numbersFrom) {
    this.target.numbersFrom = numbersFrom;

    return this;
};

RingTargetBuilder.prototype.setNumbersTo = function (numbersTo) {
    this.target.numbersTo = numbersTo;

    return this;
};
