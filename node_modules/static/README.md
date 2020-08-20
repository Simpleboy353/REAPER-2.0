Static
======

Markdown and Handlebars static site generator. Transforms files with `.hbs` and `.md` with Handlebars and Markdown respectively.

    npm install static

## Command line interface

    static source.hbs.html target.html

## JavaScript interface

    var static = require('./static');
    static.transform('source.hbs.html', function(buffer) {
      fs.writeFile('target.html', buffer.toString());
    });

## Grunt Interface

In your `Gruntfile.js`:

    grunt.loadNpmTasks('static');

Then in your config, define "static" as a multi task:

    grunt.initConfig({
      static: {
        mySite: {
          // this file will be included before the
          // build is run
          require: ['helpers.js'],
          build: {
            // will treat source as a handlebars
            // template and save at target
            'target.html': 'source.hbs.html',
            // process multiple files into a single file
            'api.html': [
              'header.hbs.html',
              'README.md',
              'footer.html'
            ],
            // specify a specific context for the
            // handlebars template to be run with
            'target2.html': {
              file: 'source.hbs.html',
              context: {
                key: 'value'
              }
            }
          }
        }
      }
    });

In this case, one could invoke: `grunt static:mySite` to run the build.

`require` accepts an array of files to require before static runs, each file must export a function that will recieve a `static` object:

    module.exports = function(static) {

    };

`build` accepts a hash of target file: source file pairs to process. If an array of source files is specified each one will be processed individually and concatenated. If compiling with handlebars an object may be passed that should be in this format:

    {
      file: 'source.hbs.html',
      context: {
        key: 'value'
      }
    }

In `source.hbs.html` `{{key}}` would be available.

## Example

A handlebars file similar to this could be used to generate documentation from a README.md file:

    <ul class="toc">
      {{#include "README.md" select="h3"}}
        <li><a href="#{{id}}">{{innerHTML}}</a></li>
      {{/include}}
    </ul>
    <div class="body">
      {{include "README.md"}}
    </div>

## Handlebars API

### include *{{include filename [select=selector]}}*

Include a file. If `select` is specified a block must be passed. The block will be called once for each selected node (with the context set to the node) from the file and the resulting HTML will be embedded.

## JavaScript API

### transform *static.transform(source, callback)*

Transforms a given file with Handlebars and Markdown if file extensions are present. Calls callback with a buffer containing the transformed file.

### handlebars *static.handlebars*

A reference to the handlebars object static is using. Useful to register new helpers on.

### registerAsyncHelper *static.handlebars.registerAsyncHelper(name, callback)*

Just like `Handlebars.registerHelper` but async. `callback` recieves arguments to the helper (if any) followed by an options object, followed by a callback. Call the callback with your generated output instad of returning.

    static.handlebars.registerAsyncHelper('toc', function(options, callback) {
      static.transform('README.md', function(html) {
        static.$(html, function($) {
          var output = '<ul>';
          $('h3', function() {
            output += '<li>' + this.innerHTML + '</li>'
          });
          callback(output + '</ul>');
        });
      });
    });

### $ *static.$(html, callback)* 

Create a DOM window and jQuery object from the specified HTML. `callback` recieves a `$` cherrio instance. The `select` argument to `include` is implemented with this.


    static.$(html, function($) {
      $('a').each(...);
    });

### modifyDocumentFragment *static.modifyDocumentFragment(html, callback, next)*

Similar to `$`, calls `callback` with a `$` cherrio instance. `$` can be modified within the callback. `next` will be called with the resulting HTML.

    static.modifyDocumentFragment('<ul></ul>', function($) {
      $('ul').append('<li></li>');
    }, function(html) {
      // html === '<ul><li></li></ul>'
    });

### onMarkdown *static.onMarkdown(callback)*

Called anytime after `transform` transforms a markdown document. `callback` is called with the generated HTML and a `next` function that must be called with the modified HTML. Pairs well with `modifyDocumentFragment`.

    static.onMarkdown(function(html, next) {
      next(html);
    });

### addTransform *static.addTransform(fileExtension, callback)*

Transform files passed to *transform* based on file extension. `callback` recieves:
- `buffer` - the file buffer
- `callback` - to be called with the transformed buffer
- `context` - context if transform was invoked from a handlebars helper
- `data` - private handlebars data, also contains `file` which is a reference to the current file

The `html` extension is a noop and is implemented as:

    static.addTransform('html', function(buffer, next, context, data) {
      next(buffer);
    });

### config *static.config*

Defaults to:
  
  {
    addIdsToHeadings: true, //in markdown add ids to h[1-6] tags
    gfm: true, //github flavored markdown
    highlight: function(code, lang) {
      return require('highlight.js').highlight(lang || 'javascript', code).value;
    }
  }
