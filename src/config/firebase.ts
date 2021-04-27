import firebase from 'firebase/app'
import 'firebase/storage'

import {
  FIREBASE_API_KEY,
  FIREBASE_DOMAIN,
  FIREBASE_PROJECT,
  FIREBASE_BUCKET,
  FIREBASE_SENDER,
  FIREBASE_ID,
} from '@env'

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_DOMAIN,
  projectId: FIREBASE_PROJECT,
  storageBucket: FIREBASE_BUCKET,
  messagingSenderId: FIREBASE_SENDER,
  appId: FIREBASE_ID,
}

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export { storage, firebase as default }
