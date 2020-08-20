import { Transcoding } from './info'
import FORMATS from './formats'
import STREAMING_PROTOCOLS from './protocols'

export interface FilterPredicateObject {
  protocol?: STREAMING_PROTOCOLS,
  format?: FORMATS
}

/** @internal */
const filterMedia = (media: Transcoding[], predicateObj: FilterPredicateObject): Transcoding[] => {
  return media.filter(({ format }) => {
    let match = false
    if (predicateObj.protocol) match = format.protocol === predicateObj.protocol
    if (predicateObj.format) match = format.mime_type === predicateObj.format
    return match
  })
}

export default filterMedia
