var db        = require('promised-mongo')('rappler'),
      Promise = require('bluebird'),
      mongo   = require('../configuration/mongodb');
var promises = [];

  promises.push(
    db.collection('users').insert({
      email: 'michael.biscante@gmail.com',
      password: '$2a$10$rCgFfzfkuWTkJiOJOeqBmOuDmVX9x8jJUQxna03SYAzj/njRJARbK',
      displayName: 'mike',
      department: 'CICT',
      accessType: 'student',
    }));

    Promise.all(promises).then(function () {
      process.exit();
    });
