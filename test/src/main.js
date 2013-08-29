var LiveShot = require('../../index');
var ResultBuilder = require('liveshot-protocol').ResultBuilder;

var width = 400;//Math.floor(window.innerWidth / 3);
var height = 300;//Math.floor(window.innerHeight / 3);

var canvas = document.createElement('canvas');
canvas.width = width;
canvas.height = height;

document.body.appendChild(canvas);
var ctx = canvas.getContext('2d');
var rect = {x:0, y:0, width:width, height:height};

var target = LiveShot.targets.NO_DFS_100M;
var resultBuilder = new ResultBuilder();

var targetRenderer = new LiveShot.RingTargetRenderer()
    .setContext(ctx)
    .setRect(rect)
    .setTarget(target);
var scaler = new LiveShot.RingTargetScaler()
    .setTarget(target);
var shotRenderer = new LiveShot.ShotRenderer()
    .setContext(ctx)
    .setStyle({gaugeSize:.015})
    .setRect(rect);

function render() {
    ctx.clearRect(rect.x, rect.y, rect.width, rect.height);

    var r = Math.random();
    var value = Math.floor(Math.random() * 100)/10;
    var seriesSum = Math.floor(Math.random()*100);
    var totalSum = Math.floor(2.5*seriesSum);

    resultBuilder.resetShots()
                 .addShotData(Math.random()*r - .1, Math.random()*r - .1, value)
                 .addShotData(Math.random()*r - .1, Math.random()*r - .1, value)
                 .addShotData(Math.random()*r - .1, Math.random()*r - .1, value)
                 .addShotData(Math.random()*r - .1, Math.random()*r - .1, value)
                 .addShotData(Math.random()*r - .1, Math.random()*r - .1, value)
                 .addShotData(Math.random()*r - .1, Math.random()*r - .1, value)
                 .addShotData(Math.random()*r - .1, Math.random()*r - .1, value)
                 .setSeriesSum(seriesSum)
                 .setTotalSum(totalSum);
    var shots = resultBuilder.getResult().shots;

    var scale = scaler.setShots(shots).getScale();
    targetRenderer.setScale(scale).render();
    shotRenderer.setShots(shots).setScale(scale).render();
}

setInterval(render, 500);
render();
