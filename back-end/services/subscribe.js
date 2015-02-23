(function() {
  'use strict';

  var model = {
    loginUrl :'http://localhost:3000',
    title: 'Rappler',
    subTitle: 'SUBSCRITPION',
    body: 'Thank you for Subscribing to HAU-RAPPLER'
  };

  exports.sendSubscription = function(node, email, res) {

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

    function transport(transporterObject) {
        var mailOptions = {
          from: 'caninojories@gmail.com',
          to: email,
          subject: 'HAU Online Social News Hub',
          html: getHtml(email)
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

    function getHtml(email) {
      var path =  node.path.normalize(__dirname + '/../../') + 'back-end/views/subscribe.html';
      var html = node.fs.readFileSync(path, {'encoding':'utf8'});

      var template = node._.template(html);
      model.loginUrl += '/';
      return template(model);
    }
  };
}());
