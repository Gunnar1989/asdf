import React, { useState } from "react";
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
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const handleChange = text => {
    setCode(text);
  };
  const _handleKeyDown = e => {
    if (e.key === "Enter") {
      query(code);
    } else {
      return;
    }
  };
  const query = async code => {
    axios
      .post(`https://www.vitasim.dk/helloworld/query.php?accessID=${code}`, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(async res => {
        if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
        }
        const storage = firebase.storage();
        await storage
          .ref("/")
          .child(res.data.storageID + res.data.filetype)
          .getDownloadURL()
          .then(url => {
            console.log(url);
            setUrl(url);
          })
          .catch(err => {
            console.log("Error finding user", err);
            setError(err);
          });
      });
  };

  return (
    <div className="boxcenter">
      <div className="inputwindow has-background-primary">
        <img src="https://www.vitasim.dk/wp-content/uploads/2019/11/Discord-logo@300x.png" />
        <input
          className="input inputtext"
          type="text"
          placeholder="Enter Code"
          onKeyPress={e => _handleKeyDown(e)}
          onChange={e => handleChange(e.target.value)}
        />
        <br />
        <div className="tooltip"></div>
        <input
          className="input inputbtn"
          type="button"
          value="Next"
          onClick={async () => await query(code)}
        />
      </div>
      {url && <ReactPlayer url={url} controls playing />}
      {error && (
        <div>
          <p>Sorry Video not found.</p>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
