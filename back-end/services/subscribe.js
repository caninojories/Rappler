(function() {
  'use strict';

  exports.send = function(node, email, res) {
    var model = {
      postUrl :'http://localhost:3000/',
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

    var mailOptions = {
      from: 'caninojories@gmail.com',
      to: email,
      subject: 'Rappler Subscription',
      html: getHtml(email)
    };

    transporter.sendMail(mailOptions, function(err, info) {
      if(err) {return err;}
      console.log('email sent ' + info.response);
        res.json('success');
    });


    node._.templateSettings = {
      interpolate: /\{\{(.+?)\}\}/g
    };

    function getHtml(post) {
      var path =  node.path.normalize(__dirname + '/../../') + 'back-end/views/postSubscription.html';
      var html = node.fs.readFileSync(path, {'encoding':'utf8'});

      var template = node._.template(html);
      return template(model);
    }
  };
}());
