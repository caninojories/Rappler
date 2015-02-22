(function() {
  'use strict';

  var model = {
    postUrl :'https://localhost:3000/',
    title: 'Rappler',
    subTitle: 'Post Subscription',
    body: 'content'
  };

  exports.send = function(node, postId, res) {

    var transporter = node.nodemailer.createTransport();
    //
    // node.smtpTransport({
    //     service: 'Mailgun',
    //     auth: {
    //       user: 'canino_jories@hotmail.com',
    //       pass: 'Ver0nicavilla'
    //     }
    //   })
    // );

    node.mongoDB(node, node.config.dbName)
      .then(function() {
        node.PostSubscription
          .find()
          .exec(callback);

          function callback(error, postSubscription) {
            console.log('inside');
            transport(transporter, postSubscription);
          }
      });


    node._.templateSettings = {
      interpolate: /\{\{(.+?)\}\}/g
    };

    function transport(transporterObject, postSubscription) {
      for(var i=0; i<postSubscription.length; i++) {
        console.log(postSubscription[i].email);
        var mailOptions = {
          from: 'canino_jories@hotmail.com',
          to: postSubscription[i].email,
          subject: 'Post Rapple Subscription',
          html: getHtml(postId)
        };
        sendMail(transporterObject, mailOptions);
      }
      // var mailOptions = {
      //   from: 'caninojories@hotmail.com',
      //   to: postSubscription[i].email,
      //   subject: 'Account Verification',
      //   html: getHtml(postId)
      // };
      // transporter.sendMail(mailOptions, function(err, info) {
      //   if(err) {return err;}
      //   console.log('email sent ' + info.response);
      //   //res.json('success');
      // });
    }

    function sendMail(transporterObject, mailOptions) {
      transporterObject.sendMail(mailOptions, function(err, info) {
        console.log('err: ' + err);
        if(err) {return err;}
        console.log('email sent ' + info.response);
        //res.json('success');
      });
    }

    function getHtml(postId) {
      var path =  node.path.normalize(__dirname + '/../../') + 'back-end/views/postSubscription.html';
      var html = node.fs.readFileSync(path, {'encoding':'utf8'});

      var template = node._.template(html);
      model.postUrl += postId;
      return template(model);
    }
  };
}());
