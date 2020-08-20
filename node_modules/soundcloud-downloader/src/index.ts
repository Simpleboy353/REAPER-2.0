import sckey from 'soundcloud-key-fetch'

import getInfo, { getSetInfo, Transcoding, SetInfo, TrackInfo, getTrackInfoByID } from './info'
import filterMedia, { FilterPredicateObject } from './filter-media'
import { fromURL, fromMediaObj } from './download'

import isValidURL from './is-url'

import STREAMING_PROTOCOLS, { _PROTOCOLS } from './protocols'
import FORMATS, { _FORMATS } from './formats'

/** @internal */
const download = async (url: string, clientID: string) => {
  const info = await getInfo(url, clientID)

  return await fromMediaObj(info.media.transcodings[0], clientID)
}

/** @internal */
const downloadFormat = async (url: string, clientID: string, format: FORMATS) => {
  const info = await getInfo(url, clientID)
  const filtered = filterMedia(info.media.transcodings, { format: format })
  if (filtered.length === 0) throw new Error(`Could not find media with specified format: (${format})`)
  return await fromMediaObj(filtered[0], clientID)
}

export class SCDL {
  STREAMING_PROTOCOLS: { [key: string]: STREAMING_PROTOCOLS }
  FORMATS: { [key: string]: FORMATS }

  private _clientID?: string

  /**
   * Returns a media Transcoding that matches the given predicate object
   * @param media - The Transcodings to filter
   * @param predicateObj - The desired Transcoding object to match
   * @returns An array of Transcodings that match the predicate object
   */
  filterMedia (media: Transcoding[], predicateObj: FilterPredicateObject) {
    return filterMedia(media, predicateObj)
  }

  /**
   * Get the audio of a given track. It returns the first format found.
   *
   * @param url - The URL of the Soundcloud track
   * @param clientID - A Soundcloud Client ID, will find one if not provided
   * @returns A ReadableStream containing the audio data
  */
  async download (url: string, clientID?: string) {
    return download(url, await this._assignClientID(clientID))
  }

  /**
   *  Get the audio of a given track with the specified format
   * @param url - The URL of the Soundcloud track
   * @param format - The desired format
   * @param clientID - A Soundcloud Client ID, will find one if not provided
  */
  async downloadFormat (url: string, format: FORMATS, clientID?: string) {
    return downloadFormat(url, await this._assignClientID(clientID), format)
  }

  /**
   * Returns info about a given track.
   * @param url - URL of the Soundcloud track
   * @param clientID - A Soundcloud Client ID, will find one if not provided
   * @returns Info about the track
  */
  async getInfo (url: string, clientID?: string) {
    return getInfo(url, await this._assignClientID(clientID))
  }

  /**
   * Returns info about a given track.
   * @param id - The track ID
   * @param clientID - A Soundcloud Client ID, will find one if not provided
   * @returns Info about the track
   */
  async getTrackInfoByID (id: number, clientID?: string) {
    return await getTrackInfoByID(id, await this._assignClientID(clientID))
  }

  /**
   * Returns info about the given set
   * @param url - URL of the Soundcloud set
   * @param full - Defaults to false. Whether or not to retrieve all info for every track in the set. Note: This is done track by track and can be quite slow if there are a large amount of tracks in the set.
   * @param clientID - A Soundcloud Client ID, will find one if not provided
   * @returns Info about the set
   */
  async getSetInfo (url: string, full = false, clientID?: string) {
    return getSetInfo(url, await this._assignClientID(clientID), full)
  }

  /**
   * Returns whether or not the given URL is a valid Soundcloud URL
   * @param url - URL of the Soundcloud track
  */
  isValidUrl (url: string) {
    return isValidURL(url)
  }

  /** @internal */
  private async _assignClientID (clientID?: string): Promise<string> {
    if (!clientID) {
      if (!this._clientID) {
        this._clientID = await sckey.fetchKey()
      }

      return this._clientID
    }

    return clientID
  }
}
const scdl = new SCDL()

scdl.STREAMING_PROTOCOLS = _PROTOCOLS
scdl.FORMATS = _FORMATS

export default scdl
