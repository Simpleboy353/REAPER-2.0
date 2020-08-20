var handlebars = require('handlebars'),
  async = require('async'),
  cheerio = require('cheerio'),
  marked = require('marked'),
  path = require('path'),
  fs = require('fs'),
  _ = require('underscore'),
  highlight = require('highlight.js');

var config = {
  addIdsToHeadings: true,
  gfm: true, //github flavored markdown
  highlight: function(code, lang) {
    return highlight.highlight('javascript', code).value;
  }
};

var jqueryPath = './lib/jquery.js',
    asyncTolkens = {},
    markdownCallbacks = [];

var transforms = {};

function addTransform(name, callback) {
  transforms[name] = callback;
}

addTransform('html', function(buffer, complete, context, data) {
  return complete(buffer.toString());
});

addTransform('md', function(buffer, complete, context, data) {
  var html = marked(buffer.toString(), {
    gfm: config.gfm,
    highlight: config.highlight
  });
  async.series(_.map(markdownCallbacks, function(callback) {
    return function(next) {
      callback(html, function(modifiedHTML) {
        html = modifiedHTML;
        next();
      });
    }
  }), function() {
    complete(html);
  });    
});

addTransform('hbs', function(buffer, complete, context, data) {
  var output = handlebars.compile(buffer.toString(), {
    data: true
  })(context, {
    data: data
  });
  var filteredAsyncTolkens = {};
  _.each(asyncTolkens, function(tolkenData, tolken) {
    if (data.file === tolkenData.file) {
      filteredAsyncTolkens[tolken] = tolkenData;
    }
  });
  if (!_.keys(filteredAsyncTolkens).length) {
    complete(output);
  } else {
    async.series(_.map(filteredAsyncTolkens, function(tolkenData, tolken) {
      return function(next) {
        var args = tolkenData.args;
        args.push(function(callbackOutput) {
          output = output.replace(tolken, callbackOutput.toString());
          next();
        });
        tolkenData.callback.apply(tolkenData.callback, args);
      };
    }), function() {
      complete(output);
    });
  }
});

function $(html, callback) {
  callback(cheerio.load(html));
}

function modifyDocumentFragment(html, callback, next) {
  $(html, function($) {
    callback($);
    next($.html());
  });
}

function removeOuterBodyTag(html) {
  return html.replace(/^\s*\<body\>/, '').replace(/\<\/body\>\s*$/, '');
}

handlebars.registerAsyncHelper = function(name, callback) {
  handlebars.registerHelper(name, function() {
    var tolken = String(new Date().getTime() + Math.random());
    var args = _.toArray(arguments),
        data = args[args.length - 1].data;
    asyncTolkens[tolken] = {
      file: data.file,
      args: args,
      callback: callback
    };
    return tolken;
  });
};

handlebars.registerHelper('require', function(file, options) {
  var filePath = path.join(path.dirname(options.data.file), file);
  require(filePath)(module.exports);
  return '';
});

handlebars.registerAsyncHelper('include', function(file, options, callback) {
  var filePath = path.join(path.dirname(options.data.file), file);
  transform(filePath, function(fileData) {
    var selector = options.hash.select;
    if (selector) {
      $(fileData.toString(), function($) {
        var generatedHTML = '';
        $(selector).each(function() {
          // make more like a regular dom object
          this.attributes = this[0].attribs;
          this.id = this[0].attribs.id;
          this.tagName = this[0].name;
          this.innerHTML = this.html();
          generatedHTML += options.fn(this);
        });
        callback(generatedHTML);
      });
    } else {
      callback(fileData.toString());
    }
  }, options.hash, options.data);
});

function transform(source, callback, options) {
  fs.readFile(source, function(err, data) {
    if (err) {
      console.trace();
      throw err;
    }
    var extensions = source.split('/').pop().split('.');
    var callbacks = _.filter(extensions, function(extension) {
      return extension in transforms;
    }).map(function(extension) {
      return function(next) {
        transforms[extension](data, next, options || {}, {
          file: source
        });
      };
    });
    async.series(callbacks, callback);
  });
}

function onMarkdown(callback) {
  markdownCallbacks.push(callback);
}

onMarkdown(function(html, next) {
  if (config.addIdsToHeadings) {
    modifyDocumentFragment(html, function($) {
      if (config.addIdsToHeadings) {
        addIdsToHeadings($);
      }
    }, next);
  } else {
    next(html);
  }
});

function addIdsToHeadings($) {
  $('h1,h2,h3,h4,h5,h6').each(function() {
    var text = $(this).html().split('<').shift();
    var id = text.replace(/(^\s+|\s+$)/g, '').replace(/[\s]+/g, '-').replace(/([a-z])([A-Z])/g, function() {
      return arguments[1] + '-' + arguments[2].toLowerCase();
    }).toLowerCase();
    if (id.match(/^\s+$/) || !id) {
      return;
    }
    $(this).attr('id', id);
  });
}

module.exports = {
  config: config,
  transform: transform,
  handlebars: handlebars,
  $: $,
  modifyDocumentFragment: modifyDocumentFragment,
  onMarkdown: onMarkdown,
  addTransform: addTransform
};