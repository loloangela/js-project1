import React, { Component } from 'react';
import { SideNavReimComponent } from "../NavComponent/SideNavReimComponent";
import { MyReimburseTableComponent } from "./MyReimburseTableComponent";
import { SubmitReimComponent } from './SubmitReimComponent';

export class ReimburseComponent extends Component<any, any> {

  sideNav() {
    if (localStorage.getItem("role") !== "Associate") {
      return <SideNavReimComponent />;
    }
    return null;
  }

  componentWillMount() {
    console.log("Url (wm): ", localStorage.getItem("url"));
  }

  componentDidMount() {
    console.log("Url (dm): ", localStorage.getItem("url"));
  }

  render() {
    return (
      <div className="reimburse-display">
        <div className="row">
          <this.sideNav />
        </div>
        <MyReimburseTableComponent />
        <div className="">
          <SubmitReimComponent />
        </div>
      </div>
    )
  }
}