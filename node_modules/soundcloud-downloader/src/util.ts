/** @internal @packageDocumentation */

import { AxiosError } from 'axios'

export const handleRequestErrs = (err: AxiosError) => {
  if (!err.response) return err
  if (!err.response.status) return err

  if (err.response.status === 401) err.message += ', is your Client ID correct?'
  if (err.response.status === 404) err.message += ', could not find the song... it may be private - check the URL'
  return err
}
