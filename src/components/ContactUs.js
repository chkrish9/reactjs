import React, { Component } from "react";
import "unfetch/polyfill";
import { Link } from "react-router-dom";

export default class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      comment: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;

    switch (name) {
      case "firstName":
        this.setState({ firstName: value });
        break;
      case "lastName":
        this.setState({ lastName: value });
        break;
      case "email":
        this.setState({ email: value });
        break;
      case "comment":
        this.setState({ comment: value });
        break;
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    fetch("https://netdev.umkc.edu/intapps/murali/api/Contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(r => {
      if (r.ok === true) {
        console.log("Success");
        this.setState({
          firstName: "",
          lastName: "",
          email: "",
          comment: ""
        });
      } else {
        console.log("Fail");
      }
    });
  }
  render() {
    return (
      <div className="container">
        <div className="col-sm-6 offset-sm-3 mt-4">
          <h3>Contact Us</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>First Name</label>
              <input
                className="form-control"
                placeholder="First Name"
                name="firstName"
                type="text"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                className="form-control"
                placeholder="Last Name"
                name="lastName"
                type="text"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                className="form-control"
                placeholder="Email"
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Comments</label>
              <textarea
                className="form-control"
                rows="3"
                name="comment"
                value={this.state.comment}
                onChange={this.handleChange}
              />
            </div>
            <div className="col-sm-4 offset-sm-4">
              <button type="submit" className="btn btn-primary form-control">
                Submit
              </button>
            </div>
          </form>
          <div className="col-sm-4 offset-sm-4 text-center mt-1">
            <Link to="/login">
              <i className="fa fa-arrow-circle-right" aria-hidden="true" />{" "}
              Login to Admin
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
