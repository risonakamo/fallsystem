## Fall System*
*tentative name

Fall System is a super simple particle system usable with [Two.js](https://two.js.org/). It can be added to a Two.js context already in use, or a new Two.js canvas context can be created for it and placed anywhere.

## Demonstration
Fall System being used with two Particle classes, Snow and Rain, with a pixel art design:
https://risonakamo.github.io/fallsystem.

**To run on your own:** All files pertaining to the system itself can be located in the fallsystem folder. Simply include the js file(s) on an html page. Two.js is required.
- fallsystem.js
- snow.js
- rain.js

## Usage
Fall System takes given Particle classes with options and updates them with Two.js's animation loop. The Particle classes that can be given to the Fall System can be designed relatively how the user wishes, making the system extensible for different particles.

### Creating an instance
```javascript
    var fsystem=new fallSystem(two,particleConfigs);
```
- two: Two context. [Two.js](https://two.js.org/)'s documentation is help in understand usage of Two.
- particleConfigs: **Array** of **one or more** particleConfig Objects each with the following properties:
    - particleConfig.particle: a Particle class
    - particleConfig.particleOptions: a generic Object to be given to the Particle class.
    - particleConfig.particleAmount: number of this particle to create.

### Using an instance
An instance of fall system includes the following functions:

#### update()
Performs a frame update of particles in the Fall System. Most effective when placed in a Two.js update loop.
```javascript
    var fallsystem=new fallSystem(two,particleConfigs);

    two.bind("update",()=>{
        fallsystem.update();
    });

    two.play();
```

#### playPause()
Toggle play state of Two context fall system is attached to.

#### toggleRespawn(int index)
Flips `dontRespawn` property of all Particles of a given `particleConfig`.
```javascript
    var fallsystem=new fallSystem(two,[config1,config2]);

    fallsystem.toggleRespawn(0); //particles made by config1 will have their "dontRespawn" property toggled
```

### Creating Particle classes
Particle classes provided to the Fall System are free to handle particle rendering and logic on their own, using the functionality of Two.js or other libraries. However they must provide a few functions to be operational with Fall System:

#### Particle constructor(two,fsystem,options)
The constructor must take the Two context, the fall system object which will be instantiating the Particle,  and the generic options object, provided by the particleConfig.

#### Particle.updateSelf()
The Particle class should use this function to update any shapes it creates.

Additionally Fall System may set this property on instances of provided Particles:

#### Bool Particle.dontRespawn
Set on all Particles of a particleConfig when toggleRespawn() is called.

## Snow and Rain
Snow and Rain are the included demonstration Particle classes. They feature customisable options as an alternative to making a new Particle from scratch. But are probably really slow because I've never made a particle system before

All Particle classes are given particleOptions objects by Fall System, the Snow particle's options can include the following properties to modify its behaviour:
- function shape: a function returning a Two Shape to be used as the sprite of the particle
- float[2] xSpawnOffset: Snow particles will spawn anywhere along the width of the Two area, an array of two numbers can be given to adjust that range
- float[2] fallSpeedRange: Snow falls at a random speed between this range
- float[2] scaleRange: Snow is scaled to a random value between this range
- float[2] opacityRange: Snow is set to a random opacity between this range
- int respawnOffset: Snow despawns at this value past the bottom of the Two canvas area
- int maxDrift: Maximum horizontal speed of snow
- float[2] driftVariation: range at which horizontal speed can be adjusted
- int[2] driftPerFrames: drift is varied at a certain random frame interval between this range

All options are optional. The Rain Particle is just the Snow particle but with different options and a different Shape function, and as such take the same options.

Snow.js and Rain.js additionally include shape functions which produce Two.js sprites for use by the particle instance. These can be viewed inside Snow and Rain's respective js files.

#### additional notes
- "snow blowing" occurs when hovering over the rain button
- when switching particles it may seem like the other particles have not stopped yet. The other particles do indeed stop *spawning*, but do not immediately disappear from the page as suddenly disappearing does not look as good. Instead they continue to float downward before disappearing.