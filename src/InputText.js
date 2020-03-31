import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
import "firebase/database";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import Logo from "./logo.png";
import Vita from "./vita.png";
import { useParams } from "react-router-dom";

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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      if (id) {
        query(id);
      }
    }
    fetchData();
  }, []);

  const handleChange = text => {
    setCode(text);
    if (text.length === 4) {
      setShow(true);
    } else {
      setShow(false);
    }
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
    if (code.length > 4 || code.length <= 3) {
      setError("Code should be 4 characters");
    } else {
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

          await firebase
            .auth()
            .signInWithEmailAndPassword("user@vitasim.dk", "Vitasim2020");

          const storage = firebase.storage();
          await storage
            .ref("/")
            .child(res.data.storageID + res.data.filetype)
            .getDownloadURL()
            .then(url => {
              setUrl(url);
              setTitle(res.data.name);
              setDescription(res.data.Description);
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
    }
  };

  return (
    <>
      {id ? (
        <div className="bg content">
          <div className="padding-black blacktitle">
            <ReactPlayer url={url} id="video" controls playing />
            <p>{title}</p>
            <p>Description: </p>
            <p>{description}</p>
          </div>
          <div className="logo-text">
            Powered By: <img src={Vita} width="100px" />
          </div>
        </div>
      ) : (
        <div className="inputwindow box has-background-primary  ">
          <div className="top ">
            <input
              className="input inputtext "
              type="text"
              placeholder="Code"
              onKeyPress={e => _handleKeyDown(e)}
              onChange={e => handleChange(e.target.value)}
            />
            <input
              className={
                show
                  ? "inputbtn button is-success"
                  : "inputbtn button is-danger"
              }
              type="button"
              value=">"
              onClick={async () => await query(code)}
            />
            <div className="text">
              <p data-tip="Enter 4 letter code and press Play">i</p>
              <ReactTooltip place="left" />
            </div>
          </div>
          <div className="has-background-primary content-top">
            {url && !error ? (
              <>
                <p className="titletext pad-top is-pulled-left">
                  Name: {title}
                </p>
                <ReactPlayer url={url} id="video" controls playing />
                <p className="titletext is-pulled-left">{description}</p>
              </>
            ) : (
              <>
                <img src={Logo} />
                <p className="titletext">{error}</p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
