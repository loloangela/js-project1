import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './include/Bootstrap';
import './App.scss';
import { NavComponent } from './NavComponent/NavComponent';
import { LoginComponent } from './LoginComponent/LoginComponent';
import { LogoutComponent } from './LogoutComponent/LogoutComponent';
import { HomeComponent } from './HomeComponent/HomeComponent';
import { ReimburseComponent } from './ReimburseComponent/ReimburseComponent';
import { PendingReimComponent } from './ReimburseComponent/PendingReimComponent';
import { ApprovedReimComponent } from './ReimburseComponent/ApprovedReimComponent';
import { DeniedReimComponent } from './ReimburseComponent/DeniedReimComponent';
import { FindReimComponent } from './ReimburseComponent/FindReimComponent';
import { ProfileComponent } from './ProfileComponent/ProfileComponent';
import { MyProfileComponent } from './ProfileComponent/MyProfileComponent';
import { FindUserComponent } from './ProfileComponent/FindUserComponent';
import { EditUserComponent } from './ProfileComponent/EditUserComponent';
import { FooterComponent } from './FooterComponent/FooterComponent';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <div className="App">
            <NavComponent />
            <Route path="/login" component={LoginComponent} />
            <Route path="/home" component={HomeComponent} />
            <Route path="/reimbursements" component={ReimburseComponent} />
            <Route path="/users" component={ProfileComponent} />
            <Route path="/myprofile" component={MyProfileComponent} />
            <Route path="/find-user" component={FindUserComponent} />
            <Route path="/logout" component={LogoutComponent} />
            <Route path="/pending" component={PendingReimComponent} />
            <Route path="/approved" component={ApprovedReimComponent} />
            <Route path="/denied" component={DeniedReimComponent} />
            <Route path="/find-reim" component={FindReimComponent} />
            <Route path="/edit-user" component={EditUserComponent} />
          </div>
          <FooterComponent />
        </>
      </BrowserRouter>
    );
  }
}

export default App;
