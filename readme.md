# phaser3-transitions

A UI transitions plugin for Phaser 3. This plugin essentialy provides a simple wrapper for some complex tweens that move UI components into and out of the scene. Each transition can also be used declaratively if you prefer not to pollute your scene with excessive plugins. 

- [Features](#feature)
- [Install and Setup](#install) 
- [Examples](#examples)
- [Plugin API](#pluginapi)
- [Transition Classes](#transitions-classses)
	- [BaseTransition](#base-transition)
	- [FadeTransition](#fade-transition)
	- [SlideTransition](#slide-transition)
	- [GrowTransition](#grow-transition)
	- [ExplodeTransition](#explode-transition)
	- [SlideFadeTransition](#slidefade-transition)
- [Using Declaratively](#using-declaratively)
- [Custom Transitions](#custom-transitions)

<a name="features"></a>
### Features
- Smooth transitions for moving UI components on and off the screen
- Simple config options for light customization
- Abstracts away repetitive and/or complex tweens
- Easily extensible via the `BaseTransition` class

<a name="install"></a>
### Install
`npm install --save phaser3-transitions`

<a name="setup"></a>
### Setup

```javascript
import Phaser from 'phaser';
import TransitionsPlugin from 'phaser3-transitions';

const gameConfig = {
    type: Phaser.WEBGL,
    parent: 'game-container',
    width: 400,
    height: 600,
    scene: [
        Preload,
        DemoScene
    ],
    plugins: {
        scene: [
            { 
                key: 'transitions', 
                mapping: 'transitions',
                plugin: TransitionsPlugin
            }
        ]
    },
};

const game = new Phaser.Game(gameConfig);

```

<a name="examples"></a>
### Examples
---
Slide in from the left, slide out to the bottom.
```javascript
import TransitionsPlugin 'phaser3-transitions';

//In your create() function
function create(){
	
    //The transition will return the sprites to their original positions
    let sprite1 = this.add.sprite(100, 100, 'menuItem');
    let sprite2 = this.add.sprite(100, 200, 'menuItem');
    let sprite3 = this.add.sprite(100, 300, 'menuItem');
	let sprites = [sprite1, sprite2, sprite3]; //etc.
    
    let config = {
    	type: 'slide',
        duration: 500,
   		enterFrom: 'left',
        exitTo: 'bottom'
    }

	let slide = this.transitions.create(sprites, config);
    
    //This will slide all the objects in and then immediately exit
   	slide.enter().then(() => {
    	slide.exit();
    });
    
}
```
---
Fade into place, fade AND slide out to the top.
```javascript
import TransitionsPlugin 'phaser3-transitions';

//In your create() function
function create(){
	
    //The transition will return the sprites to their original positions
    let sprite1 = this.add.sprite(100, 100, 'menuItem');
    let sprite2 = this.add.sprite(100, 200, 'menuItem');
    let sprite3 = this.add.sprite(100, 300, 'menuItem');
	let sprites = [sprite1, sprite2, sprite3]; //etc.
    
    let enterConfig = {
    	type: 'Fade', //not case sensitive
    }
    
    let exitConfig = {
    	type: 'FadeSlide',
        exitTo: 'top'
    }

	let enterTransitions = this.transitions.create(sprites, enterConfig);
    let exitTransition = this.transitions.create(sprites, exitConfig);
    
    //This will fade all the objects in and then immediately exit
   	enterTransition.enter().then(() => {
    	exitTransition.exit();
    });
    
}
```
<a name="pluginapi"></a>
## Plugin API

### TransitionsPlugin

The TransitionsPlugin is a factory class which creates transitions for you. Each transition extends the `BaseTransition` class and is essentially a wrapper over top of a (sometimes) complex tween. This plugin also has some ease-of-use methods for quick transitions when your transition are simple.
* Methods:
    * [register(key, transitionClass)](#TransitionsPlugin+register)
    * [create(targets, config)](#TransitionsPlugin+create) ⇒ <code>BaseTransition</code>
    * [enter(targets, config)](#TransitionsPlugin+enter) ⇒ <code>Promise</code>
    * [exit(targets, config)](#TransitionsPlugin+exit) ⇒ <code>Promise</code>

<a name="TransitionsPlugin+register"></a>

### transitions.register(key, transitionClass)
Adds a transition class to the plugin's dictionary. A transition class must extend `BaseTransition` and be registered if it is not already one of the default classes.



| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The key by which the transition can be referenced |
| transitionClass | <code>BaseTransition</code> | A class which extends the BaseTransition class |

<a name="TransitionsPlugin+create"></a>

### transitions.create(targets, config) ⇒ <code>BaseTransition</code>
Creates a new transition based on the given config


**Returns**: <code>BaseTransition</code> - - A transition class extending `BaseTransition`

| Param | Type | Description |
| --- | --- | --- |
| targets | <code>Array</code> | The targets for this transition. These cannot be changed once the transition is created. |
| config | <code>Object</code> | Settings for the transition |
| config.type | <code>String</code> | A key to one of the default transitions, which currently includes any of the following: `"Fade"`, `"Slide"`, `"Grow"`, `"Explode"`, or `"FadeSlide"`. See the class descriptions for more info about each transition. |

<a name="TransitionsPlugin+enter"></a>

### transitions.enter(targets, config) ⇒ <code>Promise</code>
Creates and starts a new enter transition


**Returns**: <code>Promise</code> - - Returns a promise which resolves when the transition is complete

| Param | Type | Description |
| --- | --- | --- |
| targets | <code>Array</code> | The GameObject targets to transition |
| config | <code>Object</code> | Settings for the transition. Must contain a transition-type key, but can also contain other config settings for the given transition type. |
| config.type | <code>String</code> | The transition key |

<a name="TransitionsPlugin+exit"></a>

### transitions.exit(targets, config) ⇒ <code>Promise</code>
Creates and starts a new exit transition


**Returns**: <code>Promise</code> - - Returns a promise which resolves when the transition is complete

| Param | Type | Description |
| --- | --- | --- |
| targets | <code>Array</code> | The GameObject targets to transition |
| config | <code>Object</code> | Settings for the transition. Must contain a transition-type key, but can also contain other config settings for the given transition type. |
| config.type | <code>String</code> | The transition key |


---

<a name="transition-classes"></a>
## Transition Classes

<a name="base-transition"></a>
### BaseTransition

The BaseTransition class implements the tweens defined in it's child classes. This class cannot be used directly as a transition, but it's methods (namely `enter()` and `exit()`) are called to initiate transitions. None of the BaseTransition methods generally need to be overridden.

* Methods
    * [new BaseTransition(params)](#new_BaseTransition_new)
    * [setConfig(config)](#BaseTransition+setConfig)
    * [resetProps(targets, cachedProps)](#BaseTransition+resetProps)
    * [enter([userConfig])](#BaseTransition+enter) ⇒ <code>Promise</code>
    * [exit([userConfig])](#BaseTransition+exit) ⇒ <code>Promise</code>

### new BaseTransition(params)

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | The config object |
| params.scene | <code>Phaser.Scene</code> | The parent scene |
| params.targets | <code>Array</code> | The target objects for the transition |
| params.defaults | <code>Object</code> | The default config options for this transition |
| params.config | <code>Object</code> | The user-defined config object, which is merged with the defaults (if provided) |
| params.enterConfig | <code>function</code> | A function which returns the tween config for the `enter` tween |
| params.exitConfig | <code>function</code> | A function which returns the tween config for the `exit` tween |
| params.affectedProps | <code>Array.&lt;String&gt;</code> | An array listing the props which are affected by this transition. This list is used to cache and reset those props when `resetProps()` is called. |

<a name="BaseTransition+setConfig"></a>
### baseTransition.setConfig(config)
Update the configuration for this transition. Any unset properties will be resolved to their defaults or settings from a previously set configuration.

| Param | Type | Description |
| --- | --- | --- |
| config | <code>Object</code> | An object defining transition configurations, such as duration, chain, etc. |

<a name="BaseTransition+resetProps"></a>

### baseTransition.resetProps(targets, cachedProps)
Returns each target object to it's initial state before either `enter()` or `exit()` was called.

| Param | Type | Description |
| --- | --- | --- |
| targets | <code>Array</code> | An array of GameObject targets |
| cachedProps | <code>Array</code> | An array of props generated by _cacheProps() |

<a name="BaseTransition+enter"></a>
### baseTransition.enter([userConfig]) ⇒ <code>Promise</code>
Starts the enter transition

**Returns**: <code>Promise</code> - - A promise which resolves when the transition's tween is complete

| Param | Type | Description |
| --- | --- | --- |
| [userConfig] | <code>Object</code> | A new config object for on-the-fly changes |

<a name="BaseTransition+exit"></a>
### baseTransition.exit([userConfig]) ⇒ <code>Promise</code>
Starts the exit transition

**Returns**: <code>Promise</code> - - A promise which resolves when the transition's tween is complete

| Param | Type | Description |
| --- | --- | --- |
| [userConfig] | <code>Object</code> | A new config object for on-the-fly changes |

---

<a name="fade-transition"></a>
### new FadeTransition(scene, targets, [config])

This transition tweens the `alpha` property of it's targets, fading object each into or out of view.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| scene | <code>Phaser.Scene</code> | null | The parent scene |
| targets | <code>Array</code> | null | An array of game objects to be included in this transition |
| [config] | <code>Object</code> | `FadeTransition.Defaults` | The config object. Defaults will be used if not provided |
| [config.duration] | <code>Number</code> | <code>500</code> | The duration of this transition |
| [config.chain] | <code>Bool</code> | <code>false</code> | When true, each object will enter individually with overlap determined by the `offset` setting |
| [config.offset] | <code>String</code> | 80% of duration| The amount of overlap (in ms) between transitions when `chain` is set to true, using this format: `"-=500"`, `"+=500"`, etc. |
| [config.fuzz] | <code>Number</code> | `0` | A number between 0 and 1 which adds randomness to the duration of this transition |

<a name="slide-transition"></a>
### new SlideTransition(scene, targets, [config])
The SlideTransition slides it's targets in and out of the scene based on the directions specified via `enterFrom` and `exitTo`. The following properties are affected: `x`, `y`

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| scene | <code>Phaser.Scene</code> | null | The parent scene |
| targets | <code>Array</code> | null | An array of game objects to be included in this transition |
| [config] | <code>Object</code> | <code>SlideTransition.Defaults</code> | The config object. Defaults will be used if not provided. |
| [config.duration] | <code>Number</code> | <code>500</code> | The duration of this transition |
| [config.chain] | <code>Bool</code> | <code>false</code> | When true, each object will enter individually with overlap determined by the `offset` setting |
| [config.offset] | <code>String</code> | <code>80% of duration</code> | The amount of overlap (in ms) between transitions when `chain` is set to true, using this format: `"-=500"`, `"+=500"`, etc. |
| [config.fuzz] | <code>Number</code> | <code>0</code> | A number between 0 and 1 which adds randomness to the duration of this transition |
| [config.enterFrom] | <code>String</code> | <code>&#x27;left&#x27;</code> | The direction from which the transition will enter. Valid options include: `"left"`, `"right"`, `"top"`, and `"bottom"` |
| [config.exitTo] | <code>String</code> | <code>&#x27;right&#x27;</code> | The direction from which the transition will exit. Valid options include: `"left"`, `"right"`, `"top"`, and `"bottom"` |

<a name="grow-transition"></a>
### new GrowTransition(scene, targets, [config])

The GrowTransition scales each object up from zero in place (as opposed to the ExplodeTransition which moves from the center out but also scales it's objects). The following properties are affected: `scaleX`, `scaleY`

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| scene | <code>Phaser.Scene</code> |  | The parent scene |
| targets | <code>Array</code> |  | An array of game objects to be included in this transition |
| [config] | <code>Object</code> | <code>SlideTransition.Defaults</code> | The config object. Defaults will be used if not provided. |
| [config.duration] | <code>Number</code> | <code>500</code> | The duration of this transition |
| [config.chain] | <code>Bool</code> | <code>false</code> | When true, each object will enter individually with overlap determined by the `offset` setting |
| [config.offset] | <code>String</code> | <code>80% of duration</code> | The amount of overlap (in ms) between transitions when `chain` is set to true, using this format: `"-=500"`, `"+=500"`, etc. |
| [config.fuzz] | <code>Number</code> | <code>0</code> | A number between 0 and 1 which adds randomness to the duration of this transition |

<a name="explode-transition"></a>
### new ExplodeTransition(scene, targets, [config])

The ExplodeTransition scales each object up from zero while sliding out from the center. The following properties are affected: `alpha`, `scaleX`, `scaleY`, `x`, `y`

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| scene | <code>Phaser.Scene</code> |  | The parent scene |
| targets | <code>Array</code> |  | An array of game objects to be included in this transition |
| [config] | <code>Object</code> | <code>ExplodeTransition.Defaults</code> | The config object. Defaults will be used if not provided. |
| [config.duration] | <code>Number</code> | <code>500</code> | The duration of this transition |
| [config.chain] | <code>Bool</code> | <code>false</code> | When true, each object will enter individually with overlap determined by the `offset` setting |
| [config.offset] | <code>String</code> | <code>80% of duration</code> | The amount of overlap (in ms) between transitions when `chain` is set to true, using this format: `"-=500"`, `"+=500"`, etc. |
| [config.fuzz] | <code>Number</code> | <code>0</code> | A number between 0 and 1 which adds randomness to the duration of this transition |


<a name="slidefade-transition"></a>
### new SlideFadeTransition(scene, targets, [config])

A combination of the Slide and Fade transitions. The following properties are affected: `alpha`, `x`, `y`

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| scene | <code>Phaser.Scene</code> |  | The parent scene |
| targets | <code>Array</code> |  | An array of game objects to be included in this transition |
| [config] | <code>Object</code> | <code>SlideFadeTransition.Defaults</code> | The config object. Defaults will be used if not provided. |
| [config.duration] | <code>Number</code> | <code>500</code> | The duration of this transition |
| [config.chain] | <code>Bool</code> | <code>false</code> | When true, each object will enter individually with overlap determined by the `offset` setting |
| [config.offset] | <code>String</code> | <code>80% of duration</code> | The amount of overlap (in ms) between transitions when `chain` is set to true, using this format: `"-=500"`, `"+=500"`, etc. |
| [config.fuzz] | <code>Number</code> | <code>0</code> | A number between 0 and 1 which adds randomness to the duration of this transition |
| [config.enterFrom] | <code>String</code> | <code>&#x27;bottom&#x27;</code> | The direction from which the transition will enter. Valid options include: `"left"`, `"right"`, `"top"`, and `"bottom"` |
| [config.exitTo] | <code>String</code> | <code>&#x27;top&#x27;</code> | The direction from which the transition will exit. Valid options include: `"left"`, `"right"`, `"top"`, and `"bottom"` |

<a name="using-declaratively"></a>
## Using Declaratively

You can bypass the plugin altogether and use each transition class declaratively if you wish. You can import any of the transition classes directly.

```javascript
import { SlideTransition } from 'phaser3-transitions';

function create(){
	
  	//The transition will return the sprites to their original positions
    let sprite1 = this.add.sprite(100, 100, 'menuItem');
    let sprite2 = this.add.sprite(100, 200, 'menuItem');
    let sprite3 = this.add.sprite(100, 300, 'menuItem');
	let sprites = [sprite1, sprite2, sprite3]; //etc.
    
    //You can omit the 'type' property when creating transition directly
    let config = {
        duration: 500,
   		enterFrom: 'left',
        exitTo: 'bottom'
    }
    
    //PARAMS: Scene, Targets, Config
    let slide = new SlideTransition(this, targets, config);
    
    slide.enter();
    
}

```

<a name="custom-transitions"></a>
## Custom Transitions

This section also coming soon...
