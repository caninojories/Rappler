(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  module.exports = function( passport ) {
    passport.serializeUser(function( user, done ) {
      done( null, user._id );
    });

    // passport.deserializeUser(function(id, done) {
    //   node.mongoDB( node, node.config.dbName )
    //     .then(function(connection) {
    //       node.User.User.findById(id, function(err, user) {
    //         done(err, user);
    //       });
    //     });
    // });

    passport.use( 'local-login', new node.LocalStrategy({
      usernameField: 'email'
    }, function( email, password, done ) {
      node.mongoDB( node, node.config.dbName )
      .then(function( connection ) {
        node.User.findOne({
          email: email
        }, function( err, user ) {
          if( err ) return done(err);
          if( !user ) return done( null, false, {
            message: 'Wrong email/password'
          });

          user.comparePasswords( password, function( err, isMatch ) {
            if( err ) return done(err);
            if( !isMatch ) return done( null, false, {
              message: 'Wrong email/password'
            });
            console.log( user );
            return done( null, user);
          });
        });
      });
    }));

    passport.use( 'local-register', new node.LocalStrategy({
      usernameField: 'email',
      passReqToCallback: true
    }, function( req, email, password, done ) {
      node.mongoDB( node, node.config.dbName )
      .then(function( connection ) {
        var newUser = node.User({
          email: email,
          password: password,
          displayName: req.body.displayName,
          department: req.body.department
        });
        return newUser;
      })
      .then( function( user ) {
        user.save(function(err) {
          if( err ) return done( null, false );
          done( null, user );
        });
      });
    }));
  };
}());
