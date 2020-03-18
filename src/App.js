import React, { useState } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import InputText from "./InputText";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={InputText} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
