var RingTargetScaler = require('../scaler/RingTargetScaler');
var RingTargetRenderer = require('../renderer/RingTargetRenderer');

var targets =  {
    'NO_DFS_100M':require('./dfs/NO_DFS_100M'),
    'NO_DFS_200M':require('./dfs/NO_DFS_200M'),
    'NO_DFS_300M':require('./dfs/NO_DFS_300M'),
    'NO_DFS_15M':require('./dfs/NO_DFS_15M')
};

function getTarget(targetID) {
    return targets[targetID];
}

function getScaler(targetID) {
    switch (targetID) {
        case 'NO_DFS_100M':
        case 'NO_DFS_200M':
        case 'NO_DFS_300M':
        case 'NO_DFS_15M':
            return new RingTargetScaler()
                .setTarget(getTarget(targetID));
    }
}

function getRenderer(targetID) {
    switch (targetID) {
        case 'NO_DFS_100M':
        case 'NO_DFS_200M':
        case 'NO_DFS_300M':
        case 'NO_DFS_15M':
            return new RingTargetRenderer()
                .setTarget(getTarget(targetID));
    }
}

module.exports = {
    getTarget:getTarget,
    getScaler:getScaler,
    getRenderer:getRenderer
};

for (var targetID in targets) {
    module.exports[targetID] = targets[targetID];
}
