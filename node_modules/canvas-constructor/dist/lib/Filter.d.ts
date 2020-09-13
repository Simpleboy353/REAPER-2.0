import type { Canvas } from './Canvas';
/**
 * Invert an image
 * @param canvas The Canvas instance
 */
export declare const invert: (canvas: Canvas) => Canvas;
/**
 * Greyscale an image
 * @param canvas The Canvas instance
 */
export declare const greyscale: (canvas: Canvas) => Canvas;
export declare const grayscale: (canvas: Canvas) => Canvas;
/**
 * Invert then greyscale an image
 * @param canvas The Canvas instance
 */
export declare const invertGrayscale: (canvas: Canvas) => Canvas;
export declare const invertGreyscale: (canvas: Canvas) => Canvas;
/**
 * Give an image a sepia tone
 * @param canvas The Canvas instance
 */
export declare const sepia: (canvas: Canvas) => Canvas;
/**
 * Turn an image into a silhouette
 * @param canvas The Canvas instance
 */
export declare const silhouette: (canvas: Canvas) => Canvas;
/**
 * Apply a threshold to the image
 * @param canvas The Canvas instance
 * @param threshold The threshold to apply in a range of 0 to 255
 */
export declare const threshold: (canvas: Canvas, threshold: number) => Canvas;
/**
 * Apply an inverted threshold to the image
 * @param canvas The Canvas instance
 * @param threshold The threshold to apply in a range of 0 to 255
 */
export declare const invertedThreshold: (canvas: Canvas, threshold: number) => Canvas;
/**
 * Brighten an image
 * @param canvas The Canvas instance
 * @param brightness The brightness to apply in a range of 0 to 255
 */
export declare const brightness: (canvas: Canvas, brightness: number) => Canvas;
/**
 * Darken an image
 * @param canvas The Canvas instance
 * @param darkness The darkness to apply in a range of 0 to 255
 */
export declare const darkness: (canvas: Canvas, darkness: number) => Canvas;
export declare const myOldFriend: (canvas: Canvas, darkness: number) => Canvas;
/**
 * Convolute a image. This filter needs a fix.
 * @param canvas The Canvas instance
 * @param weights The weights
 * @param opaque Whether or not pixels should try to be opaque
 * @see https://www.html5rocks.com/en/tutorials/canvas/imagefilters/
 */
export declare const convolute: (canvas: Canvas, weights: readonly number[], opaque?: boolean) => Canvas;
/**
 * Display an image's edges
 * @param canvas The Canvas instance
 */
export declare const edge: (canvas: Canvas) => Canvas;
/**
 * Sharpen an image
 * @param canvas The Canvas instance
 * @param passes The amount of iterations to do
 */
export declare const sharpen: (canvas: Canvas, passes?: number) => Canvas;
/**
 * Blur an image
 * @param canvas The Canvas instance
 * @param passes The amount of iterations to do
 */
export declare const blur: (canvas: Canvas, passes?: number) => Canvas;
//# sourceMappingURL=Filter.d.ts.map