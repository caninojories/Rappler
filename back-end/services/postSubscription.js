(function() {
  'use strict';

  exports.send = function(node, postId, res) {
    var model = {
      postUrl :'https://hauangelite.herokuapp.com/post/',
      title: 'HAU Online Social News Hub',
      subTitle: 'Post Subscription',
      body: ''
    };

    var transporter = node.nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'michael.biscante@gmail.com',
          pass: 'iamdynamic_12'
        }
    });

    var postListBol = false;

    node.mongoDB(node, node.config.dbName)
      .then(function() {
        node.PostSubscription
          .find()
          .exec(callback);

          function callback(error, postSubscription) {
            node.Post
              .findById(node.ObjectId(postId), documents);

              function documents( handleError , post ) {
                if( handleError ) {return handleError;}
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
          from: 'michael.biscante@gmail.com',
          to: postSubscription[i].email,
          subject: 'HAU Online Social News Hub',
          html: getHtml(post)
        };
        if(postSubscription.length === (i+1)) {
          postListBol = true;
        }
        sendMail(transporterObject, mailOptions, postListBol);
      }
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
      model.postUrl = 'https://hauangelite.herokuapp.com/post/';
      model.postUrl += post._id;
      return template(model);
    }
  };
}());
