import React, { useState } from "react";
import * as AUTH from "./data/Use-Auth";
import ReactPlayer from "react-player";
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

export default function InputText() {
  const [code, setCode] = useState("");
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState("");
  const handleChange = text => {
    setCode(text);
  };
  const query = async code => {
    axios
      .post(`http://34.89.13.107/query.php?accessID=${code}`, {
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
            setUrl(url);
          })
          .catch(err => {
            console.log("Error finding user", err);
          });
      });
  };

  return (
    <div className="">
      {!url && (
        <div className="inputwindow box has-background-primary">
          <img src="https://www.vitasim.dk/wp-content/uploads/2019/11/Discord-logo@300x.png" />
          <input
            className="input inputtext"
            type="text"
            placeholder="Enter Code"
            onChange={e => handleChange(e.target.value)}
          />
          <br />
          <input
            className="input inputbtn"
            type="button"
            value="Next"
            onClick={async () => await query(code)}
          />
        </div>
      )}
      {url && <ReactPlayer url={url} controls playing />}
    </div>
  );
}
