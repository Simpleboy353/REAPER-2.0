/** @internal @packageDocumentation */

import axios from 'axios'
import m3u8stream from 'm3u8stream'
import { handleRequestErrs } from './util'

const fromURL = async (url: string, clientID: string): Promise<any | m3u8stream.Stream> => {
  try {
    const link = `${url}?client_id=${clientID}`
    const res = await axios.get(link, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36',
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br'
      },
      withCredentials: true
    })
    if (!res.data.url) throw new Error(`Invalid response from Soundcloud. Check if the URL provided is correct: ${link}`)

    if (url.includes('/progressive')) {
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

export default fromURL
