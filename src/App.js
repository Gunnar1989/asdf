import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import InputText from "./inputText";

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
