// Karma configuration
// Generated on Thu Feb 18 2016 10:36:04 GMT-0800 (PST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      // load angular first
      'bower_components/angular/angular.js',
      // then load angular modules
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-resource/angular-resource.js',
      // then load other libraries
      'bower_components/d3/d3.js',
      // load app modules
      // NOTE: Modules must be explicitally called first!
      'public/app/app.module.js',
      'public/app/config/app.config.module.js',
    	'public/app/data_services/data-services.module.js',
    	'public/app/models/models.module.js',
      // load all other app scripts
      'public/app/**/*.js',
      // load specs
      'tests/app/**/*.spec.js',
    ],


    // list of files to exclude
    exclude: [
      'tests/jasmine_examples/*'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'public/app/**/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
    //'Chrome',
    //'Firefox',
    //'Safari', <!--- opens excessive windows!
    'PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
