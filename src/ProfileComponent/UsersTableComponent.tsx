import React, { Component } from 'react';
import { ersContext } from '../axios/ers.context';

// eslint-disable-next-line
const data = [
  { user_id: 1, username: "lolo", password: "********", first_name: "Lori", last_name: "Oliver", role_id: "Finance Manager" },
  { user_id: 2, username: "flo", password: "********", first_name: "Flo", last_name: "Progessive", role_id: "Admin" },
  { user_id: 3, username: "avgjo", password: "********", first_name: "Joe", last_name: "Average", role_id: "Associate" }];

export class UsersTableComponent extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: [],
    }
  }

  async getAllUsers() {
    console.log('Made it to get all users');
    try {
      const res = await ersContext.get('/users');
      console.log(res.data);
      if (res.status === 200) {
        this.setState({
          allUsers: res.data
        });
      }
      return res.data
    } catch (err) {
      console.log(err);
    }
  }
  componentWillMount() {
    this.getAllUsers()
    this.setState({
      allUsers: this.props.users
    })
  }
  render() {
    return (
      <>
        <div><h2>All Users</h2></div>
        <div>
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
              {this.state.allUsers.map(
                function (user, index) {
                  return (
                    <tr key={index}>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.role_id}</td>
                      <td>{user.user_id}</td>
                    </tr>
                  )
                }
              )}
            </tbody>
          </table>;
        </div>
      </>
    );
  }
}