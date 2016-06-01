/**
* @description Module and archives used by the server
* @author Adrián Sánchez <sesamaua@gmail.com>
*/


var express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    nodemailer = require('nodemailer');
 
var app = express();

 
app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
app.use(bodyParser());
app.use(express.static(__dirname+'/webpage'));

var generator = require('xoauth2').createXOAuth2Generator({
    user: 'adriansanchez.logn',
    clientId: '980433155755-adpdvti4k47c8elkor63181u34e71u0m.apps.googleusercontent.com',
    clientSecret: 'Wrx6qdcv2l4AqRj0X7eJUqRf',
    refreshToken: '1/kfGGuqSGP7q2TEKkPBHXHkN8H3Km9AjTF9Nqg-OiYUc',
    accessToken: 'ya29.swHEs_vuQz2ZWDxkVJI1gpTMOKiFTVquopDydk_SVLoUcUGeBFxpNGAgfeVhRPstOtmj' // optional
});

generator.on('token', function(token){
});

var transporter = nodemailer.createTransport(({
    service: 'gmail',
    auth: {
        xoauth2: generator
    }
}));

app.post('/email/', function (req, res) {
    var fecha = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    mailOptions = {
    to: 'sesamaua@gmail.com', // receiver
     subject: 'ImagineXYZ: Desde la pagina web - Fecha: ' + fecha, // subject
     text: 'Email: ' + req.body['email'] + '. \n'+ 'Name: ' + req.body['name'] + '. \n'+ 'Phone: ' + req.body['phone'] + '. \n'  + 'Message: ' + req.body['message'] // body
     };
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
      res.send(400);
    }else{
      console.log('Message sent: ' + info.response);
      res.send(200);
    }
  });
});

app.post('/susbscribe/', function (req, res) {
    var fecha = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    mailOptions = {
    to: 'sesamaua@gmail.com', // receiver
     subject: 'ImagineXYZ: Susbcripción a la pagina web - Fecha: ' + fecha, // subject
     text: 'Email: ' + req.body['email'] // body
     };
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
      res.send(400);
    }else{
      console.log('Message sent: ' + info.response);
      res.send(200);
    }
  });
});

app.get('*', function (req, res) {
    res.redirect('../#home', 404);
});

// Listening port
var port = Number(process.env.PORT || 9000);
app.listen(port);
console.log('Listening on port ' + port + '...');
