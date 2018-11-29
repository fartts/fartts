# 𝑓Art.ᴛꜱ

> 𝑓(unctional)Art(-making).ᴛ(ype)ꜱ(cript)<br>
> an experiment by [Matt Hayes](https://github.com/mysterycommand)

---

[![Build Status](https://travis-ci.org/fartts/fartts.svg?branch=master)](https://travis-ci.org/fartts/fartts) [![Website fartts.github.io](https://img.shields.io/website-up-down-green-red/https/fartts.github.io.svg)](https://fartts.github.io)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&identifier=131446158)](https://dependabot.com)<br>[![Maintainability](https://api.codeclimate.com/v1/badges/fcdc1b753d00ada7d241/maintainability)](https://codeclimate.com/github/fartts/fartts/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/fcdc1b753d00ada7d241/test_coverage)](https://codeclimate.com/github/fartts/fartts/test_coverage)<br>[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)<br>[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)<br>[![dependencies Status](https://david-dm.org/fartts/fartts/status.svg)](https://david-dm.org/fartts/fartts) [![devDependencies Status](https://david-dm.org/fartts/fartts/dev-status.svg)](https://david-dm.org/fartts/fartts?type=dev)<br>[![stability: experimental](https://img.shields.io/badge/stability-1%20experimental-ec5315.svg)](https://nodejs.org/api/documentation.html#documentation_stability_index) [![SemVer 2.0.0](https://img.shields.io/badge/semver-2.0.0-brightgreen.svg)](https://semver.org/) [![GitHub package version](https://img.shields.io/github/package-json/v/fartts/fartts.svg)](https://github.com/fartts/fartts/releases/tag/latest)

---

deployed to [a **GitHub** Pages organization site repository](https://github.com/fartts/fartts.github.io), visible at [https://fartts.github.io](https://fartts.github.io)

## goals

hmm, this feels weird. I've been thinking about this a lot lately though, so I probably ought to get some of that thinking out of my head to make room for other stuff. Also, it'll be good to get in the habit of documenting stuff like this. Uhh, a list I guess:

1.  this project will be a [monorepo](https://danluu.com/monorepo/) (for [all the reasons outlined by the Babel project](https://github.com/babel/babel/blob/master/doc/design/monorepo.md))
    - this project will be different from some (most?) monorepos in that it will host packages _and_ apps using [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) and maybe [Lerna](https://lernajs.io/). I'm thinking of a structure like this:
      ```sh
      .
      ├── LICENSE
      ├── README.md
      ├── apps/
      │   ├── experiment-001/
      │   └── fartts.github.io/
      └── packages/
          ├── cli/
          └── configs/
      ```
2.  particle systems
    - with [entity pooling](http://impactjs.com/documentation/entity-pooling)
3.  a game/physics engine
    - implementing some or all of [Game Programming Patterns](http://gameprogrammingpatterns.com/)
4.  generative art & data-visualization
5.  a math utility library with helpers for:
    - waves (triangle, square, sawtooth, more?)
      - for use/rendering in WebAudio?
    - vectors (2d and 3d) … maybe look at [swizzling](https://github.com/Popmotion/vekta)
    - Verlet integration (see: [verlet-js](https://github.com/subprotocol/verlet-js))
    - matrix math … I'll have to (re)learn it first, lol
6.  a <abbr title="command line interface">CLI</abbr> for creating new projects, effects, etc. (tests!)
    - maybe [`oclif`](https://oclif.io/)
7.  an example implementation of CI/CD, dependency management tools ([Circle CI](https://circleci.com/), [Travis CI](https://travis-ci.org/), [Dependabot](https://dependabot.com/), or [Greenkeeper](https://greenkeeper.io/))
    - packages will be published to npm under the [`@fartts`](https://www.npmjs.com/org/fartts) org
    - apps will be published to GitHub Pages (the main app [`fartts.github.io`](https://github.com/fartts/fartts.github.io) being a kind of showcase of other app/experiments)
8.  a way of documenting my process
    - publishing a new app/experiment will generate a GIF or MPEG or something, publish it to [Tumblr](https://fartts.tumblr.com/), create a release (with notes), etc.
9.  changelogs, releases, and versioning by default with [Commitizen](http://commitizen.github.io/cz-cli/)/[conventional-changelog](https://github.com/conventional-changelog/conventional-changelog)/[semantic-release](https://github.com/semantic-release/semantic-release)
10. something that implements the best parts of the following (but in [TypeScript](http://www.typescriptlang.org/)):
    - [ImpactJS](https://github.com/phoboslab/Impact)
    - [Hype](https://github.com/hype/HYPE_Processing/tree/lib_staging) (something to make [Joshua Davis](https://twitter.com/joshuadavis/) proud/jealous)
    - [Box2d](http://box2d.org/)
      - maybe in 3d?
      - maybe with Verlet integration?
      - definitely the [impact-box2d plugin](https://github.com/phoboslab/impact-box2d)
    - [Toxiclibs](https://github.com/postspectacular/toxiclibs) (and [ToxiclibsJS](https://github.com/hapticdata/toxiclibsjs))
    - [p5.js](https://github.com/processing/p5.js)? [Processing](https://github.com/processing/processing)? … easy to get started like these, better!
    - <abbr title="integrated development environment">IDE</abbr> integrations?
11. 100% (and good/meaningful) test coverage with [Jest](https://facebook.github.io/jest/)
12. a [Brett Victor](http://worrydream.com/)-inspired <abbr title="integrated development environment">IDE</abbr> itself, with some kind of <abbr title="domain specific language">DSL</abbr> for creating new particle effects
    - based maybe on [Crafting Interpreters](http://craftinginterpreters.com/)
13. 0 configuration (I hope) bundling with [Parcel](https://parceljs.org/)

## links

- rendering
  - [WebGL](https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html) & [WebGL 2](https://webgl2fundamentals.org/webgl/lessons/webgl-getting-webgl2.html)
- physics & collision detection
  - [Minkowski Addition](https://en.wikipedia.org/wiki/Minkowski_addition)
  - [Hyperplane Separation Theorem](https://en.wikipedia.org/wiki/Hyperplane_separation_theorem)
  - [Collision Detection for Dummies](https://wildbunny.co.uk/blog/2011/04/20/collision-detection-for-dummies/)
  - [Collision Detection](https://en.wikipedia.org/wiki/Collision_detection)
  - [Fast and Exact Continuous Collision Detection with Bernstein Sign Classification](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4283478/)
- from [the GDC Vault](https://www.gdcvault.com/)
  - ['Owlboy': the Motivational Power of Inspiration](https://www.gdcvault.com/play/1024279/-Owlboy-The-Motivational-Power)
  - ['Owlboy': The Evolving Art of a 10 Year Project](https://www.gdcvault.com/play/1024144/-Owlboy-The-Evolving-Art)
  - ['Hyper Light Drifter': Secrets of Kickstarter, Design, & Pizza](https://www.gdcvault.com/play/1024062/-Hyper-Light-Drifter-Secrets)
  - so many more … that networked physics talk by the guy from the Rocket League team, and all the procedural talks by Squirrel Eiserloh

## notes

> these might get removed or folded up into the main list, idk, just someplace to put things as I learn about them.

- [Touch Designer](https://www.derivative.ca/)
- [Houdini Engine](https://www.sidefx.com/products/houdini-engine/)
- [Turbulenz](https://github.com/turbulenz/turbulenz_engine)
- [List of Game Engines](https://en.wikipedia.org/wiki/List_of_game_engines)
- [WebRTC](https://codelabs.developers.google.com/codelabs/webrtc-web/#0)
- [XParticle](https://github.com/antoinefournier/XParticle)
- [David Lobser](http://www.dlobser.com/) ([GitHub](https://github.com/dlobser))
- [Minim](http://code.compartmental.net/tools/minim/) ([ddf/Minim](https://github.com/ddf/Minim)) - a Java audio library
- [edwardrowe/LightmapCutout](https://gist.github.com/edwardrowe/bbb73a6c5cc632e3e75667f997da9e90) - based on [this Twitter tutorial](https://twitter.com/edwardlrowe/status/996098712404398081)
- [Unity's built-in shader helper functions](https://docs.unity3d.com/Manual/SL-BuiltinFunctions.html)

## even more notes

- [vaneenige/phenomenon](https://github.com/vaneenige/phenomenon)
- [The Book of Shaders](https://thebookofshaders.com/)
  - [patriciogonzalezvivo/glslCanvas](https://github.com/patriciogonzalezvivo/glslCanvas)
- [The WebGL Reference "Card"](https://www.khronos.org/files/webgl/webgl-reference-card-1_0.pdf)
- [greggman/twgl.js](https://github.com/greggman/twgl.js)
- [greggman/webgl-fundamentals](https://github.com/greggman/webgl-fundamentals)
- [WebGLFundamentals API Docs](https://webglfundamentals.org/docs/)
