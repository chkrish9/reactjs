import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;

    switch (name) {
      case "username":
        this.setState({ username: value });
        break;
      case "password":
        this.setState({ password: value });
        break;
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    fetch("https://netdev.umkc.edu/intapps/murali/api/Login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          username: "",
          password: ""
        });
        localStorage.userName = data["FirstName"] + " " + data["LastName"];
        localStorage.loggedIn = true;
        localStorage.token = data["Token"];
        this.props.history.push("/home");
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="container">
        <div className="col-sm-4 offset-sm-4 mt-4">
          <h2 className="page-header text-center">
            <i className="fa fa-lock" aria-hidden="true" /> Login
          </h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                className="form-control"
                placeholder="Username"
                name="username"
                type="text"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                className="form-control"
                placeholder="Password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
            <div className="col-sm-6 offset-sm-3">
              <button type="submit" className="btn btn-success form-control">
                Login
              </button>
            </div>
          </form>
          <div className="col-sm-6 offset-sm-3 text-center mt-1">
            <Link to="/">
              <i className="fa fa-arrow-circle-left" aria-hidden="true" />{" "}
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
