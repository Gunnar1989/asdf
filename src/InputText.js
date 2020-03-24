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
    setUrl();
    console.log("hello");

    axios
      .post(`https://vitasim.dk/helloworld/query.php?accessID=${code}`, {
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
            setUrl(url);
            setError();
          })
          .catch(err => {
            console.log("Error: " + err);
            setError(err);
          });
      })
      .catch(err => {
        setError("Video Not Found");
        console.log("Error: " + err);
      });
  };

  return (
    <div className="inputwindow has-background-primary  ">
      <div className="top ">
        <input
          className="input inputtext "
          type="text"
          placeholder="Code"
          onKeyPress={e => _handleKeyDown(e)}
          onChange={e => handleChange(e.target.value)}
        />
        <input
          className="inputbtn button is-danger"
          type="button"
          value="Play"
          onClick={async () => await query(code)}
        />
      </div>
      <div className="has-background-primary content">
        {url && !error ? (
          <ReactPlayer url={url} id="video" controls playing />
        ) : (
          <img src="https://www.vitasim.dk/wp-content/uploads/2019/11/Discord-logo@300x.png" />
        )}
        {error != "" && (
          <div>
            <p className="titletext">Sorry Video not found.</p>
            <p></p>
          </div>
        )}
      </div>
    </div>
  );
}
