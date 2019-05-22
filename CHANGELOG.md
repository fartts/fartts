## [1.20.1](https://github.com/fartts/fartts/compare/v1.20.0...v1.20.1) (2019-05-22)


### Performance Improvements

* **lab/13/lib.rs:** now that scroll/pinch/zoom is effectively squashed, we can do a lot less math t ([7eb39bf](https://github.com/fartts/fartts/commit/7eb39bf))

# [1.20.0](https://github.com/fartts/fartts/compare/v1.19.4...v1.20.0) (2019-05-21)


### Features

* **cli:** add a new micro-CLI for creating new experiments ([7827513](https://github.com/fartts/fartts/commit/7827513))
* **lab/13:** allow a limited kind of live drawing, need more ui controls ... they're stubbed in for ([15d4440](https://github.com/fartts/fartts/commit/15d4440))
* **lab/13:** boilerplate for a new experiment ([9984d0b](https://github.com/fartts/fartts/commit/9984d0b))
* **lab/13:** compiles, but panics at runtime ... first pass at adding a rAF in Rust ([e8189e6](https://github.com/fartts/fartts/commit/e8189e6))
* **lab/13:** first pass, game of life, rendering to console ([c9b4f3e](https://github.com/fartts/fartts/commit/c9b4f3e))
* **lab/13:** it works! ([1e8a40b](https://github.com/fartts/fartts/commit/1e8a40b))

## [1.19.4](https://github.com/fartts/fartts/compare/v1.19.3...v1.19.4) (2019-05-09)


### Bug Fixes

* **package.json:** bump parcel-plugin-wasm-pack, hopefully this re-fixes the multi-Rust install issu ([a6c73dd](https://github.com/fartts/fartts/commit/a6c73dd))

## [1.19.3](https://github.com/fartts/fartts/compare/v1.19.2...v1.19.3) (2019-05-08)


### Bug Fixes

* **package.json:** bump to 2.0.0 hopefully don't double run rustup update ([4d01760](https://github.com/fartts/fartts/commit/4d01760))

## [1.19.2](https://github.com/fartts/fartts/compare/v1.19.1...v1.19.2) (2019-04-16)


### Bug Fixes

* **src/lib/core/wave.ts:** add a CurriedWaveFunction type so that TS knows the types of the argument ([558408e](https://github.com/fartts/fartts/commit/558408e))

## [1.19.1](https://github.com/fartts/fartts/compare/v1.19.0...v1.19.1) (2019-04-16)


### Bug Fixes

* **package.json:** add the patched version of the sr-gh-pr plugin ([6fcbc8c](https://github.com/fartts/fartts/commit/6fcbc8c))

# [1.19.0](https://github.com/fartts/fartts/compare/v1.18.0...v1.19.0) (2019-03-29)


### Features

* **lab/12:** 2 different crates in 2 different labs ([d94d23e](https://github.com/fartts/fartts/commit/d94d23e))
* **lab/12:** add 10,000 black particles, it's rough, but it sorta works ([d95e6a1](https://github.com/fartts/fartts/commit/d95e6a1))
* **lab/12:** add global mutable state to Rust ([d22f561](https://github.com/fartts/fartts/commit/d22f561))
* **lab/12:** create a screen state closure, keep a store up to date and expose getters ([e16c30a](https://github.com/fartts/fartts/commit/e16c30a))
* **lab/12:** it breaths! ([92fe124](https://github.com/fartts/fartts/commit/92fe124))
* **lab/12:** just dinking around with how to get resize data into some kind of world state ([65a1c22](https://github.com/fartts/fartts/commit/65a1c22))
* **lab/12:** makes the confetti colored, sort of string shaped, transparent ([8e816eb](https://github.com/fartts/fartts/commit/8e816eb))

# [1.18.0](https://github.com/fartts/fartts/compare/v1.17.0...v1.18.0) (2019-03-08)


### Features

* **none:** adding an empty feature to get a version bump to hide my mistake ([3671b24](https://github.com/fartts/fartts/commit/3671b24))

# [1.17.0](https://github.com/fartts/fartts/compare/v1.16.5...v1.17.0) (2019-03-07)


### Features

* **lab/11:** add a rust/wasm module that paints the canvas red ([47ab505](https://github.com/fartts/fartts/commit/47ab505))
* **lab/11:** add boilerplate for a new experiment ([6922f03](https://github.com/fartts/fartts/commit/6922f03))
* **lab/11:** draw a white dot in the middle of the canvas ([a7fcfb4](https://github.com/fartts/fartts/commit/a7fcfb4))
* **lab/11:** resize the canvas and rendering context ([05b07fc](https://github.com/fartts/fartts/commit/05b07fc))

## [1.16.5](https://github.com/fartts/fartts/compare/v1.16.4...v1.16.5) (2019-03-07)


### Bug Fixes

* **lab/10:** fix grey flash on click ([d28bd91](https://github.com/fartts/fartts/commit/d28bd91))

## [1.16.4](https://github.com/fartts/fartts/compare/v1.16.3...v1.16.4) (2019-01-27)


### Bug Fixes

* **lab/10:** another stab at fixing the non-rendering canvas in iframe on phones on squarespace issu ([a35f33b](https://github.com/fartts/fartts/commit/a35f33b))
* **lab/10:** more messing with media events, logging the error name and message makes me realize tha ([4331765](https://github.com/fartts/fartts/commit/4331765))
* **lab/10:** what a long strange trip this has been ([3f4213b](https://github.com/fartts/fartts/commit/3f4213b))

## [1.16.3](https://github.com/fartts/fartts/compare/v1.16.2...v1.16.3) (2019-01-26)


### Bug Fixes

* **lab/10:** another shot in the dark, seen a promise error once or twice, just swallow it ([f3de353](https://github.com/fartts/fartts/commit/f3de353))

## [1.16.2](https://github.com/fartts/fartts/compare/v1.16.1...v1.16.2) (2019-01-26)


### Bug Fixes

* **lab/10:** make sure the buffer is in a valid state before calling drawImage on it ([2891269](https://github.com/fartts/fartts/commit/2891269))

## [1.16.1](https://github.com/fartts/fartts/compare/v1.16.0...v1.16.1) (2019-01-24)


### Bug Fixes

* **lab/10:** fixes (well, works around) the mobile safari 'canplaythrough' issue ([a62c594](https://github.com/fartts/fartts/commit/a62c594))

# [1.16.0](https://github.com/fartts/fartts/compare/v1.15.0...v1.16.0) (2019-01-18)


### Features

* **lab/10:** an experiment with git lfs and parcel's bundling of mp3s ([62c71fb](https://github.com/fartts/fartts/commit/62c71fb))

# [1.15.0](https://github.com/fartts/fartts/compare/v1.14.0...v1.15.0) (2019-01-18)


### Features

* **lab/10:** adds a config object to branches for some of the variable ranges, it's very computatio ([c6d3e94](https://github.com/fartts/fartts/commit/c6d3e94))
* **lab/10:** adds alpha to the tree interface to try and track clean up, sorta works, but it's stil ([73f02bf](https://github.com/fartts/fartts/commit/73f02bf))
* **lab/10:** adds back gradients, click to plant trees ([523afd1](https://github.com/fartts/fartts/commit/523afd1))
* **lab/10:** drawing trees again, separated the collar/branch data, just white trees for now ([988c336](https://github.com/fartts/fartts/commit/988c336))
* **lab/10:** it paints now, but it just accumulates memory and slows down super fast ([6fd5e6d](https://github.com/fartts/fartts/commit/6fd5e6d))
* **lab/10:** run the branch generator in a worker ([1b9e37e](https://github.com/fartts/fartts/commit/1b9e37e))
* **lab/10:** stubs out a new experiment for the song trees thing ([33cdcf8](https://github.com/fartts/fartts/commit/33cdcf8))

# [1.14.0](https://github.com/fartts/fartts/compare/v1.13.0...v1.14.0) (2019-01-11)


### Features

* **lab/09:** a handle, and pointer (mouse and touch) event handling ([038fe44](https://github.com/fartts/fartts/commit/038fe44))
* **lab/09:** a rectangle ([2ad6ca4](https://github.com/fartts/fartts/commit/2ad6ca4))
* **lab/09:** a simple resize/draw loop ([d054651](https://github.com/fartts/fartts/commit/d054651))
* **lab/09:** a stub of an experiment in creating bezier waveforms ([8fb95f5](https://github.com/fartts/fartts/commit/8fb95f5))
* **lab/09:** adds shadow handles, and a shadow curve ([e9664da](https://github.com/fartts/fartts/commit/e9664da))
* **lab/09:** it's a bezier curve toy ([f579d26](https://github.com/fartts/fartts/commit/f579d26))
* **lab/09:** multiple handles ([188211a](https://github.com/fartts/fartts/commit/188211a))

# [1.13.0](https://github.com/fartts/fartts/compare/v1.12.0...v1.13.0) (2018-12-20)


### Features

* **lab/08-more-trees:** getting somewhere interesting ([c0defcb](https://github.com/fartts/fartts/commit/c0defcb))
* **lab/08-more-trees:** use generators and iterators to render trees one branch at a time breadth-w ([b90fe81](https://github.com/fartts/fartts/commit/b90fe81))
* **lib/core/math:** add randomInt function ([f21102f](https://github.com/fartts/fartts/commit/f21102f))

# [1.12.0](https://github.com/fartts/fartts/compare/v1.11.1...v1.12.0) (2018-12-05)


### Features

* **lab/07-trees:** an initial random tree generator ([c49bd75](https://github.com/fartts/fartts/commit/c49bd75))
* **lab/07-trees:** painting with trees ([60b2bfd](https://github.com/fartts/fartts/commit/60b2bfd))
* **lab/07-trees:** some final tweaks, add styling so it works on mobile, fix scaling issue with tou ([3669e91](https://github.com/fartts/fartts/commit/3669e91))
* **lib/core/dom:** add an off function to remove event listeners, and tests for it ([6c8427c](https://github.com/fartts/fartts/commit/6c8427c))
* **lib/core/math:** add a randomRange function and tests ([cdc7871](https://github.com/fartts/fartts/commit/cdc7871))

## [1.11.1](https://github.com/fartts/fartts/compare/v1.11.0...v1.11.1) (2018-12-04)


### Bug Fixes

* **lab/06-circles:** rename lab for clarity ([b7cfa5d](https://github.com/fartts/fartts/commit/b7cfa5d))
* **lab/06-circles:** update the title ([86fee30](https://github.com/fartts/fartts/commit/86fee30))

# [1.11.0](https://github.com/fartts/fartts/compare/v1.10.0...v1.11.0) (2018-12-04)


### Bug Fixes

* **lib/vec:** add a displayName and toString method to each class so the minifier doesn't think they ([a978708](https://github.com/fartts/fartts/commit/a978708))
* **lib/vec:** fixes [#311](https://github.com/fartts/fartts/issues/311) ([b4b3613](https://github.com/fartts/fartts/commit/b4b3613))
* **vec2:** fixes [#311](https://github.com/fartts/fartts/issues/311), adds toString in the class declaration, only to vec2, and not in the definePr ([8275cbe](https://github.com/fartts/fartts/commit/8275cbe))


### Features

* **lab/06-sprites:** an experiment in sprites ([d1ad407](https://github.com/fartts/fartts/commit/d1ad407))
* **lab/06-sprites:** going with context 2d for this one, want to draw paths and pixelate them ([9289f7c](https://github.com/fartts/fartts/commit/9289f7c))
* **lab/06-sprites:** implements midpoint-circle for sharp pixel approximated circles ([501c4a9](https://github.com/fartts/fartts/commit/501c4a9))
* **lab/06-sprites:** just messing with canvas and the resizer (which I like a lot better now) ([fef8cea](https://github.com/fartts/fartts/commit/fef8cea))
* **lib/core/util:** add a reexport for Number.isInteger ([1805983](https://github.com/fartts/fartts/commit/1805983))

# [1.10.0](https://github.com/fartts/fartts.git/compare/v1.9.0...v1.10.0) (2018-11-28)


### Bug Fixes

* **lib/vec:** removes old proxy-bases swizzle implementation in favor of decorated prototypes (faste ([acd5d23](https://github.com/fartts/fartts.git/commit/acd5d23)), closes [#118](https://github.com/fartts/fartts.git/issues/118) [#117](https://github.com/fartts/fartts.git/issues/117)


### Features

* **lib/math:** reexport Number.isNumber ([4a77f96](https://github.com/fartts/fartts.git/commit/4a77f96))
* **lib/vec:** create vec2, vec3, and vec4 factory functions, going to prefer their usage over 'new ([8baa748](https://github.com/fartts/fartts.git/commit/8baa748))
* **lib/vec:** first pass at an 'on-the-prototype' version of the swizzled vectors ([3bee17e](https://github.com/fartts/fartts.git/commit/3bee17e))
* **lib/vec:** impliment setters ([e98e7be](https://github.com/fartts/fartts.git/commit/e98e7be))
* **lib/vec/types:** updates to make the swizzled types work for each Vec class ([9ca0c33](https://github.com/fartts/fartts.git/commit/9ca0c33))

# [1.9.0](https://github.com/fartts/fartts.git/compare/v1.8.4...v1.9.0) (2018-11-24)


### Bug Fixes

* **05-tweens/program:** rework the validation a bit to have a single info/message ([97f94ed](https://github.com/fartts/fartts.git/commit/97f94ed))
* **05-tweens/shader:** pull the info out of the shader before deleting it ([b6e769a](https://github.com/fartts/fartts.git/commit/b6e769a))


### Features

* **lab/05-tweens:** adds travellers along the sampled wave paths ([8c653b4](https://github.com/fartts/fartts.git/commit/8c653b4))
* **lab/05-tweens:** copies most of 04-vectors and strips it down for a new experiment ([40ed842](https://github.com/fartts/fartts.git/commit/40ed842))
* **lab/05-tweens:** draw samples of 4 wave functions ([5f76128](https://github.com/fartts/fartts.git/commit/5f76128))


### Performance Improvements

* **spike:** spike out a prototype-over-proxy implementation of the swizzled key stuff ([db93bcf](https://github.com/fartts/fartts.git/commit/db93bcf))

## [1.8.4](https://github.com/fartts/fartts/compare/v1.8.3...v1.8.4) (2018-10-06)


### Bug Fixes

* **build:** adds stuff to make parcel use Babel 7 to compile TypeScript ([88ca648](https://github.com/fartts/fartts/commit/88ca648))

## [1.8.3](https://github.com/fartts/fartts/compare/v1.8.2...v1.8.3) (2018-10-06)


### Bug Fixes

* **lab:** delete the unsuccessful shader/program before throwing ([bfbe290](https://github.com/fartts/fartts/commit/bfbe290))
* **lab:** fix new type errors (based on new typings in 3.1.1 I guess?) ([92a0644](https://github.com/fartts/fartts/commit/92a0644))

## [1.8.2](https://github.com/fartts/fartts/compare/v1.8.1...v1.8.2) (2018-09-19)


### Bug Fixes

* **package.json:** rollback semantic-release to 15.6.6 ([2cd743d](https://github.com/fartts/fartts/commit/2cd743d))
* **yarn.lock:** yarn upgrade, marked fix to test out semantic-release-github-pr ([63ef6ae](https://github.com/fartts/fartts/commit/63ef6ae))

## [1.8.1](https://github.com/fartts/fartts/compare/v1.8.0...v1.8.1) (2018-09-09)


### Bug Fixes

* **lab/04:** remove code that's in lib now ([dd7f107](https://github.com/fartts/fartts/commit/dd7f107))
* **lab/04:** remove vestigial util ([6a5fc14](https://github.com/fartts/fartts/commit/6a5fc14))
* **lib/util & lab/04:** move resize stuff into lib/util ([cfd68d5](https://github.com/fartts/fartts/commit/cfd68d5))

# [1.8.0](https://github.com/fartts/fartts/compare/v1.7.1...v1.8.0) (2018-09-09)


### Features

* **lib:** add a rough stub of a game loop ([2787d72](https://github.com/fartts/fartts/commit/2787d72))

## [1.7.1](https://github.com/fartts/fartts/compare/v1.7.0...v1.7.1) (2018-09-04)


### Bug Fixes

* **lab:** fixes the 04-vectors example to actually use vectors ([c905c1b](https://github.com/fartts/fartts/commit/c905c1b))

# [1.7.0](https://github.com/fartts/fartts/compare/v1.6.0...v1.7.0) (2018-09-03)


### Features

* **app:** add a link to the vector experiment to the main app ([5d35b63](https://github.com/fartts/fartts/commit/5d35b63))
* **lib:** more math, this is actually fun again now ([357022e](https://github.com/fartts/fartts/commit/357022e))
* **lib/vec:** add public static origin list of vectors ([f41b51b](https://github.com/fartts/fartts/commit/f41b51b))

# [1.6.0](https://github.com/fartts/fartts/compare/v1.5.2...v1.6.0) (2018-09-03)


### Features

* **lib:** a vector class extends Float32Array, adds some helpful methods/accessors ([046b3c7](https://github.com/fartts/fartts/commit/046b3c7))
* **lib:** add some simple instance methods ([6bf86e0](https://github.com/fartts/fartts/commit/6bf86e0))
* **lib:** stub of a new vec implementation ([f62537b](https://github.com/fartts/fartts/commit/f62537b))

## [1.5.2](https://github.com/fartts/fartts/compare/v1.5.1...v1.5.2) (2018-09-02)


### Bug Fixes

* **lib:** fixes [#134](https://github.com/fartts/fartts/issues/134), minimizes type casting, removes the switch ([9e5f5ac](https://github.com/fartts/fartts/commit/9e5f5ac))

## [1.5.1](https://github.com/fartts/fartts/compare/v1.5.0...v1.5.1) (2018-09-01)


### Bug Fixes

* **lib:** fixes [#120](https://github.com/fartts/fartts/issues/120) ([fabb871](https://github.com/fartts/fartts/commit/fabb871))

# [1.5.0](https://github.com/fartts/fartts/compare/v1.4.0...v1.5.0) (2018-08-26)


### Bug Fixes

* **lib:** fixes [#119](https://github.com/fartts/fartts/issues/119), throws 'vector field selection out of range' ([21ebea6](https://github.com/fartts/fartts/commit/21ebea6))


### Features

* start a new experiment by shuffling some stuff around ([6d556a3](https://github.com/fartts/fartts/commit/6d556a3))
* **lib:** a passing set of vector constructors ([14c2733](https://github.com/fartts/fartts/commit/14c2733))
* **lib:** initial pass at a swizzle-able vector that proxies Float32Array ([f1c22eb](https://github.com/fartts/fartts/commit/f1c22eb))

# [1.4.0](https://github.com/fartts/fartts/compare/v1.3.1...v1.4.0) (2018-08-17)


### Bug Fixes

* **lab:** fix the error message and info log call ([4ae8c7b](https://github.com/fartts/fartts/commit/4ae8c7b))


### Features

* **lab:** add a step function ([6999512](https://github.com/fartts/fartts/commit/6999512))
* **lab:** add a very rough wave demo ([0663762](https://github.com/fartts/fartts/commit/0663762))
* **lab:** add boilerplate for a waveforms experiment ([404ba49](https://github.com/fartts/fartts/commit/404ba49))
* **lab:** add convenience wave and step functions for common trig functions ([a375557](https://github.com/fartts/fartts/commit/a375557))
* **lab:** add experimental shader and program modules ([c44d642](https://github.com/fartts/fartts/commit/c44d642))
* **lab:** add several circle thingy configs ([26d9973](https://github.com/fartts/fartts/commit/26d9973))
* **lab:** calculate the canvas' scaled size based on device pixels ([1893944](https://github.com/fartts/fartts/commit/1893944))
* **lab:** program boilerplate ([366e277](https://github.com/fartts/fartts/commit/366e277))
* **lib/wave:** add a wave generator function ([84c583c](https://github.com/fartts/fartts/commit/84c583c))


### Performance Improvements

* **lab:** looks like parcel only recognizes the simple string match ([e65289c](https://github.com/fartts/fartts/commit/e65289c))

## [1.3.1](https://github.com/fartts/fartts/compare/v1.3.0...v1.3.1) (2018-08-07)


### Bug Fixes

* **experiments:** fix css, compute styling, scale canvas ([1ab744d](https://github.com/fartts/fartts/commit/1ab744d))

# [1.3.0](https://github.com/fartts/fartts/compare/v1.2.1...v1.3.0) (2018-08-05)


### Features

* **experiments:** add a new experiment ([fd5dca1](https://github.com/fartts/fartts/commit/fd5dca1))
* **experiments:** add glsl asset handling ([c9b0ebf](https://github.com/fartts/fartts/commit/c9b0ebf))
* **experiments:** incremental progress is progress ([e69e22b](https://github.com/fartts/fartts/commit/e69e22b))
* **experiments:** resize the canvas to fit the screen ([9f7510e](https://github.com/fartts/fartts/commit/9f7510e))
* **lib:** add support for importing json ([210dc1b](https://github.com/fartts/fartts/commit/210dc1b))

## [1.2.1](https://github.com/fartts/fartts/compare/v1.2.0...v1.2.1) (2018-07-25)


### Bug Fixes

* **release:** add npm and git releasers to the publish step ([d13bd38](https://github.com/fartts/fartts/commit/d13bd38))
* **release:** remove git releaser from publish step ([7794349](https://github.com/fartts/fartts/commit/7794349))

# [1.2.0](https://github.com/fartts/fartts/compare/v1.1.0...v1.2.0) (2018-07-23)


### Features

* **experiments/webgl:** adds initial setup for working with webgl ([bb70e21](https://github.com/fartts/fartts/commit/bb70e21))
* **experiments/webgl:** draw a purple-ish triangle ([af1baee](https://github.com/fartts/fartts/commit/af1baee))
* **experiments/webgl:** render a triangle ([f589d67](https://github.com/fartts/fartts/commit/f589d67))

# [1.1.0](https://github.com/fartts/fartts/compare/v1.0.0...v1.1.0) (2018-07-21)


### Bug Fixes

* **ci:** reverts a couple semantic-release related deps ([a8d71aa](https://github.com/fartts/fartts/commit/a8d71aa))
* **ci:** use a test command in after_success ([72e1712](https://github.com/fartts/fartts/commit/72e1712))
* **package:** rollback [@semantic-release](https://github.com/semantic-release)/git to 6.0.2 ([b074f00](https://github.com/fartts/fartts/commit/b074f00))


### Features

* **app:** messing with styles, gotta figure out a column grid thing ([8b9ccad](https://github.com/fartts/fartts/commit/8b9ccad))
* **app:** update styling of app/gallery page, stub out a second experiment, split up base styles ([86bd2cf](https://github.com/fartts/fartts/commit/86bd2cf))

# 1.0.0 (2018-07-16)


### Bug Fixes

* update the public url ([663c067](https://github.com/fartts/fartts/commit/663c067))


### Features

* adds a README to the app (for the gh-pages repo), adds it to the build ([0f56fda](https://github.com/fartts/fartts/commit/0f56fda))
* adds a test experiment ([c3397e5](https://github.com/fartts/fartts/commit/c3397e5))
* adds some styling for text on the main page ([ddbc9d1](https://github.com/fartts/fartts/commit/ddbc9d1))
