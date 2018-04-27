// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const message = require('./message.js');

exports.helloWorld = functions.https.onRequest((request, response) => {
  admin
    .database()
    .ref('/text')
    .set('Michael is the worst');
  response.send(message.getMessage());
});
