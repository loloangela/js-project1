import React, { Component } from 'react';

export class SideNavUserComp extends Component {
  constructor(props) {
    super(props);
  }
  saveStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }



  render() {
    return (
      <div className="container-fluid">
        <nav>
          <ul className="nav justify-content-center sideNav">
            <li id="my-profile" className="nav-item active"><a href="/myprofile" className="nav-link">My Info</a></li>
            <li id="all-users" className="nav-item"><a href="/users" className="nav-link">All Users</a></li>
            <li id="find-user" className="nav-item"><a href="/find-user" className="nav-link">Find User</a></li>
          </ul>
          <br />
        </nav>
      </div>
    )
  }
}