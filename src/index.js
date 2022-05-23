import ReactDOM from 'react-dom/client'
import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter } from "react-router-dom";

import firebase from 'firebase/compat/app';
import 'firebase/compat/database'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from 'react-redux-firebase'

import App from './App'
import { firebaseConfig } from './config/firebase-config'

firebase.initializeApp(firebaseConfig)
firebase.database()

const rrfConfig = {
  userProfile: 'users',
}

export const store = configureStore({
  reducer: firebaseReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
      
    </ReactReduxFirebaseProvider>
  </Provider>
)
