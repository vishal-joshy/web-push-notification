const webpush = require('web-push');

const vapidKeys = webpush.generateVAPIDKeys();

const publicVapidKey = vapidKeys.publicKey;
const privateVapidKey = vapidKeys.privateKey;
console.log(publicVapidKey);
webpush.setVapidDetails('mailto:vishalvjjoshy@gmail.com', publicVapidKey, privateVapidKey);


//Express app

const express = require('express');

const app = express();

app.use(require('body-parser').json());

app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  res.status(201).json({});
  const payload = JSON.stringify({ title: 'test' });

  console.log(subscription);

  webpush.sendNotification(subscription, payload).catch(error => {
    console.error(error.stack);
  });
});

app.use(require('express-static')('./client'));

app.listen(3000);