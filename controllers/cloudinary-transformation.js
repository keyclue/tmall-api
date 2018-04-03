
var mongo = require('mongodb');
var mongoose = require('mongoose');
var uristring = 'mongodb://admin:admin123@ds135926.mlab.com:35926/heroku_914rlv3g';

var cloudinary = require('cloudinary');
	cloudinary.config({ 
		cloud_name: 'keyclue', 
		api_key: '813634257799733', 
		api_secret: 'BBItTIJqOnpuepu4IMjTpjzHG1E' 
	});

cloudinary.v2.api.resources(function(error, result){console.log("hello!"+result)});
cloudinary.v2.api.resources(
    function(error, result) {
      console.log(result.rate_limit_allowed,
                  result.rate_limit_remaining,
                  result.rate_limit_reset_at)
    });

var image = cloudinary.image("samples/2881_shop1_300326_1_vxk3qg.jpg", {effect: "auto_contrast", gravity: "faces:auto", height: 800, width: 800, crop: "fill"})
console.log(image);
var filename = 'samples/2881_shop1_300326_1_vxk3qg.jpg'
var uri = 'http://res.cloudinary.com/keyclue/image/upload/c_fill,e_auto_contrast,g_faces:auto,h_800,w_800/'+filename;

var fs = require('fs');
var request = require('request');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

download(uri, 'cloudinary.jpg', function(){
  console.log('done');
});