(function() {
  'use strict';

  var model = {
    postUrl :'https://hau-rappler.herokuapp.com/api/post/unsubscribe?email=',
    title: 'Rappler',
    subTitle: 'Subscription',
    body: 'Thank you for Subscribing'
  };

  exports.send = function(node, email, res) {

    var transporter = node.nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'caninojories@gmail.com',
          pass: 'Ver0nicavilla_'
        }
    });
    //
    // node.mongoDB(node, node.config.dbName)
    //   .then(function() {
    //     node.PostSubscription
    //       .find()
    //       .exec(callback);
    //
    //       function callback(error, postSubscription) {
    //         console.log('inside');
    //         transport(transporter, postSubscription);
    //       }
    //   });

    transport();


    node._.templateSettings = {
      interpolate: /\{\{(.+?)\}\}/g
    };

    function transport() {
        var mailOptions = {
          from: 'caninojories@gmail.com',
          to: email,
          subject: 'Post Rapple Subscription',
          html: getHtml(email)
        };

        console.log(email);
        transporter.sendMail(mailOptions, function(err, info) {
          if(err) {return err;}
          console.log('email sent ' + info.response);
        });
      // for(var i=0; i<postSubscription.length; i++) {
      //   console.log(postSubscription[i].email);
      //   var mailOptions = {
      //     from: 'caninojories@gmail.com',
      //     to: postSubscription[i].email,
      //     subject: 'Post Rapple Subscription',
      //     html: getHtml(email)
      //   };
      //   sendMail(transporterObject, mailOptions);
      // }
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

    function sendMail(mailOptions) {
      transporter.sendMail(mailOptions, function(err, info) {
        if(err) {return err;}
        console.log('email sent ' + info.response);
      });
    }

    function getHtml(email) {
      var path =  node.path.normalize(__dirname + '/../../') + 'back-end/views/postSubscription.html';
      var html = node.fs.readFileSync(path, {'encoding':'utf8'});

      var template = node._.template(html);
      model.postUrl += email;
      return template(model);
    }
  };
}());
