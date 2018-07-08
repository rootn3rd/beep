import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp(functions.config().firebase);

export const addUserMessages = functions.database
  .ref(`/messages/{messageId}`)
  .onWrite((event: any, context: any) => {
    // const messageKey = event.data.key;
    // const messageVal = event.data.val();
    const messageKey = context.params.messageId;
    const messageVal = event.after.val();

    admin
      .database()
      .ref(`/user-messages/${messageVal.userFromId}/${messageVal.userToId}`)
      .child(messageKey)
      .set(1)
      .catch(() => 'obligatory catch');

    admin
      .database()
      .ref(`/user-messages/${messageVal.userToId}/${messageVal.userFromId}`)
      .child(messageKey)
      .set(1)
      .catch(() => 'obligatory catch');
  });

export const generateLastMessage = functions.database
  .ref(`/messages/{messageId}`)
  .onWrite((event: any, context: any) => {
    const messageKey = context.params.messageId;
    const messageVal = event.after.val();

    admin
      .database()
      .ref(`/last-messages/${messageVal.userFromId}/${messageVal.userToId}`)
      .child('key')
      .set(messageKey)
      .catch(() => 'obligatory catch');

    admin
      .database()
      .ref(`/last-messages/${messageVal.userToId}/${messageVal.userFromId}`)
      .child('key')
      .set(messageKey)
      .catch(() => 'obligatory catch');
  });
