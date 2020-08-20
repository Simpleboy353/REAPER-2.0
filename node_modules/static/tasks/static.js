module.exports = function(grunt) {
  var path = require('path'),
      fs = require('fs'),
      static = require('static'),
      async = require('async'),
      _ = require('underscore');

  grunt.registerMultiTask('static', "Process files with static", function() {
    var done = this.async();
    var config = this.data;
    if (config.require) {
      var deps = typeof config.require === 'string' ? [config.require] : config.require;
      _.each(deps, function(dep) {
        require(path.join(process.cwd(), dep))(static);
      });
    }
    async.series(_.map(config.build, function(source, target) {
      return function(complete) {
        var sources = typeof source === 'string' ? [source] : source,
            output = '';
        async.series(sources.map(function(source) {
          return function(next) {
            static.transform(typeof source === 'object' ? source.file : source, function(buffer) {
              output += buffer.toString();
              next();
            }, typeof source === 'object' ? source.context: undefined);
          }
        }), function() {
          console.log('grunt.static: wrote ' + target);
          grunt.file.write(target, output);
          complete();
        });
      }
    }), function() {
      done(true);
    });
  });
};