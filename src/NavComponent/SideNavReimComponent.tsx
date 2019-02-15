import React, { Component } from 'react';

export class SideNavReimComponent extends Component {
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
            <li id="my-reim" className="nav-item"><a href="/reimbursements" className="nav-link">My Reimbursements</a></li>
            <li id="pending" className="nav-item active"><a href="/pending" className="nav-link">Pending</a></li>
            <li id="approved" className="nav-item"><a href="/approved" className="nav-link">Approved</a></li>
            <li id="denied" className="nav-item active"><a href="/denied" className="nav-link">Denied</a></li>
            <li id="find-reim" className="nav-item"><a href="/find-reim" className="nav-link">Find User</a></li>

          </ul>
          <br />
        </nav>
      </div>
    )
  }
}