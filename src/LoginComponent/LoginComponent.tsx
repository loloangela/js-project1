import React, { Component } from 'react';
import { ersContext } from '../axios/ers.context';
import smamst from '../smamst.jpg';

export class LoginComponent extends Component<any, any> {
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
      loggedIn: false
    }
  }

  updateUsername = (event) => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        username: event.target.value
      }
    })
  }

  updatePassword = (event) => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        password: event.target.value
      }
    })
  }

  // Store User Data Locally
  storeUserData(userData: object) {
    localStorage.setItem("user_data", JSON.stringify(userData));
    localStorage.setItem("username", userData['username']);
    localStorage.setItem("user_id", userData['user_id']);
    localStorage.setItem("first_name", userData['first_name']);
    localStorage.setItem("last_name", userData['last_name']);
    localStorage.setItem("role", userData["role_id"]);
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("url", "/home");
    // Remove credentials so password isn't passed along
    //localStorage.setItem("credentials", JSON.stringify({ username: "", password: "" }));
  }



  signIn = async (event) => {
    event.preventDefault(); // prevent default form submission
    try {
      const res = await ersContext.post('/login', this.state.credentials);
      console.log(res);
      console.log('Username: ', res.data['username']);
      this.storeUserData(res.data);

      this.props.history.push('/home');
    } catch (err) {
      console.log(err);
      this.setState({
        errorFeedback: 'failed to sign in'
      })
    }
  }
  componentDidMount() {
    localStorage.setItem("url", "/login");
  }
  render() {
    const { credentials, errorFeedback } = this.state;
    return (
      <div className="app-content-container">
        <form className="form-signin" onSubmit={this.signIn}>
          <img className="mb-4" src={smamst} alt="" width="500" height="300" />
          <h1 className="h3 mb-3 font-weight-normal">Please Login</h1>
          <label htmlFor="inputUsername" className="sr-only">Username</label>
          <input type="text"
            id="inputUsername"
            className="form-control"
            placeholder="Username"
            value={this.state.credentials.username}
            onChange={this.updateUsername}
            required />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            value={this.state.credentials.password}
            onChange={this.updatePassword}
            required />
          <p className="errorMsg">{this.state.errorFeedback}</p>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
      </div>
    )
  }
}