/* eslint-disable camelcase */
import axios, { AxiosInstance } from 'axios'
import { handleRequestErrs } from './util'

import STREAMING_PROTOCOLS from './protocols'
import FORMATS from './formats'

/**
 * A Soundcloud user
 */
export interface User {
  avatar_url: string,
  city: string,
  comments_count: number,
  country_code: string,
  created_at: string,
  description: string,
  followers_count: number,
  followings_count: number,
  first_name: string,
  full_name: string,
  groups_count: number,
  id: number,
  last_name: string,
  permalink_url: string,
  uri: string,
  username: string
}

/**
 * Details about the track
 */
export interface TrackInfo {
  kind: string
  monetization_model: string,
  id: number,
  policy: string,
  comment_count?: number,
  full_duration?: number,
  downloadable?: false,
  created_at?: string,
  description?: string,
  media?: { transcodings: Transcoding[] },
  title?: string,
  publisher_metadata?: any,
  duration?: number,
  has_downloads_left?: boolean,
  artwork_url?: string,
  public?: boolean,
  streamable?: true,
  tag_list?: string,
  genre?: string,
  reposts_count?: number,
  label_name?: string,
  state?: string,
  last_modified?: string,
  commentable?: boolean,
  uri?: string,
  download_count?: number,
  likes_count?: number,
  display_date?: string,
  user_id?: number,
  waveform_url?: string,
  permalink?: string,
  permalink_url?: string,
  user?: User,
  playback_count?: number
}

/**
 * Details about a Set
 */
export interface SetInfo {
  duration: number,
  permalink_url: string,
  reposts_count: number,
  genre: string,
  permalink: string,
  purchase_url?: string,
  description?: string,
  uri: string,
  label_name?: string,
  tag_list: string,
  set_type: string,
  public: boolean,
  track_count: number,
  user_id: number,
  last_modified: string,
  license: string,
  tracks: TrackInfo[],
  id: number,
  release_date?: string,
  display_date: string,
  sharing: string,
  secret_token?: string,
  created_at: string,
  likes_count: number,
  kind: string,
  purchase_title?: string,
  managed_by_feeds: boolean,
  artwork_url?: string,
  is_album: boolean,
  user: User,
  published_at: string,
  embeddable_by: string
}

/**
 * Represents an audio link to a Soundcloud Track
 */
export interface Transcoding {
  url: string,
  preset: string,
  snipped: boolean,
  format: { protocol: STREAMING_PROTOCOLS, mime_type: FORMATS }
}

/** @internal */
const getTrackInfoBase = async (trackID: number, clientID: string, axiosRef: AxiosInstance): Promise<TrackInfo> => {
  try {
    const { data } = await axiosRef.get(`https://api-v2.soundcloud.com/tracks/${trackID}?client_id=${clientID}`)

    return data as TrackInfo
  } catch (err) {
    throw handleRequestErrs(err)
  }
}

/** @internal */
export const getInfoBase = async <T extends TrackInfo | SetInfo>(url: string, clientID: string, axiosRef: AxiosInstance): Promise<T> => {
  try {
    const res = await axiosRef.get(`https://api-v2.soundcloud.com/resolve?url=${url}&client_id=${clientID}`, {
      withCredentials: true
    })

    return res.data as T
  } catch (err) {
    console.log(err)
    throw handleRequestErrs(err)
  }
}

/** @internal */
const getSetInfoBase = async (url: string, clientID: string, full: boolean, axiosRef: AxiosInstance): Promise<SetInfo> => {
  const setInfo = await getInfoBase<SetInfo>(url, clientID, axiosRef)
  if (!full) return setInfo

  const incompleteTracks = setInfo.tracks.filter(track => !track.title)
  const completeTracks = setInfo.tracks.filter(track => track.title)

  for (const track of incompleteTracks) {
    try {
      const info = await getTrackInfoBase(track.id, clientID, axiosRef)
      completeTracks.push(info)
    } catch (err) {
      console.log(err)
      completeTracks.push(track)
    }
  }

  setInfo.tracks = completeTracks
  return setInfo
}

/** @internal */
const getInfo = async (url: string, clientID: string): Promise<TrackInfo> => {
  const data = await getInfoBase<TrackInfo>(url, clientID, axios)
  if (!data.media) throw new Error('The given URL does not link to a Soundcloud track')
  return data
}

/** @internal */
export const getSetInfo = async (url: string, clientID: string, full = false): Promise<SetInfo> => {
  const data = await getSetInfoBase(url, clientID, full, axios)
  if (!data.tracks) throw new Error('The given URL does not link to a Soundcloud set')
  return data
}

/** @intenral */
export const getTrackInfoByID = async (id: number, clientID: string) => {
  return await getTrackInfoBase(id, clientID, axios)
}
export default getInfo
