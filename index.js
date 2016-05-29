var express = require('express')
var request = require('request')
var bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.json())
var flag = false;
var token = "CAACrY5Wxe4QBAJHXMBG2tDGRndlz9ZB7ZAHVOPG7i1H9i4FcIr0M5nWhVqhFXPTm8Q32zSQKyRPU2PyXNFIHr0TbZC3KqkilYS5BUQJ9d5rUpqLfveWcLKVSaPIA08ZCeYM5GZBo28iEP3qedWp1rFKPjsGM7KZAZAqFvT3Exg6RRVGVFqo5mDBRkGB4dlOk3QZD";

function sendTextMessage(sender, text) {
  messageData = {
    text:text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}


app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/webhook/', function (req, res) {
  if (req.query['hub.verify_token'] === 'chaosknight') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
})

app.post('/webhook/', function (req, res) {
  messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;
    if(text.indexOf("max") > -1){
      var1 = text.substring(4,4);
      var2 = text.substring(6,6);
      sendTextMessage(sender,"found maxAS");
      }
      else
      sendTextMessage(sender, "Text received, echo: "+ text.substring(0, 200));
    }
  }
  res.sendStatus(200);
});


app.set('port', (process.env.PORT || 5000))

app.listen(app.get('port'), function () {
  console.log('Example aoo listening on port ' + app.get('port') + ' !')
})
