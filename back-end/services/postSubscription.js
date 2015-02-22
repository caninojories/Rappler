(function() {
  'use strict';

  var model = {
    postUrl :'https://localhost:3000/',
    title: 'Rappler',
    subTitle: 'Thanks for signing up',
    body: 'Please verify your email address by clicking the button below'
  };

  exports.send = function(node, postId) {

    var transporter = node.nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'caninojories@hotmail.com',
        password: 'Ver0nicaVilla_'
      }
    });
    var email = '';/*Get all the email in the subscription Schema*/
    node.mongoDB(node, node.config.dbName)
      .then(function() {
        node.Comment
          .find()
          .exec(callback);

          function callback(error, postSubscription) {
            console.log(postSubscription);
          }
      });
    var mailOptions = {
      from: 'caninojories@hotmail.com',
      to: email,
      subject: 'Account Verification',
      html: getHtml(postId)
    };

    transporter.sendMail(mailOptions, function(err, info) {
      if(err) {return err;}
      console.log('email sent ' + info.response);
    });

    node._.templateSettings = {
      interpolate: /\{\{(.+?)\}\}/g
    };

    function getHtml(postId) {
      var path =  node.path.normalize(__dirname + '/../../') + 'back-end/views/postSubscription.html';
      var html = node.fs.readFileSync(path, {'encoding':'utf8'});

      var template = node._.template(html);
      model.postUrl += postId;
      return template(model);
    }
  };
}());
