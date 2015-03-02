(function() {
  'use strict';

  var node = app_require('services/module.config');
  var cloudinary = require('cloudinary');


  /***
   ** Express Configuration
   ***/
  module.exports = function(app) {
    node.nunjucksEnv.express(app);
    node.nunjucks.configure(node.nunjucksPath, {
      autoescape: true,
      express: app,
      watch: true,
      tags: {
        variableStart: '<$',
        variableEnd: '$>',
      }
    });
    app.set('x-powered-by', false);
    app.set('port', process.env.PORT || 3000);
    app.set('env', process.env.NODE_ENV || 'development');
    app.set('view engine', 'html');
    app.use(node.compression());
    app.use(node.favicon(node.faviconPath));
    app.use(node.logger('dev'));
    app.use(node.bodyParser.urlencoded({
      extended: true
    }));
    app.use(node.bodyParser.json());
    app.use(node.bodyParser.raw({
      type:'*/*'
    }));
    app.use(node.multer({ dest: node.uploads,
      rename: function (fieldname, filename) {
        return filename+Date.now();
      },
      onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...');
      },
      onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path);
      //done=true;
      }
    }));
    cloudinary.config(node.config.cloudinary);
    app.use(node.methodOverride(function(req, res) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
      }
    }));
    app.use(node.passport.initialize());

    app.use('/css', node.express.static(node.css));
    app.use('/fonts', node.express.static(node.fonts));
    app.use('/img', node.express.static(node.img));
    app.use('/js', node.express.static(node.js));
    app.use('/bowerComponents', node.express.static(node.bowerComponents));
    app.use('/commonViews', node.express.static(node.commonViews));
    app.use('/compiledCss', node.express.static(node.compiledCss));
    app.use('/uploads', node.express.static(node.uploads));

    /**********************
      Environment SetUP
     ***********************/
    if (process.env.NODE_ENV === 'production') {
      app.set('json spaces', 0);
    } else {
      app.set('json spaces', 2);
    }

    /*****************************
     **Setup for CORS
     *****************************/
    app.use(function(req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
      next();
    });

  };
}());
