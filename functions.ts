import * as functions from 'firebase-functions';
const express = require('express');
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
admin.initializeApp(functions.config().firebase);
const app = express();
var serviceAccount = require("./handyman-1ab2f-firebase-adminsdk-e2djm-bdb488f5d2.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://handyman-1ab2f.firebaseio.com"
    });




// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.helloWorld = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.send({text:"Hello from Firebase!"});
    });
});


exports.newUser = functions.https.onRequest((request, response) =>{
    cors(request, response, ()=>{
        const data = request.body;
        console.log(data, 'data');
        response.setHeader('Access-Control-Allow-Origin', '*');
        const newUser =  admin.firestore().collection('userProfile').doc(data.user);
        newUser.set(data, {
        time: admin.firestore.Timestamp.now(),
        enabled: true
       });
       response.status(200).send('well done')
       
                       
    })
});

exports.updateUser = functions.https.onRequest((request, response) =>{
    cors(request, response, ()=>{
        const data = request.body;
        response.setHeader('Access-Control-Allow-Origin', '*');
        const newUser =  admin.firestore().collection('userProfile').doc(data.user);
        newUser.update(data, {
            time: admin.firestore.Timestamp.now(),
            enabled: true
           });
        response.send('user updated')
        


    })
});

