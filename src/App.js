import React, { Component } from 'react';
import { withGetScreen } from 'react-getscreen'
import { WebCamera } from './components/WebCam'
import { Route, HashRouter, Switch } from 'react-router-dom'
import LoginPage from './screens/login/LoginPage'
import BottomAppBar from './components/BottomAppBar'
import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyC3SQhI8wBGWlXpNMpsRYcPyDHA_Uv09BQ",
  authDomain: "shotwatcher-be30b.firebaseapp.com",
  databaseURL: "https://shotwatcher-be30b.firebaseio.com",
  projectId: "shotwatcher-be30b",
  storageBucket: "shotwatcher-be30b.appspot.com",
  messagingSenderId: "389183519129",
  appId: "1:389183519129:web:aefb9ed5ddf9501a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

console.log(firebase)
db.collection("users").add({
  first: "Ada",
  last: "Lovelace",
  born: 1815
})
  .then(function (docRef) {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch(function (error) {
    console.error("Error adding document: ", error);
  });

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/access" component={LoginPage} />
          <Route path="/" component={BottomAppBar} />
        </Switch>
      </HashRouter>
    );
  }
}
export default App;
