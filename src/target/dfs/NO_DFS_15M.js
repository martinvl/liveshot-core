var RingTargetBuilder = require('../RingTargetBuilder');

module.exports = new RingTargetBuilder()
        .setFrontSize(.4578)
        .setNumbersFrom(1)
        .setNumbersTo(8)
        .setRingSizes([1., .8916, .7831, .6747, .5663, .4578, .3494, .2410, .1325, .0241])
        .getTarget();
