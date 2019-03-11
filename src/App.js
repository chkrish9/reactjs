import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/common/Navbar";
import Home from "./components/Home";
import ContactUs from "./components/ContactUs";
import Login from "./components/Login";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route path="/" component={ContactUs} exact />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Route component={ContactUs} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
