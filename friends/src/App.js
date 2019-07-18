import React from "react";

import "./App.css";
import { Route, Link, Redirect } from "react-router-dom";

import Login from "./Login";
import Profile from "./Profile";

function App() {
  return (
    <div className="App">
      <h1>Friends</h1>
      <div>
        <Link to="/">Login</Link>
        <Link to="/profile">Profile</Link>
      </div>
      <Route exact path="/" component={Login} />
      <Route exact path="/profile" component={Profile} />
    </div>
  );
}

export default App;
