(function() {
  'use strict';

  exports.send = function(node, email, res) {
    var model = {
      loginUrl :'http://localhost:3000/',
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

    transport(transporter);

    function transport(transporterObject) {
      var mailOptions = {
        from: 'caninojories@gmail.com',
        to: email,
        subject: 'Rappler Subscription',
        html: getHtml()
      };

      sendMail(transporterObject, mailOptions);
    }

    function sendMail(transporterObject, mailOptions) {
      transporterObject.sendMail(mailOptions, function(err, info) {
        if(err) {return err;}
        console.log('email sent ' + info.response);
        res.json('success');
      });
    }

    function getHtml() {
      var path =  node.path.normalize(__dirname + '/../../') + 'back-end/views/subscribe.html';
      var html = node.fs.readFileSync(path, {'encoding':'utf8'});

      var template = node._.template(html);
      return template(model);
    }

    node._.templateSettings = {
      interpolate: /\{\{(.+?)\}\}/g
    };
  };
}());
