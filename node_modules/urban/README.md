# urban

The [Urban Dictionary](https://www.urbandictionary.com/) program and library for [node.js](https://nodejs.org/). The API is official, but undocumented.

### installation

    $ npm install -g urban # bin
    $ npm install urban # lib

### examples

#### bin
    $ urban facepalm
    $ urban -r // random mode

#### lib
    var urban = require('urban'),
        trollface = urban('trollface');

    trollface.first(function(json) {
        console.log(json);
    });
    
    
    // Random mode
    var urban = require('urban');
    
    urban.random().first(function(json) {
        console.log(json);
    });
    

### license

MIT
