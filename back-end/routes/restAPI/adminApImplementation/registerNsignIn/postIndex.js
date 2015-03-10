(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.registerUser = function( req, res, next ) {
    var user = req.user;
    var token = node.jwt.encode( payload, 'shhh..');
    //node.createSendToken( node, req.user, res, register );
    var payload = {
      sub: user._id.toString(),
      exp: node.moment().add(10, 'days').unix()
    };

    node.verifyEmail.verify(node, token, user.email, res);
    return res.json({
      user: user.toJSON(),
      token: token
    });
  };

  exports.postUserLogin = function( req, res, next ) {
    node.passport.authenticate('local-login', function(err, user) {
      if( err ) next( err );

      req.login( user, function( err ) {
        if( err ) return next( err );
        node.createSendToken( node, user, res );
      });
    })(req, res, next );
  };

  exports.postGoogleLogin = function( req, res, next ) {
    var params = {
      client_id: req.body.clientId,
      redirect_uri: req.body.redirectUri,
      code: req.body.code,
      grant_type: 'authorization_code',
      client_secret: node.config.GOOGLE_SECRET,
    };

    node.googleAuth( node, params, res );
  };

  exports.postFacebookLogin = function( req, res, next ) {
    var params = {
      client_id: req.body.clientId,
      redirect_uri: req.body.redirectUri,
      client_secret: node.config.FACEBOOK_SECRET,
      code: req.body.code
    };

    node.facebookAuth( node, params, res );
  };

  /*mike*/
  exports.postUserRegistration = function( req, res, next ) {
    node.createSendToken( node, req.user, res );
  };
}());
