import React, { Component } from 'react';
import { ersContext } from '../axios/ers.context';
import { SideNavReimComponent } from "../NavComponent/SideNavReimComponent";
/*
 * Profile component will determine what user-page to display based off of perms
 */

export class PendingReimComponent extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      myReimbursements: [],
      errorMsg: ""
    };

  }

  async getMyReimbursements() {
    console.log('Made it to get all users');
    let empty = [];
    let x = '/reimbursements/status/1';
    try {
      const res = await ersContext.get(x);
      console.log(res.data);
      this.setState({
        myReimbursements: res.data
      })
      return res.data;
    } catch (err) {
      console.log(err);
    }
    return empty;
  }

  approveReim = async (event) => {
    console.log('Approve Reimbursement: ', event.target.value);
    let reimburseApprove = {
      reimburse_id: event.target.value,
      author_id: 0,
      amount: 0,
      date_submit: null,
      date_resolved: null,
      description: "",
      resolver_id: 0,
      status_id: 2,
      type_id: 0
    }
    try {
      const res = await ersContext.patch('/reimbursements', reimburseApprove);
      this.setState({
        ...this.state,
        errorMsg: "The reimbursement has been APPROVED!"
      })
      console.log(res.data);
    } catch (error) {
      console.log("Something went wrong: ", error);
    }
  }

  denyReim = async (event) => {
    console.log('Deny Reimbursement: ', event.target.value);
    let reimburseDeny = {
      reimburse_id: event.target.value,
      author_id: 0,
      amount: 0,
      date_submit: null,
      date_resolved: null,
      description: "",
      resolver_id: 0,
      status_id: 3,
      type_id: 0
    }
    try {
      const res = await ersContext.patch('/reimbursements', reimburseDeny);
      console.log(res.data);
      this.setState({
        ...this.state,
        errorMsg: "The reimbursement has been DENIED!"
      })
    } catch (error) {
      console.log("Something went wrong: ", error);
    }
  }

  async componentWillMount() {
    let temp = await this.getMyReimbursements();
    localStorage.setItem("url", "/pending");
    console.log("Will Mount (state): ", this.state.myReimbursements)

  }
  async componentDidMount() {
    let temp = await this.getMyReimbursements();
    console.log("Did Mount (state): ", this.state.myReimbursements)

  }

  sideNav() {
    if (localStorage.getItem("role") !== "Associate") {
      return <SideNavReimComponent />;
    }
    return null;
  }

  render() {
    return (
      <>
        <div className="row">
          <this.sideNav />
        </div>
        <div><h2>Pending Reimbursements</h2></div>
        <br />
        <div>
          <table className="table thead-dark table-hover user-table ">
            <thead>
              <tr>
                <th id="reimIDLabel">Reimbursement ID</th>
                <th id="descriptionLabel">Description</th>
                <th id="amountLabel">Amount</th>
                <th id="authorLabel">Author ID</th>
                <th id="dateSubmitLabel">Date Submitted</th>
                <th id="typeLabel">Type</th>
                <th id="ActionLabel">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.myReimbursements.map(
                (reimb, index) => {
                  return (
                    <tr key={reimb.reimburse_id}>
                      <td>{reimb.reimburse_id}</td>
                      <td>{reimb.description}</td>
                      <td>${reimb.amount}</td>
                      <td>{reimb.author_id}</td>
                      <td>{reimb.date_submit}</td>
                      <td>{reimb.type_id}</td>
                      <td>
                        <button className="btn btn-success" value={reimb.reimburse_id} onClick={this.approveReim}>Approve</button>
                        <button className="btn btn-danger" value={reimb.reimburse_id} onClick={this.denyReim}>Deny</button></td>

                    </tr>
                  )
                }
              )}
            </tbody>
          </table>
        </div>
        <p className="errorMsg">{this.state.errorMsg}</p></>
    )
  }
}