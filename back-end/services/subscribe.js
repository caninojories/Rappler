(function() {
  'use strict';

  exports.send = function(node, email, res) {
    var model = {
      postUrl :'http://localhost:3000/',
      title: 'Rappler',
      subTitle: 'Post Subscription',
      body: 'body'
    };

    var transporter = node.nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'caninojories@gmail.com',
          pass: 'Ver0nicavilla_'
        }
    });


    transport(transporter);

    node._.templateSettings = {
      interpolate: /\{\{(.+?)\}\}/g
    };

    function transport(transporterObject, postSubscription) {
      for(var i = 0; i < 1; i++) {
        console.log(postSubscription[i].email);
        var mailOptions = {
          from: 'caninojories@gmail.com',
          to: email,
          subject: 'Post Rapple Subscription',
          html: getHtml()
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

    function sendMail(transporterObject, mailOptions, postBol) {
      transporterObject.sendMail(mailOptions, function(err, info) {
        if(err) {return err;}
        console.log('email sent ' + info.response);
        res.json('success');
      });
    }

    function getHtml(post) {
      var path =  node.path.normalize(__dirname + '/../../') + 'back-end/views/postSubscription.html';
      var html = node.fs.readFileSync(path, {'encoding':'utf8'});

      var template = node._.template(html);
      return template(model);
    }
  };
}());
