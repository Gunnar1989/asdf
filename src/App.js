import React, { useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import InputText from "./InputText.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={InputText} />
          <Route path="/:id" children={<InputText />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
