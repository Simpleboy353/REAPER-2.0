<h1 align="center">Welcome to lyrics-finder 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/lyrics-finder" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/lyrics-finder.svg">
  </a>
  <a href="https://github.com/alias-rahil/lyrics-finder/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> A lyrics api which actually works!

> It scrapes the lyrics from [Google](https://www.google.com/) so no seperate API key is needed.

# In your code:

## Installation

```bash
npm install --save lyrics-finder
```

## Usage

```javascript
const lyricsFinder = require('lyrics-finder');
(async function(artist, title) {
    let lyrics = await lyricsFinder(artist, title) || "Not Found!";
    console.log(lyrics);
})("poets of fall", "carnival of rust");
```

# Command line usage:

## Using without installation

```bash
npx lyrics-finder "a r rahman" "kun faya kun"
```

> Note: Use this method only if you plan to use lyrics-finder for one time, installing lyrics-finder globally (see-below) is recommended for multiple time usages.

## Installation

```bash
npm install lyrics-finder -g
```

> Note: **DO NOT** use sudo to install global packages! The correct way is to tell npm where to install its global packages: `npm config set prefix ~/.local`. Make sure `~/.local/bin` is added to `PATH`.

## Usage after installation

```bash
lyrics-finder "prateek kuhad" "cold mess"
```

# Screenshot

<p align="center">
  <img align="center" src="https://raw.githubusercontent.com/alias-rahil/lyrics-finder/master/screenshots/humpty-dumpty.jpeg" alt="humpty-dumpty.jpeg">
</p>

# API

It takes two arguments, artist name and song name and returns the lyrics as a string if found, else it will return an empty string (if used in code). The CLI binary logs the lyrics on your console (stdout) if found, else it will log 'Not Found!'.

# Author

👤 **Rahil Kabani <rahil.kabani.4@gmail.com>**

# Show your support

Give a ⭐️ if this project helped you!

# 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/alias-rahil/lyrics-finder/issues).

# Lyrics-Finder

🏠 [Homepage](https://github.com/alias-rahil/lyrics-finder#readme)

# License

[MIT](https://github.com/alias-rahil/lyrics-finder/blob/master/LICENSE)
