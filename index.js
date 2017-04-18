var fcm = require('./fcm');
var DeviceRegistrationToken = 'reg-token';
var topic1 = '/topics/main';

var express    = require('express');
var app        = express();

var message = {
 to: topic1,  // either DeviceRegistrationToken or topic1
 notification: {
     title: 'Test message',
     body: 'Hello Nodejs'
 },

};

var router = express.Router();
app.use('/', router);

// REGISTER OUR MIDDLEWARES -------------------------------
app.use(function(req, res, next) {
    res.status(404).send('Not Found');
    next(); // make sure we go to the next routes and don't stop here
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});


// START THE SERVER
// =============================================================================
app.listen(8080);
console.log('Magic happens in 8080');

router.route('/push')
.get(function(req, res, next) {

  /*fcm.send(message, function(err, response){
    if (err) {
        console.log(err);
    } else {
      console.log("Successfully sent with response: ", response);
    }
  });*/

  fcm.FCMNotificationBuilder()
    .setTopic('main')
    .addData('Test message')
    .send(function(err, res) {
     if (err)
       console.log('FCM error:', err);

       console.log('res', res);
    });

  res.send("notification sent");

});
