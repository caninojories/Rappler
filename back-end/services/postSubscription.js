(function() {
  'use strict';

  exports.send = function(node, postId, res) {
    var model = {
      postUrl :'https://localhost:3000/',
      title: 'Rappler',
      subTitle: 'Post Subscription',
      body: ''
    };

    var transporter = node.nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'caninojories@gmail.com',
          pass: 'Ver0nicavilla_'
        }
    });

    var postListBol = false;

    node.mongoDB(node, node.config.dbName)
      .then(function() {
        node.PostSubscription
          .find()
          .exec(callback);

          function callback(error, postSubscription) {
            console.log('inside');
            node.Post
              .findById(node.ObjectId(postId), documents);

              function documents( handleError , post ) {
                if( handleError ) {return handleError;}
                console.log(post);
                transport(transporter, postSubscription, post);
              }
          }
      });


    node._.templateSettings = {
      interpolate: /\{\{(.+?)\}\}/g
    };

    function transport(transporterObject, postSubscription, post) {
      for(var i=0; i<postSubscription.length; i++) {
        console.log(postSubscription[i].email);
        var mailOptions = {
          from: 'caninojories@gmail.com',
          to: postSubscription[i].email,
          subject: 'Post Rapple Subscription',
          html: getHtml(post)
        };
        if(postSubscription.length === (i+1)) {
          postListBol = true;
        }
        sendMail(transporterObject, mailOptions, postListBol);
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
        if(postBol) {
          res.json('success');
        }
      });
    }

    function getHtml(post) {
      var path =  node.path.normalize(__dirname + '/../../') + 'back-end/views/postSubscription.html';
      var html = node.fs.readFileSync(path, {'encoding':'utf8'});

      var template = node._.template(html);
      model.body += post.content;
      model.postUrl += post._id;
      return template(model);
    }
  };
}());
