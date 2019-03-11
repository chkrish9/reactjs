import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.Logout = this.Logout.bind(this);
  }
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <Link to="/">
          <div className="navbar-brand" href="#">
            Contact Us
          </div>
        </Link>
        <NavIcon IsLoggedIn={this.IsLoggedIn()} />
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <HomeLinks
            IsLoggedIn={this.IsLoggedIn()}
            name={this.GetUserName()}
            logout={this.Logout}
          />
        </div>
      </nav>
    );
  }

  IsLoggedIn = () => {
    return localStorage.token !== undefined;
  };

  GetUserName = () => {
    return "Admin Admin";
  };

  Logout = () => {
    localStorage.clear();
    this.props.history.push("/");
  };
}

var NavIcon = props =>
  props.IsLoggedIn ? (
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
  ) : null;

var HomeLinks = props =>
  props.IsLoggedIn ? (
    <ul className="nav navbar-nav ml-auto">
      <li className="nav-item">
        <label className="nav-link">Hi, {props.name}</label>
      </li>
      <li className="nav-item">
        <Link to="/" className="nav-link" onClick={props.logout}>
          Logout
        </Link>
      </li>
    </ul>
  ) : null;
