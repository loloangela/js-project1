import React, { Component } from 'react';
import { number } from 'prop-types';
import ersHome from '../ersHome.jpg';

export class HomeComponent extends Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {
      user_data: {
        user_id: number,
        username: '',
        role_id: '',
        first_name: '',
        last_name: ''
      },
      loggedIn: false
    }
  }
  welcomeMessage() {
    if (localStorage.getItem("loggedIn") === "true") {
      return <h2>Let's get started, {localStorage.getItem("first_name")}!</h2>
    } else {
      return <h2>To get started, please login.</h2>
    }
  }
  componentDidMount() {
    localStorage.setItem("url", "/home");
  }
  render() {
    return (
      <div className="home-display">
        <h1>Welcome To ERS</h1>
        <img src={ersHome} alt="Picture of money with thumbs up" />
        <this.welcomeMessage />
      </div>
    )
  }
}