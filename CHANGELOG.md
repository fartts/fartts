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
