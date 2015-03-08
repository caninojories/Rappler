(function() {
  'use strict';

  exports.verify = function(node, token, email, res) {
    var model = {
      verifyEmail :'https://hauangelite.herokuapp.com/user/verify/',
      title       : 'HAU Online Social News Hub',
      subTitle    : 'EMAIL VERIFICATION',
      body        : 'Please verify your email by clicking the button below'
    };

    var transporter = node.nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'michael.biscante@gmail.com',
          pass: 'iamdynamic_12'
        }
    });

    node._.templateSettings = {
      interpolate: /\{\{(.+?)\}\}/g
    };

    var mailOptions = {
      from: 'michael.biscante@gmail.com',
      to: email,
      subject: 'HAU Online Social News Hub',
      html: getHtml(token)
    };

    transporter.sendMail(mailOptions, function(err, info) {
      if(err) {return err;}
      console.log('email sent ' + info.response);
      res.json('success');
    });

    function getHtml(token) {
      var path =  node.path.normalize(__dirname + '/../../') + 'back-end/views/verifyEmail.html';
      var html = node.fs.readFileSync(path, {'encoding':'utf8'});

      var template = node._.template(html);
      model.body += '';
      model.verifyEmail += token;
      return template(model);
    }
  };
}());
