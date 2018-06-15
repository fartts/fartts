# 𝑓Art.ᴛꜱ

> 𝑓(unctional)Art(-making).ᴛ(ype)ꜱ(cript)<br>
> an experiment by [Matt Hayes](https://github.com/mysterycommand)

## Goals

Hmm, this feels weird. I've been thinking about this a lot lately though, so I probably ought to get some of that thinking out of my head to make room for other stuff. Also, it'll be good to get in the habit of documenting stuff like this. Uhh, a list I guess:

1.  This project will be a [monorepo](https://danluu.com/monorepo/) (for [all the reasons outlined by the Babel project](https://github.com/babel/babel/blob/master/doc/design/monorepo.md))
    - This project will be different in that it will host packages _and_ apps using [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) and maybe [Lerna](https://lernajs.io/)
2.  Particle systems
3.  A game/physics engine
4.  Generative art & data-visualization
5.  A math utility library with helpers for:
    - waves (triangle, square, sawtooth, more?)
      - for use/rendering in WebAudio?
    - vectors (2d and 3d) … maybe look at [swizzling](https://github.com/Popmotion/vekta)
    - Verlet integration (see: [verlet-js](https://github.com/subprotocol/verlet-js))
    - matrix math … I'll have to (re)learn it first, lol
6.  A <abbr title="command line interface">CLI</abbr> for creating new projects, effects, etc. (tests!)
    - maybe [`oclif`](https://oclif.io/)
7.  An example implementation of CI/CD, dependency management tools (Circle CI, Dependabot)
    - packages will be published to npm under the [`@fartts`](https://www.npmjs.com/org/fartts) org
    - apps will be published to GitHub Pages (the main app `fartts.github.io` being a kind of showcase of other app/experiments)
8.  A way of documenting my process
    - publishing a new app/experiment will generate a GIF or MPEG or something, publish it to [Tumblr](https://fartts.tumblr.com/), create a release (with notes), etc.
9.  Documentation by default with [Commitizen](http://commitizen.github.io/cz-cli/)/[conventional-changelog](https://github.com/conventional-changelog/conventional-changelog)/[semantic-release](https://github.com/semantic-release/semantic-release)
10. Something that implements the best parts of the following (but in TypeScript):
    - [ImpactJS](https://github.com/phoboslab/Impact)
    - [Hype](https://github.com/hype/HYPE_Processing/tree/lib_staging) (something to make [Joshua Davis](https://twitter.com/joshuadavis/) proud/jealous)
    - [Box2d](http://box2d.org/)
      - maybe in 3d?
      - maybe with Verlet integration?
      - definitely the [impact-box2d plugin](https://github.com/phoboslab/impact-box2d)
    - [Toxiclibs](https://github.com/postspectacular/toxiclibs) (and [ToxiclibsJS](https://github.com/hapticdata/toxiclibsjs))
    - [p5.js](https://github.com/processing/p5.js)? [Processing](https://github.com/processing/processing)? … easy to get started like these, better!
    - <abbr title="integrated development environment">IDE</abbr> integrations?
11. 100% (and good/meaningful) test coverage with Jest
