import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
import "firebase/database";
import axios from "axios";

const firebaseConfig = {
  apiKey: "AIzaSyATj2GKyLdfDr44kzW0pRLzyNxkBLeTK6E",
  authDomain: "vitasim-platform-01.firebaseapp.com",
  databaseURL: "https://vitasim-platform-01.firebaseio.com",
  projectId: "vitasim-platform-01",
  storageBucket: "vitasim-platform-01.appspot.com",
  messagingSenderId: "471171188739",
  appId: "1:471171188739:web:a3024421c2b53fa4756636"
};
/*React.useEffect(() => {
  // Setup Firebase authentication state observer and get user data.
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
});*/
export const query = async code => {
  axios
    .post(`http://127.0.0.1:8000/query.php?accessID=${code}`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(async res => {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      const storage = firebase.storage();
      await storage
        .ref("/")
        .child(res.data.storageID + "." + res.data.filetype)
        .getDownloadURL()
        .then(url => {
          console.log(url);
          return url;
        })
        .catch(err => {
          console.log("Error finding user", err);
          return "temp";
        });
    });
};

export const downloadFile = async (ref, file) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const storage = firebase.storage();
  let res = "";
  await storage
    .ref(ref)
    .child(file)
    .getDownloadURL()
    .then(url => {
      res = url;
    })
    .catch(err => {
      console.log("Error finding user", err);
      return;
    });
  console.log(res);
  return res;
};
