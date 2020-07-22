var chars = require('./lib/chars')

Object.keys(chars).forEach(function (key) {
  var value = chars[key]
  if(!chars[value]) {
    chars[value] = key
  }
})

module.exports = function (str) {
  var result = ''
    , c = str.length
    , ch = ''
  for (; c >= 0; --c) {
    ch = str.charAt(c)
    result += chars[ch] || chars[ch.toLowerCase()] || ch
  }
  return result
}
