import React, { Component } from "react";
import { DateRangePicker } from "react-dates";
import moment from "moment";
import "./styles.css";

class DateRangeSelector extends Component {
  state = {
    startDate: moment().subtract(2, "year"),
    endDate: moment(),
    focusedInput: null
  };

  handleDateChange = ({ startDate, endDate }) =>
    this.setState({ startDate, endDate });

  handleFocusChange = focusedInput => this.setState({ focusedInput });

  render = () => (
    <DateRangePicker
      endDate={this.state.endDate}
      endDateId="endDate"
      focusedInput={this.state.focusedInput}
      isOutsideRange={() => null}
      onDatesChange={this.handleDateChange}
      onFocusChange={this.handleFocusChange}
      startDate={this.state.startDate}
      startDateId="startDate"
    />
  );
}

export default DateRangeSelector;
