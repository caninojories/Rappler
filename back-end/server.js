(function() {
  'use strict';

  global.app_require = function(name) {
    return require( __dirname + '/' + name );
  };

  var node      = app_require( 'services/module.config' ),
      main      = require( './routes/client/main' ),
      sample    = require( './routes/client/sample' ),

      registerUserApi = require('./routes/restAPI/API/registerNsignInApi'),
      userApi         = require('./routes/restAPI/API/userApi'),
      postApi         = require('./routes/restAPI/API/postApi'),
      moodApi         = require('./routes/restAPI/API/moodApi'),
      commentApi      = require('./routes/restAPI/API/commentApi'),
      contactUs       = require('./routes/restAPI/API/contactUs'),
      contact         = require('./routes/restAPI/API/contactApi'),
      aboutUs         = require('./routes/restAPI/API/aboutUsApi'),
      catchAll  = require( './routes' );

  /**
  ** Configuration File NoSQL Database
  ***/
  require( './configuration/mongodb' ); //mongodb integration

  /***
   ** Start our Express Server
   ***/
  var app = node.express();

  /***
   ** Require our Configuration Files
   ***/
  require( './configuration/express' )(app);
  require( './configuration/passport' )(node.passport);

  /***
   ** Routes
   ***/
  useApp([main,sample,registerUserApi,userApi,postApi, moodApi, commentApi, contactUs, aboutUs, contact]);
  //app.use( '/', registerUserApi );
  app.use( '/', catchAll );


  /***
   ** node.cluster Configuration
   ***/
  if (node.cluster.isMaster) {
    node.clusterService( node );
  } else {
    app.listen(app.get('port'), function() {
      console.log( node.chalk.red.reset.underline('listening to port ') +  node.chalk.cyan.bold((app.get('port'))));
    });
  }

  function useApp( param ) {
    param.forEach(function( name ) {
      app.use( '/', name );
    });
  }

}());
