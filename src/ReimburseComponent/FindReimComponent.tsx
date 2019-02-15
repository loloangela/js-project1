import React, { Component } from 'react';
import { ersContext } from '../axios/ers.context';
import { SideNavReimComponent } from "../NavComponent/SideNavReimComponent";
import { number } from 'prop-types';
/*
 * Profile component will determine what user-page to display based off of perms
 */

export class FindReimComponent extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      myReimbursements: [],
      author_id: number
    }
  }


  sideNav() {
    if (localStorage.getItem("role") !== "Associate") {
      return <SideNavReimComponent />;
    }
    return null;
  }

  async componentWillMount() {

    localStorage.setItem("url", "/find-reim");

  }
  async componentDidMount() {

  }

  storeAuthorID = (event) => {
    console.log("Storing Author ID: ", event.target.value)
    this.setState({
      author_id: event.target.value
    })
  }

  reimlookup = async (event) => {
    event.preventDefault();
    console.log("Looking in DB for reim: ", this.state.author_id)
    let x = '/reimbursements/author/' + this.state.author_id;
    try {
      const res = await ersContext.get(x);
      console.log("The output from api: ", res.data)
      this.setState({
        myReimbursements: res.data
      })

    } catch (error) {

    }
  }

  render() {
    return (
      <>
        <div className="row">
          <this.sideNav />
        </div>
        <div><h2>Find Reimbursements</h2></div>
        <br />
        <h2>Find Reimbursement By Author ID</h2>
        <div className="row">
          <div className="col-8">
            <form className="col-8" onSubmit={this.reimlookup}>
              <label className="user-lookup" id="lookupLabel" >Enter User ID Number:</label>
              <input type="number" id="userLookup" name="userIDInput" min="1" onChange={this.storeAuthorID} required></input>
              <button type="submit">Find</button>
            </form>
          </div>
        </div>
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
                function (reimb, index) {
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
        </div>
      </>
    )
  }
}