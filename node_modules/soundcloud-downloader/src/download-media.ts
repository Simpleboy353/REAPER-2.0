/** @internal @packageDocumentation */

import axios from 'axios'
import m3u8stream from 'm3u8stream'
import STREAMING_PROTOCOLS from './protocols'
import { handleRequestErrs } from './util'
import { Transcoding } from './info'

const fromMedia = async (media: Transcoding, clientID: string): Promise<any | m3u8stream.Stream> => {
  if (!validatemedia) throw new Error('Invalid media object provided')

  try {
    const link = `${media.url}?client_id=${clientID}`
    const res = await axios.get(link, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36',
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br'
      },
      withCredentials: true
    })
    if (!res.data.url) throw new Error(`Invalid response from Soundcloud. Check if the URL provided is correct: ${link}`)

    if (media.format.protocol === STREAMING_PROTOCOLS.PROGRESSIVE) {
      const r = await axios.get(res.data.url, {
        withCredentials: true,
        responseType: 'stream'
      })
      return r.data
    }
    return m3u8stream(res.data.url)
  } catch (err) {
    throw handleRequestErrs(err)
  }
}

const validatemedia = (media: Transcoding) => {
  if (!media.url || !media.format) return false
  return true
}

export default fromMedia
