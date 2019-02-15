import React, { Component } from 'react';
import { ersContext } from '../axios/ers.context';
import { SideNavUserComp } from '../NavComponent/SideNavUsersComponent';

export class MyProfileComponent extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      user_id: localStorage.getItem("user_id"),
      user_info: {}
    }
  }
  async componentWillMount() {
    await this.userlookup();
  }
  async componentDidMount() {
    await this.userlookup();
    localStorage.setItem("url", "/myprofile");
  }

  sideNav() {
    if (localStorage.getItem("role") !== "Associate") {
      return <SideNavUserComp />;
    }
    return null;
  }

  userlookup = async () => {
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


  render() {
    return (
      <div>
        <div className="row">
          <this.sideNav />
        </div>
        <h2>My Info</h2>
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-6 myinfo-table table-striped">
            <br />
            <table className="table user-table ">
              <tbody>
                <tr>
                  <th id="firstNameLabel">First Name</th>
                  <td>{this.state.user_info.first_name}</td>
                </tr><tr>
                  <th id="lastNameLabel">Last Name</th>
                  <td>{this.state.user_info.last_name}</td>
                </tr><tr>
                  <th id="usernameLabel">Username</th>
                  <td>{this.state.user_info.username}</td>
                </tr><tr>
                  <th id="emailLabel">Email</th>
                  <td>{this.state.user_info.email}</td>
                </tr><tr>
                  <th id="roleLabel">Role</th>
                  <td>{this.state.user_info.role_id}</td>
                </tr><tr>
                  <th id="userIDLabel">User ID</th>
                  <td>{this.state.user_info.user_id}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}