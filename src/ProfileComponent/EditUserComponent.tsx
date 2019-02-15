import React, { Component } from 'react';
import { ersContext } from '../axios/ers.context';
import { number, string } from 'prop-types';

export class EditUserComponent extends Component<any, any>{

  constructor(props) {
    super(props);
    console.log("The props passed in: ", props);
    this.state = {
      user_id: number,
      userData: {
        user_id: this.props.id,
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        role_id: 0
      },
      errorMsg: ""
    }
  }

  updateFirstName = (event) => {
    console.log("First name: ", event.target.value);
    this.setState({
      state: { ...this.state },
      userData: {
        ...this.state.userData,
        first_name: event.target.value
      }
    })
  }

  updateLastName = (event) => {
    console.log("Last name: ", event.target.value);
    this.setState({
      state: { ...this.state },
      userData: {
        ...this.state.userData,
        last_name: event.target.value
      }
    })
  }

  updateUsername = (event) => {
    console.log("Username: ", event.target.value);
    this.setState({
      state: { ...this.state },
      userData: {
        ...this.state.userData,
        username: event.target.value
      }
    })
  }

  updateEmail = (event) => {
    console.log("Email: ", event.target.value);
    this.setState({
      state: { ...this.state },
      userData: {
        ...this.state.userData,
        email: event.target.value
      }
    })
  }

  updatePassword = (event) => {
    console.log("Password: ", event.target.value);
    this.setState({
      state: { ...this.state },
      userData: {
        ...this.state.userData,
        password: event.target.value
      }
    })
  }

  updateRole = (event) => {
    console.log("Role: ", event.target.value);
    this.setState({
      state: { ...this.state },
      userData: {
        ...this.state.userData,
        role: event.target.value
      }
    })
  }

  submitUpdateUser = async (event) => {
    event.preventDefault();
    let data1 = JSON.stringify(this.state.userData);
    console.log("Original Stringify: ", data1);

    let end = data1.length - 1;
    let data = data1.substring(1, end);
    console.log("String to be sent: ", data1);

    try {
      const res = await ersContext.patch('/users', this.state.userData);
      console.log('UserInfo: ', res.data);
      if (res.status === 201) {
        this.setState({
          state: this.state,
          errorMsg: "The User Update was SUCCESSFUL!"
        })
      } else {
        this.setState({
          state: this.state,
          errorMsg: "The User Update FAILED!"
        })
      }
    } catch (error) {
      this.setState({
        state: this.state,
        errorMsg: "The User Update FAILED!" + error
      })
    }
  }
  render() {
    return (
      <>
        <h3>Edit User Info</h3><br />
        <div>
          <form className="editUserForm" onSubmit={this.submitUpdateUser}>
            <div className="row">
              <div className="col-2">
                <label htmlFor="inputFirstName" className="editUserForm">First Name</label>
                <input type="text" name="first_name" id="first_name" onChange={this.updateFirstName} />
              </div>
              <div className="col-2">
                <label htmlFor="inputLastName" className="editUserForm">Last Name</label>
                <input type="text" name="last_name" id="last_name" onChange={this.updateLastName} />
              </div>
              <div className="col-2">
                <label htmlFor="inputEmail" className="editUserForm">Email</label>
                <input type="text" name="email" id="email" onChange={this.updateEmail} />
              </div>
              <div className="col-2">
                <label htmlFor="inputUsername" className="editUserForm">Username</label>
                <input type="text" name="username" id="username" onChange={this.updateUsername} />
              </div>
              <div className="col-2">
                <label htmlFor="inputPassword" className="editUserForm">Password</label>
                <input type="password" name="password" id="password" onChange={this.updatePassword} />
              </div>
              <div className="col-2 input-group">
                <div className="container"><label htmlFor="inputRole" className="editUserForm">Role <br /></label></div>
                <div className="row container-fluid">
                  <select className="custom-select" name="role_id" id="role_id" onChange={this.updateRole}>
                    <option defaultValue="Choose...">Choose...</option>
                    <option value="1">Admin</option>
                    <option value="2">Finance Manager</option>
                    <option value="3">Associate</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="container-fluid centered">
              <p className="errorMsg">{this.state.errorMsg}<br />
                <button className="btn btn-primary submit-button" type="submit">Submit</button></p>

            </div>
          </form>

        </div>

      </>
    )
  }
}