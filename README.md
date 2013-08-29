LiveShot Core
=============
Provides low-level renderering support for LiveShot. Implements rendering of
targets and shots.

Should not be used directly in webapps, use LiveShot DOM instead. This core
library is to be extended only when new targets are needed.

General components
==================
Renderer
--------
Super class for various implementations of target and shot renderers.
```javascript
var renderer = new Renderer();

renderer.setContext(ctx)
    .setRect({
        x:100,
        y:150,
        width:400,
        height:300
    })
    .render();
```

**Public properties**  
Access and modify directly or through setter methods.
* < _CanvasRenderingContext2D_ >`context`, the canvas 2d drawing context to render into
* < _object_ >`rect`  
  Describes the rectangle to render within
    * < _number_ >`x`
    * < _number_ >`y`
    * < _number_ >`width`
    * < _number_ >`height`

**Public methods**
* **render**() - ( _void_ )  
    Renders into `context`, within the rectangle defined by `x`, `y`,
    `width` and `height`, scaled to `scale`.

**Setters**  
Return pointer to the renderer for convenience.
* **setContext**(< _CanvasRenderingContext2D_ >context) - ( _Renderer_ )
* **setPosition**(< _number_ >x, < _number_ >y) - ( _Renderer_ )
* **setSize**(< _number_ >width, < _number_ >height) - ( _Renderer_ )
* **setRect**(< _object_ >rect) - ( _Renderer_ )  
    `rect` should be as described above

Scaler
------
Calculates a scale (zoom level) given a set of shots.

**Public properties**  
* < _object_ >`shots`

**Public methods**  
* **setShots**(< _object_ >shots) - ( _Scaler_ )
* **getScale**() - ( _number_ )

TargetRenderer
--------------
This abstract class is mostly convention, and should be used as base for all
implementations of different targets. Inherits all properties and methods of
Renderer.  

**Public properties**  
* < _object_ >`style`
    * < _string_ >`backColor`, the background color of the target (normally
        white)
    * < _string_ >`frontColor`, the front color of the target (normally
        black)
* < _number_ >`scale`, the scale (zoom) at which to render

**Setters**  
Return pointer to the renderer for convenience.
* **setStyle**(< _object_ >style) - ( _TargetRenderer_ )  
    `style` should an object containing some (or all) of the style keywords
    described above
* **setScale**(< _number_ >scale) - ( _TargetRenderer_ )  

**Subclassing notes**  
Subclasses should override the following methods:
* **drawTarget**() - ( _void_ )  
    Draws the target into `context`, into a `width x height`-sized rectangle with center in
    `(0, 0)`. Target should be scaled according to `scale`, for instance, if
    `scale = 2` the target should fit exactly into the rectangle with size
    `2*width x 2*height`.

ShotRenderer
------------
Handles rendering of shots. Inherits all properties and methods of `Renderer`.
```javascript
var renderer = new ShotRenderer();

renderer.setContext(ctx)
    .setStyle({
            gaugeSize:.1,
            gaugeColor:'rgb(255, 0, 0)',
            markerColor:'rgb(0, 0, 255)',
            lastMarkerColor:'rgb(0, 255, 0)'
            })
    .setScale(2)
    .setRect({
        x:100,
        y:150,
        width:400,
        height:300
    })
    .setShots(shots)
    .render();
```

**Public properties**  
* < _object_ >`style`
    * < _number_ >`gaugeSize`  
            default value is `.015`
    * < _string_ >`gaugeColor`  
            default value is `'rgb(0, 0, 0)'`
    * < _string_ >`markerColor`  
            default value is `'rgb(0, 255, 0)'`
    * < _string_ >`lastMarkerColor`  
            default value is `'rgb(255, 0, 0)'`
* < _object_ >`shots`, should be object created by ShotListBuilder
* < _number_ >`scale`, the scale (zoom) at which to render  
        default value is `1`

**Setters**  
Return pointer to the renderer for convenience.
* **setStyle**(< _object_ >style) - ( _ShotRenderer_ )  
    `style` should an object containing some (or all) of the style keywords
    described above
* **setShots**(< _object_ >shots) - ( _ShotRenderer_ )
* **setScale**(< _number_ >scale) - ( _ShotRenderer_ )


Tools for ring targets
======================
RingTargetRenderer
------------------
Super class for various implementations of ring-target renderers. Inherits all
properties and methods of TargetRenderer.  
```javascript
var renderer = new RingTargetRenderer();

renderer.setContext(ctx)
    .setStyle({backColor:'rgb(255, 0, 0)', frontColor:'rgb(0, 0, 255)'})
    .setScale(2)
    .setRect({
        x:100,
        y:150,
        width:400,
        height:300
    })
    .setTarget(target)
    .render();
```

**Public properties**  
* < _object_ >`style`  
    Extended from `TargetRenderer`
    * < _boolean_ >`drawFullTarget`, `true` if the entire target should be
    drawn, even if it extends outside the drawing rectangle. `false` if only
    rings that fully fit inside the rectangle should be drawn.
* < _object_ >`target`, should be object created by RingTargetBuilder

**Setters**  
Return pointer to the renderer for convenience.
* **setTarget**(< _object_ >target) - ( _RingTargetRenderer_ )  
    `target` should be object created by RingTargetBuilder

RingTargetScaler
----------------
Super class for various implementations of ring-target scalers. Inherits all
propterties and methods of `Scaler`.
```javascript
var scale = new RingTargetScaler()
    .setTarget(target)
    .setShots(shots)
    .getScale();
```

**Public properties**  
* < _object_ >`target`, should be object created by RingTargetBuilder

**Public methods**  
* **setTarget**(< _object_ >target) - ( _RingTargetScaler_ )  
    `target` should be object created by RingTargetBuilder

RingTargetBuilder
-----------------
Builds `RingTarget` objects needed by `RingTargetScaler` and
`RingTargetRenderer`.
```javascript
var target = new RingTargetBuilder()
    .setRingSizes([1., .9, .8, .7, .6, .5, .4, .3, .2, .1, .05])
    .setBlackSize(.4)
    .setNumbersFrom(1)
    .setNumbersTo(9)
    .getTarget();
```

* (static method) **RingTargetBuilder.createBlankTarget**() - ( _object_ )  
    Creates and returns a new empty target, with all fields present, but set to
    empty placeholder values.
* **reset**() - ( _RingTargetBuilder_ )  
    Resets the current target. Returns pointer to the builder for convenience.
* **getTarget**() - ( _object_ )  
    Returns pointer to the current target
* **setRingSizes**(< _array_ >ringSizes) - ( _RingTargetBuilder_ )  
    `ringSizes` should be a stricly decreasing positive sequence of
    numbers. Each number represents the radius of a ring on the target. The
    largest should ring always have size `1`.
* **setFrontSize**(< _number_ >frontSize) - ( _RingTargetBuilder_ )  
    `frontSize` is the size of the black disc with repect to the target size.
    For instance, a target with radius `300mm` and a black disc with radius
    `120mm`, `frontSize` should be `120mm / 300mm = .4`.
* **setNumbersFrom**(< _number_ >numbersFrom) - ( _RingTargetBuilder_ )
* **setNumbersTo**(< _number_ >numbersFrom) - ( _RingTargetBuilder_ )

List of implemented targets
===========================
All these targets are accesible through the `targets` object on the root object
of the package.

DFS range targets
-----------------
All DFS range targets are ring targets and should be rendered with
RingTargetRenderer and scaled with RingTargetScaler.

* DFS 300m target: `require('liveshot-core').targets.NO_DFS_300M`
* DFS 200m target: `require('liveshot-core').targets.NO_DFS_200M`
* DFS 100m target: `require('liveshot-core').targets.NO_DFS_100M`
* DFS 15m target: `require('liveshot-core').targets.NO_DFS_15M`
