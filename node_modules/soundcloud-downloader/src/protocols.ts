/**
 * Soundcloud streams tracks using these protocols.
 */
enum STREAMING_PROTOCOLS {
  HLS = 'hls',
  PROGRESSIVE = 'progressive'
}

/** @internal */
export const _PROTOCOLS = {
  HLS: STREAMING_PROTOCOLS.HLS,
  PROGRESSIVE: STREAMING_PROTOCOLS.PROGRESSIVE
}

export default STREAMING_PROTOCOLS
