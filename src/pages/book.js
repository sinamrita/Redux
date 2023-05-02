import { format } from "date-fns";
import add from "date-fns/add";
import React, { Component } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router";
import { doneBooking, iconClick, onSelectedDay } from "../Action/action";
import Slots from "../Component/slot";
import icon from "../images/football.svg";
import "./book.css";

export class Booking extends Component {
  state = {
    name: "",
    contact: "",
    errorStmt: "",
  };

  handleHomePage = () => {
    this.props.iconClick();
    this.props.history.push("/");
  };

  handleValidation = () => {
    if (!this.props.slotBooked)
      return this.setState({ errorStmt: "Select your slot!!!" });

    if (!this.state.name || /\d/.test(this.state.name))
      return this.setState({ errorStmt: "Invalid Input!!!" });

    if (!this.state.contact || !/^\d{10}$/.test(this.state.contact))
      return this.setState({ errorStmt: "Invalid Input!!!" });

    return this.setState({ errorStmt: "" }, () => {
      this.handleBook();
    });
  };

  Display_slot = (Day) => {
    this.props.onSelectedDay(Day);
  };

  handleBook = () => {
    // do a booking request
    alert("Booked!");
    this.props.doneBooking();
  };

  render() {
    if (!this.props.selectedGame) return <Redirect to="/" />;

    let validBookingDate = add(new Date(), { days: 1 });
    let currentBookingDate = this.props.selectedDate.getDate();

    return (
      <div className="Book">
        <header>
          <div className="header_right">
            Play Zone:{this.props.selectedGame.name}
          </div>
          <div className="header_left">
            <p id="header_Date">
              Slot Date:{format(this.props.selectedDate, "d/M/yyyy")}
            </p>
            <img
              alt=""
              id="icon"
              src={icon}
              onClick={this.handleHomePage}
              height="40px"
            />
          </div>
        </header>

        <center className="slot-picker">
          <div className="card" id="date">
            <DayPicker
              mode="single"
              selected={this.props.selectedDate}
              onSelect={this.Display_slot}
            />
          </div>
          <div className="slot-picker_right">
            {currentBookingDate < validBookingDate.getDate() ? (
              <p id="not_opened">
                Booking has been closed. Book your slot for
                {format(validBookingDate, "d/M/yyyy")}
              </p>
            ) : currentBookingDate > validBookingDate.getDate() ? (
              <p id="not_opened">Booking is not opened yet</p>
            ) : (
              <div id="slot-display">
                <Slots />
                <div className="slot-booking-form">
                  <input
                    id="contact"
                    className="form-control"
                    name="name"
                    placeholder="Enter Your Name"
                    value={this.state.name}
                    onChange={(ev) =>
                      this.setState({
                        name: ev.target.value,
                      })
                    }
                  />
                  <input
                    id="contact"
                    name="contact"
                    className="form-control"
                    placeholder="Enter Your Contact No"
                    value={this.state.contact}
                    onChange={(ev) =>
                      this.setState({
                        contact: ev.target.value,
                      })
                    }
                  />
                  <div>
                    <button
                      id="book_button"
                      className=" btn-lg btn btn-dark m-2"
                      onClick={this.handleValidation}
                    >
                      Book Now
                    </button>
                    <span className="error text-danger">
                      {this.state.errorStmt}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </center>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.Games,
    selectedGame: state.selectedGame,
    selectedDate: state.selectedDate,
    slotBooked: state.slotBooked,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doneBooking: () => dispatch(doneBooking()),
    onSelectedDay: (id) => dispatch(onSelectedDay(id)),
    iconClick: () => dispatch(iconClick()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Booking)
);
