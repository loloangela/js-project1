import React, { Component } from 'react';
import { ersContext } from '../axios/ers.context';

export class SubmitReimComponent extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      newReimb: {
        author_id: parseInt(localStorage.getItem("user_id") as string),
        status_id: 1
      },
      errorMsg: ""
    }
  }

  updateReimbDesc = (event) => {
    console.log("What is the event target: ", event.target.name);
    this.setState({
      newReimb: {
        ...this.state.newReimb,
        description: event.target.value
      }
    })
  }

  updateReimbAmnt = (event) => {
    console.log("What is the event target: ", event.target.name);
    this.setState({
      newReimb: {
        ...this.state.newReimb,
        amount: parseFloat(event.target.value)
      }
    })
  }

  updateReimbType = (event) => {
    console.log("What is the event target: ", event.target.name);
    this.setState({
      newReimb: {
        ...this.state.newReimb,
        type_id: parseInt(event.target.value)
      }
    })
  }

  submitNewReim = async (event) => {
    event.preventDefault();
    console.log("The state after clicking submit: ", this.state.newReimb);
    const res = await ersContext.post("/reimbursements", this.state.newReimb);
    if (res.status === 201) {
      console.log("Update successful");
      this.setState({
        errorMsg: "Update Successful!"
      })
    } else {
      this.setState({
        errorMsg: "Update Failed!"
      })
    }
  }
  render() {
    return (
      <><br />
        <h3>Submit New Reimbursement</h3><br />
        <div className="centered">
          <form className="submit-reim " onSubmit={this.submitNewReim}>
            <div className="row">
              <div className="col-5">
                <label htmlFor="inputDescription" className="submit-reim">Description</label>
                <input type="text" name="description" id="description" onChange={this.updateReimbDesc} required />
              </div>
              <div className="col-3">
                <div className="input-group">
                  <label htmlFor="inputAmount" className="submit-reim">Amount</label>
                  <input type="number" step="0.01" className="form-control-sm" name="amount" onChange={this.updateReimbAmnt} aria-label="Dollar amount (with dot and two decimal places)" required />
                  <div className="input-group-append">
                    <span className="input-group-text">$</span>
                    <span className="input-group-text">0.00</span>
                  </div>
                </div>
              </div>
              <div className="col-2 input-group">
                <label htmlFor="inputType" className="submit-reim">Type</label>
                <select className="custom-select" name="type_id" id="reimType" onChange={this.updateReimbType} required>
                  <option defaultValue="Choose...">Choose...</option>
                  <option value="1">Lodging</option>
                  <option value="2">Travel</option>
                  <option value="3">Food</option>
                  <option value="4">Other</option>
                </select>
              </div>
              <div className="col-1">
                <button className="btn btn-primary" type="submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
        <div>
          <p className="errorMsg">{this.state.errorMsg}</p>
        </div>
      </>
    )
  }
}