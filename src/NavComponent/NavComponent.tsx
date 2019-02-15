// NavComponent Holds the nav bar for all pages
import React, { Component } from "react";

export class NavComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      credentials: {
        username: '',
        password: '',
      },
      user_data: {
        user_id: 0,
        username: '',
        role_id: '',
        first_name: '',
        last_name: ''
      },
      loggedIn: false
    }
  }

  isUserLoggedIn = () => {
    console.log("in the logged in method, state say loggedIn: ", localStorage.getItem("loggedIn"));
    let loginLogout = <a className="nav-item nav-link" href="/login">Login</a>;
    if ((localStorage.getItem('loggedIn') === 'true') && (localStorage.getItem("url") !== "/logout")) {
      loginLogout = <a className="nav-item nav-link" href="/logout">Logout</a>;
    }
    console.log('Link Should say: ', loginLogout)
    return loginLogout;
  }

  componentWillMount() {
    console.log("Will Mount Nav\nIsLoggedIn: ", localStorage.getItem("loggedIn"));
    console.log("Will Mount Nav\nURL: ", localStorage.getItem("url"));
  }

  componentDidMount() {
    console.log("Did Mount Nav\nIsLoggedIn: ", localStorage.getItem("loggedIn"));
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav main-nav">
              <a className="nav-item nav-link" href="/home">Home</a>
              <a className="nav-item nav-link" href="/reimbursements">Reimbursements</a>
              <a className="nav-item nav-link" href="/myprofile">Users</a>
              <this.isUserLoggedIn />
            </div>
          </div>
        </nav>
      </div>

    );


  }
}