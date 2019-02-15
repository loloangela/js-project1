import React, { Component } from 'react';
import { ersContext } from '../axios/ers.context';
import { SideNavUserComp } from '../NavComponent/SideNavUsersComponent';
/*
 * Profile component will determine what user-page to display based off of perms
 */

export class MyReimburseTableComponent extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      myReimbursements: [],
    }
  }

  async getMyReimbursements() {
    console.log('Made it to get all users');
    let empty = [];
    let x = '/reimbursements/author/' + localStorage.getItem("user_id");
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

  async componentWillMount() {
    let temp = await this.getMyReimbursements();
    console.log("Will Mount (state): ", this.state.myReimbursements)

  }
  async componentDidMount() {
    localStorage.setItem("url", "/reimbursements");
    let temp = await this.getMyReimbursements();
    console.log("Did Mount (state): ", this.state.myReimbursements)

  }

  render() {
    return (
      <>
        <div><h2>My Reimbursements</h2></div>
        <br />
        <div>
          <table className="table thead-dark table-hover user-table ">
            <thead>
              <tr>
                <th id="reimIDLabel">Reimbursement ID</th>
                <th id="descriptionLabel">Description</th>
                <th id="amountLabel">Amount</th>
                <th id="dateSubmitLabel">Date Submitted</th>
                <th id="typeLabel">Type</th>
                <th id="statusLabel">Status</th>
                <th id="resolverLabel">Resolver ID</th>
                <th id="dateResolvedLabel">Date Resolved</th>
              </tr>
            </thead>
            <tbody>
              {this.state.myReimbursements.map(
                (reimb, index) => {
                  return (
                    <tr key={index}>
                      <td>{reimb.reimburse_id}</td>
                      <td>{reimb.description}</td>
                      <td>${reimb.amount}</td>
                      <td>{reimb.date_submit}</td>
                      <td>{reimb.type_id}</td>
                      <td>{reimb.status_id}</td>
                      <td>{reimb.resolver_id}</td>
                      <td>{reimb.date_resolved}</td>
                    </tr>
                  )
                }
              )}
            </tbody>
          </table>
        </div></>
    )
  }
}