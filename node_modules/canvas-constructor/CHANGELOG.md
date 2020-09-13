# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## 4.1.0
### Added
- Added `options.fit` in `Canvas#printCircularImage`.

## 4.0.0
### Added
- Added `hex` util to format hexadecimal strings into a valid color string.
- Added `rgb` util to format the parameters into a valid color string.
- Added `rgba` util to format the parameters into a valid color string.
- Added `hsl` util to format the parameters into a valid color string.
- Added `hsla` util to format the parameters into a valid color string.
- Added `color` util to provide type safety when picking colors.
- Added `Canvas#createEllipseClip`.
- Added better types for `Canvas#process`.
- Added better types for `Canvas#toBuffer{Async}`.
- Added better types for `Canvas#toDataURL{Async}`.
- Added better types for `Canvas#toBlob{Async}`.
- Added ESM support.
- Added treeshaking support for web bundles.
- Added lots of documentation and examples.

### Changed
- Renamed `createRectClip` to `createRectangleClip`.
- Renamed `clearPixels` to `clearRectangle`.
- Renamed `addRect` to `printRectangle`.
- Renamed `addStrokeRect` to `printStrokeRectangle`.
- Renamed `addCircle` to `printCircle`.
- Renamed `addText` to `printText`.
- Renamed `addStrokeText` to `printStrokeText`.
- Renamed `addWrappedText` to `printWrappedText`.
- Renamed `addResponsiveText` to `printResponsiveText`.
- Renamed `addBeveledRect` to `printRoundedRectangle`.
- Renamed `addCircularImage` to `printCircularImage`.
- Renamed `addBeveledImage` to `printRoundedImage`.
- Renamed `addPattern` to `printPattern`.
- Renamed `createRoundPath` to `createCircularPath`.
- Renamed `createRoundClip` to `createCircularClip`.
- Renamed `createRectPath` to `createRectanglePath`.
- Renamed `createRectClip` to `createRectangleClip`.
- Renamed `createBeveledPath` to `createRoundedPath`.
- Renamed `createBeveledClip` to `createRoundedClip`.
- Renamed `addLinearColorGradient` to `printLinearColorGradient`.
- Renamed `addLinearStrokeGradient` to `printLinearStrokeGradient`.
- Renamed `addRadialColorGradient` to `printRadialColorGradient`.
- Renamed `addRadialStrokeGradient` to `printRadialStrokeGradient`.
- Renamed `createEllipse` to `createEllipsePath`.
- Renamed `addImage` to `printImage`.
- Modified `addImage` to take `Image | Canvas` instead of `Buffer | Image`, you must use `loadImage`.
- Modified `addCircularImage` to take `Image | Canvas` instead of `Buffer | Image`, you must use `loadImage`.
- Modified `addBeveledImage` to take `Image | Canvas` instead of `Buffer | Image`, you must use `loadImage`.
- Modified `addPattern` to take `Image | Canvas` instead of `Buffer | Image`, you must use `loadImage`.
- Modified `createPattern` to take `Image | Canvas` instead of `Buffer | Image`, you must use `loadImage`.
- Modified `printPattern` to take `Image | Canvas` instead of `Buffer | Image`, you must use `loadImage`.
- Changed website, we are now using a typedoc generated one rather than the half-broken one.
- Changed bundler from webpack to rollup.
- Rewritten the library to strict TypeScript.

### Fixed
- Browser support is now fully operational.
- Fixed typing conflicts with `canvas`, since they added typings recently.
- Fixed interface callback types, the `this` parameter is now typed.

### Removed
- Removed options in `addImage`. Use `printCircularImage` or `printRoundedImage` instead.
- Removed `addRoundImage`. Use `printCircularImage` instead, beware that (x, y) is the centre and not top-left.
- Removed `registerFont` from `Canvas`, use the export from `canvas` instead.
- Removed support for `canvas-prebuilt`. `canvas` already comes with them.

## 3.0.3
### Fixed
- Resolved security vulnerability by upgrading to `handlebars@4.1.2`.

## 3.0.2
### Fixed
- `Canvas#resetShadows()` not clearing shadows.

## 3.0.1
### Fixed
- Publish not running the browser build, thus missing it sometimes or deploying old versions.

## 3.0.0
### Added
- Added `Canvas#wrapText()`.

### Changed
- Make `Canvas#addMultilineText()` not wrap lines.
- Renamed `Canvas.getCanvas()` to `Canvas.internalCanvas`.
- Renamed `Canvas.fromCanvas()` to `Canvas.from()`.
- Changed the word wrap algorithm to respect newlines while also being slightly faster.
- Changed callback return types in typings from `void` to `unknown` for strict rules to allow return.

## 2.1.1
### Fixed
- Webpack builds in unpkg.

## 2.1.0
### Added
- `Canvas#{toBlob,toBlobAsync}` for browser support.
- `Canvas.fromCanvas()` for browser support (this is a must in browsers as you can't construct `HTMLCanvasElement`).
- Examples for usage in web.

### Fixed
- Webpack builds.
- Guides being stale.

## 2.0.0
### Changed
- The `restore` argument now default to `true` instead of `false`, the previous default kept functionality from pre-releases and 1.x but I couldn't change it under a minor version, only with a major one. But now I decided it's enough, and made it default to the intuitive, and very often most-wanted choice: `true`.

### Fixed
- Fixed `addCircularImage()` adding the circular clip in the wrong center.
- Fixed text not rendering in `canvas@2.x`.
- Typings.

### Removed
- `addBevelImage` has been removed. As per the deprecation added over 2 months ago, it has been renamed to `addBeveledImage`.

## 1.1.2
### Fixed
- Fixed `addCircularImage()` adding the circular clip in the wrong center.

## 1.1.1
### Fixed
- Fixed `addCircularImage()` not adding a circular clip before adding the image.

## 1.1.0
### Added
- Added `toDataURL()` and `toDataURLAsync()`.
- Added `addCircularImage()`, similar to `addCircle()`.
- Added `setTextSize()`, similar to `setTextFont()` but changes the font size only (not the font itself).
- Added all overloads for `addImage()`.
- (Documentation) Added MDN link for `addImage()`.

### Changed
- `createBeveledPath()` now accepts an object type `BeveledRadiusOptions`.
- Renamed `addBevelImage()` to `addBeveledImage()` to prevent confusions (naming inconsistency). The old method is still available but it's deprecated and will be removed in the next major update.

## 1.0.0
### Added
- Support for canvas 1.6.x and 2.x.
- `addTextFont()` for canvas 1.6.x compatibility.

### Removed
- `METHODS.md` in favor of the new docs.

## 0.4.0
### Added
- `addMultilineText()` to print texts that are too long to be displayed.

## 0.3.1
### Added
- Both `printLinearGradient()` and `printRadialGradient()` to have chainable methods.
- Added a new parameter for both `createLinearGradient()` and `createRadialGradient()`, steps, which is typeof `GradientStep[]`.

### Changed
- Both `createLinearGradient()` and `createRadialGradient()` are not longer chainable, they'll return `CanvasGradient` instead.

## 0.3.0
### Added
- **Typings**. This package will also work in TypeScript.
- `createBeveledPath()` same usage as `createBeveledClip()`, but does not create clips (so you can use shadows and fill to colorize it).
- `createRoundPath()` same usage as `createRoundClip()`, but does not create clips (so you can use shadows and fill to colorize it).
- `clip()` (how come this was not implemented?).

### Changed
- **Canvas** has been moved from dependency to **peer dependency**.

## 0.2.0
### Changed
- `addResponsiveText()` changed the parser to be passive, faster, and more accurate.

### Removed
- Two private methods that were being used in `setTextFont()`.

## 0.1.7
### Added
- `changeCanvasSize()` to change the canvas' width/height.
- `changeCanvasWidth()` to change the canvas' width.
- `changeCanvasHeigth()` to change the canvas' height.

### Removed
- `registerTextFont()` as canvas-constructor relies on `canvas@1.6.6`, this method is useless.

## 0.1.6
### Added
- `setStrokeWidth()` to change stroke/line's width.
- `beginPath()` to start making paths.
- `closePath()` to start closing paths.
- `createLinearGradient()` to create linear gradients.
- `createRadialGradient()` to create radial gradients.
- `arc()` and `arcTo()`, to create arcs.
- `quadraticCurveTo()` to create quadratic Bèzier curves.
- `bezierCurveTo()` to create cubic Bèzier curves.
- `lineTo()` to connect lines.
- `moveTo()` to move the starting point of a path to any (x, y) coordinates.

### Changed
- Added default `'#000000'` for the `setStroke()` method.
- `addImage()` removed `this.save()` and `this.restore()` so users can use their own paths.

### Fixed
- Examples for `measureText()`.

## 0.1.5
### Added
- `save()` To save the current state onto a stack.
- `rotate()` To add a rotation to the transformation matrix.
- `scale()` To perform scaling transformations.
- `traslate()` To perform translating transformations.
- `fill()` To fill the current/given path.
- `stroke()` To stroke the current/given path.
- `addStrokeText()` To add stroked text.
- `measureText()` To measure in pixels a text. Be **careful**, if you do not provide a callback (second argument), this method will return an Integer value instead of being chainable.
- `setTextBaseline()` To set the text's baseline.
- `setShadowOffsetX()` To set the shadow offset for the axis X.
- `setShadowOffsetY()` To set the shadow offset for the axis Y.
- `setGlobalAlpha()` To set the global alpha value for the next elements.
- `clearCircle()` To clear the pixels with a circle shape.
- `clearPixels()` To clear the pixels with a rectangle shape. (Usage is
identical to `addRect()`).

### Changed
- **Breaking** | `fillRect()` -> `addRect()` | To keep consistency.
- `addText()` now accepts a third argument: `maxWidth`.
- `addImage()` now saves and restores the context.

### Fixed
- `addRoundImage()` now points to `addImage()` with the correct arguments.
- `addBevelImage()` now points to `addImage()` with the correct arguments.

## 0.1.4
### Changed
- Updated `README.md`.

## 0.1.3
### Fixed
- Fix a weird bug with the `in` operator in `addImage()`

## 0.1.0
### Added
- Added `addFont()` method for retro-compatibility with old versions of Canvas.
(Thanks to [York](https://github.com/YorkAARGH) in
[PR#1](https://github.com/kyranet/canvas-constructor/pull/1))

### Changed
- Better `README.md`.

### Fixed
- Bugs in the `options` argument for `addImage()`.
