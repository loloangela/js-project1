import React, { Component } from 'react';
import { ersContext } from '../axios/ers.context';
import { SideNavUserComp } from '../NavComponent/SideNavUsersComponent';

export class FindUserComponent extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      user_id: 0,
      user_info: {}
    }
  }

  userlookup = async (event) => {
    event.preventDefault();
    let x = '/users/' + this.state.user_id;
    try {
      const res = await ersContext.get(x);
      this.setState({
        user_info: res.data
      })
      console.log("The output from api: ", res.data)
    } catch (error) {

    }
  }

  componentDidMount() {
    localStorage.setItem("url", "/find-user");
  }

  storeUserID = (event) => {
    this.setState({
      user_id: event.target.value
    })
  }
  render() {
    return (
      <div>
        <div className="row">
          <SideNavUserComp />
        </div>
        <h2>Find User By ID</h2>
        <div className="row">
          <div className="col-8">
            <form className="col-8" onSubmit={this.userlookup}>
              <label className="user-lookup" id="lookupLabel" >Enter User ID Number:</label>
              <input type="number" id="userLookup" name="userIDInput" min="1" onChange={this.storeUserID} required></input>
              <button type="submit">Find</button>
            </form>
          </div>
        </div>
        <div>
          <br />
          <table className="table thead-dark table-hover user-table ">
            <thead>
              <tr>
                <th id="firstNameLabel">First Name</th>
                <th id="lastNameLabel">Last Name</th>
                <th id="usernameLabel">Username</th>
                <th id="emailLabel">Email</th>
                <th id="roleLabel">Role</th>
                <th id="userIDLabel">User ID</th>
              </tr>
            </thead>
            <tbody>
              {
                <tr key={this.state.user_id}>
                  <td>{this.state.user_info.first_name}</td>
                  <td>{this.state.user_info.last_name}</td>
                  <td>{this.state.user_info.username}</td>
                  <td>{this.state.user_info.email}</td>
                  <td>{this.state.user_info.role_id}</td>
                  <td>{this.state.user_info.user_id}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>


    );
  }
}