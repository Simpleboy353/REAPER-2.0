/**
 * Audio formats a track can be encoded in.
 */
enum FORMATS {
  MP3 = 'audio/mpeg',
  OPUS = 'audio/ogg; codecs="opus"'
}

/** @internal */
export const _FORMATS = {
  MP3: FORMATS.MP3,
  OPUS: FORMATS.OPUS
}

export default FORMATS
