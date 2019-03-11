import React, { Component } from "react";

export default class Home extends Component {
  state = {
    contacts: []
  };
  constructor(props) {
    super(props);
    this.populateData = this.populateData.bind(this);
  }
  componentDidMount() {
    fetch("https://netdev.umkc.edu/intapps/murali/api/Contacts/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.token
      }
    })
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        this.setState({ contacts: data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  populateData() {
    this.state.contacts.map((listValue, index) => {
      return (
        <tr>
          <td>{index + 1}</td>
          <td>{listValue.FirstName}</td>
          <td>{listValue.LastName}</td>
          <td>{listValue.Email}</td>
          <td>{listValue.Comment}</td>
        </tr>
      );
    });
  }
  render() {
    return (
      <div>
        <h3>Contact Us List</h3>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>{this.populateData()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
