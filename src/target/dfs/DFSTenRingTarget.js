var RingTargetBuilder = require('../RingTargetBuilder');

module.exports = new RingTargetBuilder()
        .setFrontSize(.4)
        .setNumbersFrom(1)
        .setNumbersTo(9)
        .setRingSizes([1., .9, .8, .7, .6, .5, .4, .3, .2, .1, .05])
        .getTarget();
