# 𝑓Art.ᴛꜱ

> 𝑓(unctional)Art(-making).ᴛ(ype)ꜱ(cript)<br>
> an experiment by [Matt Hayes](https://github.com/mysterycommand)

## Goals

Hmm, this feels weird. I've been thinking about this a lot lately though, so I probably ought to get some of that thinking out of my head to make room for other stuff. Also, it'll be good to get in the habit of documenting stuff like this. Uhh, a list I guess:

1.  This project will be a [monorepo](https://danluu.com/monorepo/) (for [all the reasons outlined by the Babel project](https://github.com/babel/babel/blob/master/doc/design/monorepo.md))
    - This project will be different from some (most?) monorepos in that it will host packages _and_ apps using [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) and maybe [Lerna](https://lernajs.io/). I'm thinking of a structure like this:
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
2.  Particle systems
    - with [entity pooling](http://impactjs.com/documentation/entity-pooling)
3.  A game/physics engine
    - implementing some or all of [Game Programming Patterns](http://gameprogrammingpatterns.com/)
4.  Generative art & data-visualization
5.  A math utility library with helpers for:
    - waves (triangle, square, sawtooth, more?)
      - for use/rendering in WebAudio?
    - vectors (2d and 3d) … maybe look at [swizzling](https://github.com/Popmotion/vekta)
    - Verlet integration (see: [verlet-js](https://github.com/subprotocol/verlet-js))
    - matrix math … I'll have to (re)learn it first, lol
6.  A <abbr title="command line interface">CLI</abbr> for creating new projects, effects, etc. (tests!)
    - maybe [`oclif`](https://oclif.io/)
7.  An example implementation of CI/CD, dependency management tools ([Circle CI](https://circleci.com/), [Travis CI](https://travis-ci.org/), [Dependabot](https://dependabot.com/), or [Greenkeeper](https://greenkeeper.io/))
    - packages will be published to npm under the [`@fartts`](https://www.npmjs.com/org/fartts) org
    - apps will be published to GitHub Pages (the main app [`fartts.github.io`](https://github.com/fartts/fartts.github.io) being a kind of showcase of other app/experiments)
8.  A way of documenting my process
    - publishing a new app/experiment will generate a GIF or MPEG or something, publish it to [Tumblr](https://fartts.tumblr.com/), create a release (with notes), etc.
9.  Changelogs, releases, and versioning by default with [Commitizen](http://commitizen.github.io/cz-cli/)/[conventional-changelog](https://github.com/conventional-changelog/conventional-changelog)/[semantic-release](https://github.com/semantic-release/semantic-release)
10. Something that implements the best parts of the following (but in [TypeScript](http://www.typescriptlang.org/)):
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
12. A [Brett Victor](http://worrydream.com/)-inspired <abbr title="integrated development environment">IDE</abbr> itself, with some kind of <abbr title="domain specific language">DSL</abbr> for creating new particle effects
    - based maybe on [Crafting Interpreters](http://craftinginterpreters.com/)
13. 0 configuration (I hope) bundling with [Parcel](https://parceljs.org/)

## Links

- Rendering
  - [WebGL](https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html) & [WebGL 2](https://webgl2fundamentals.org/webgl/lessons/webgl-getting-webgl2.html)
- Physics & collision detection
  - [Minkowski Addition](https://en.wikipedia.org/wiki/Minkowski_addition)
  - [Hyperplane Separation Theorem](https://en.wikipedia.org/wiki/Hyperplane_separation_theorem)
  - [Collision Detection for Dummies](https://wildbunny.co.uk/blog/2011/04/20/collision-detection-for-dummies/)
  - [Collision Detection](https://en.wikipedia.org/wiki/Collision_detection)
  - [Fast and Exact Continuous Collision Detection with Bernstein Sign Classification](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4283478/)
- From [the GDC Vault](https://www.gdcvault.com/)
  - ['Owlboy': the Motivational Power of Inspiration](https://www.gdcvault.com/play/1024279/-Owlboy-The-Motivational-Power)
  - ['Owlboy': The Evolving Art of a 10 Year Project](https://www.gdcvault.com/play/1024144/-Owlboy-The-Evolving-Art)
  - ['Hyper Light Drifter': Secrets of Kickstarter, Design, & Pizza](https://www.gdcvault.com/play/1024062/-Hyper-Light-Drifter-Secrets)
  - so many more … that networked physics talk by the guy from the Rocket League team, and all the procedural talks by Squirrel Eiserloh

## Notes

> These might get removed or folded up into the main list, idk, just someplace to put things as I learn about them.

- [Touch Designer](https://www.derivative.ca/)
- [Houdini Engine](https://www.sidefx.com/products/houdini-engine/)
- [Turbulenz](https://github.com/turbulenz/turbulenz_engine)
- [List of Game Engines](https://en.wikipedia.org/wiki/List_of_game_engines)
- [WebRTC](https://codelabs.developers.google.com/codelabs/webrtc-web/#0)
