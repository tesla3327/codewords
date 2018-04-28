import FirebaseApp from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDk_cdPFQ84EVKnYNZvTjoGSUaiyxrpjX8',
  authDomain: 'codewords-4ec79.firebaseapp.com',
  databaseURL: 'https://codewords-4ec79.firebaseio.com',
  projectId: 'codewords-4ec79',
  storageBucket: 'codewords-4ec79.appspot.com',
  messagingSenderId: '380474510016'
};

FirebaseApp.initializeApp(firebaseConfig);

export const database = FirebaseApp.database();
