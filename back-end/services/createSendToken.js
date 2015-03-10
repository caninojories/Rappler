(function() {
  'use strict';

  module.exports = function createSendToken( node, user , res, register ) {
    var payload = {
      sub: user._id.toString(),
      exp: node.moment().add(10, 'days').unix()
    };

    var token = node.jwt.encode( payload, 'shhh..');
    node.verifyEmail.verify(node, token, user.email, res);
    return res.json({
      user: user.toJSON(),
      token: token
    });
  };
}());
