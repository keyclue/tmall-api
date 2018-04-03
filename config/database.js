//http://theholmesoffice.com/mongoose-connection-best-practice/
//https://gist.github.com/pasupulaphani/9463004
var mongoose = require('mongoose');
var options = {
    db: { native_parser: true },
    server: { poolSize: 5 },
   // replset: { rs_name: 'myReplicaSetName' },
  // user: 'vits',
   // pass: 'VitS$#@!'
};

// mongoose.Promise = require('bluebird');

var uristring = 'mongodb://keyclue-admin:platfab12!@ds133856.mlab.com:33856/mexpress';
mongoose.connect(uristring, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
      }
    });
