FS-Nextra
------

[![npm](https://nodei.co/npm/fs-nextra.png?downloads=true&stars=true)](https://nodei.co/npm/fs-nextra/)

[![npm](https://img.shields.io/npm/v/fs-nextra.svg?maxAge=3600)](https://www.npmjs.com/package/fs-nextra)
[![npm](https://img.shields.io/npm/dt/fs-nextra.svg?maxAge=3600)](https://www.npmjs.com/package/fs-nextra)

[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/bdistin/fs-nextra.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/bdistin/fs-nextra/context:javascript)
[![Code Quality](https://github.com/bdistin/fs-nextra/workflows/Code%20Quality/badge.svg)](https://github.com/bdistin/fs-nextra/actions)
[![Unit Tests](https://github.com/bdistin/fs-nextra/workflows/Unit%20Tests/badge.svg)](https://github.com/bdistin/fs-nextra/actions)

[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=bdistin/fs-nextra)](https://dependabot.com)
[![david](https://david-dm.org/bdistin/fs-nextra.svg)](https://david-dm.org/bdistin/fs-nextra)
[![david](https://david-dm.org/bdistin/fs-nextra/dev-status.svg)](https://david-dm.org/bdistin/fs-nextra?type=dev)

Node.js V8 native fs.promises. Written in TypeScript, sans every sync method. *Async is the future!*

Docs
------

All `fs` methods which return a callback, return a promise instead. All `nextra` methods return a promise exclusively. No sync methods are included from either `fs` or `fs-nextra`. Requires minimum Node.js v10.1.0.

The full documentation can be found here: [fs-nextra.js.org](https://fs-nextra.js.org/).

Credit
------

`fs-nextra` is heavily based on `fs-extra`, this module wouldn't be possible without it's author:

- [JP Richardson](https://github.com/jprichardson)

License
-------

Licensed under MIT

Copyright (c) 2017-2019 [BDISTIN](https://github.com/bdistin)
