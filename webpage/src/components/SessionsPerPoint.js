import axios from "axios";
import React, { Component } from "react";
import DatePicker from "react-date-picker";
import https from "https";

class SessionsPerPoint extends Component {
  constructor(props) {
    super(props);
    this.state = { startDate: new Date(), endDate: new Date(), id: 0 };

    this.changeStartDate = this.changeStartDate.bind(this);
    this.changeEndDate = this.changeEndDate.bind(this);

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  changeStartDate = (e) => {
    this.setState({ startDate: e });
  };

  changeEndDate = (e) => {
    this.setState({ endDate: e });
  };

  errorCheck() {
    return this.state.endDate >= this.state.startDate ? 1 : 0;
  }

  handleClick(e) {
    e.preventDefault(e);
    // Simple GET request using axios
    let tmpStart = this.state.startDate.toLocaleDateString("en-GB");
    let tmpEnd = this.state.endDate.toLocaleDateString("en-GB");

    let [startDay, startMonth, startYear] = tmpStart.split("/");
    let [endDay, endMonth, endYear] = tmpEnd.split("/");

    let url =
      "/SessionsPerPoint/" +
      this.state.id +
      "/" +
      startYear +
      startMonth +
      startDay +
      "/" +
      endYear +
      endMonth +
      endDay;

    window.history.replaceState(null, "Query Result", url);
    axios
      .get("https://localhost:8765/evcharge/api" + url, {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      })
      .then((response) => {
        console.log(response.data);
      });
  }

  handleChange(e) {
    this.setState({ id: e.target.value });
  }

  render() {
    return (
      <div>
        <h1>Point Session Screen</h1>
        <h2>Choose Point ID</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            PointID:
            <input
              type="text"
              id={this.state.id}
              onChange={this.handleChange}
            />
          </label>
        </form>
        <h4>Choose Start Date</h4>
        <DatePicker
          onChange={this.changeStartDate}
          value={this.state.startDate}
        />
        <h4>Choose End Date</h4>
        <DatePicker onChange={this.changeEndDate} value={this.state.endDate} />
        {this.errorCheck() ? (
          <button onClick={this.handleClick}> Proceed </button>
        ) : (
          <h4>Invalid</h4>
        )}
      </div>
    );
  }
}

export default SessionsPerPoint;