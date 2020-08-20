/** @internal @packageDocumentation */
const regexp = /^https?:\/\/(soundcloud\.com)\/(.*)$/

const isURL = (url: string) => {
  if (!url.match(regexp)) return false
  return url.match(regexp) && (url.match(regexp) as RegExpMatchArray)[2]
}

export default isURL
