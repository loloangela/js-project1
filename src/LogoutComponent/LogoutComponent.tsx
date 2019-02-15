import React, { Component } from 'react';
import { ersContext } from '../axios/ers.context';

export class LogoutComponent extends Component<any, any> {
  constructor(props) {
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
      loggedIn: false,
    }
  }

  clearLocalAndState() {
    this.setState(
      {
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
    );
    localStorage.clear();
  }
  componentWillMount() {
    this.clearLocalAndState();
    console.log("Will Mount (logout): ", localStorage.getItem("loggedIn"));
    localStorage.setItem("url", "/logout");
  }
  componentDidMount() {
    //this.clearLocalAndState();
  }
  render() {
    return (
      <div>
        <h2>Thanks for visiting!</h2>
      </div>
    )
  }
}