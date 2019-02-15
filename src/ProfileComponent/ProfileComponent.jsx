import React, { Component } from 'react';
import { ersContext } from '../axios/ers.context';
import { SideNavUserComp } from '../NavComponent/SideNavUsersComponent';
import { EditUserComponent } from './EditUserComponent';

/*
 * Profile component will determine what user-page to display based off of perms
 */

export class ProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: [],
      editUserId: null
    }
  }
  saveStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }
  async getAllUsers() {
    console.log('Made it to get all users');
    let empty = [];
    try {
      const res = await ersContext.get('/users');
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
    return empty;
  }


  sideNav() {
    if (localStorage.getItem("role") !== "Associate") {
      return <SideNavUserComp />;
    }
    return null;
  }
  async componentWillMount() {

    let temp = await this.getAllUsers();
    console.log('table constructed', temp);
    this.setState(
      { allUsers: temp }
    );
    console.log("Will Mount: ", this.state.allUsers)

  }
  async componentDidMount() {
    localStorage.setItem("url", "/users");
    let temp = await this.getAllUsers();
    console.log('Store AllUsers', temp);
    this.setState(
      { allUsers: temp }
    );
    console.log("Did Mount: ", this.state.allUsers)

  }

  adminColHeader() {
    if (localStorage.getItem("role") === "Admin") {
      return <th id="editUserLabel">Edit User</th>
    }
    else {
      return null;
    }
  }

  adminEditButton = (id) => {
    if (localStorage.getItem("role") === "Admin") {
      console.log(id);
      return <button className="btn btn-danger editBtn" onClick={() => this.showEditUser(id)}>Edit</button>
    }
    else {
      return null;
    }

  }

  showEditUser = (id) => {
    if (localStorage.getItem("role") === "Admin") {
      this.setState({
        editUserId: id
      })
    }
  }
  render() {
    return (
      <div>
        <div className="row">
          <this.sideNav />
        </div>
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
                <this.adminColHeader />
              </tr>
            </thead>
            <tbody>
              {this.state.allUsers.map(
                (user, index) => {
                  return (
                    <tr key={user.user_id}>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.role_id}</td>
                      <td>{user.user_id}</td>
                      <td value={user.user_id}>{this.adminEditButton(user.user_id)}</td>
                    </tr>
                  )
                }
              )}
            </tbody>
          </table>
        </div>
        <div className="editUserForm">
          {this.state.editUserId && <EditUserComponent id={this.state.editUserId} />}
        </div>

      </div>

    )
  }
}