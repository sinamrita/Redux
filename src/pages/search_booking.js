import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { checkBooking } from "../Action/action";
import icon from "../images/football.svg";
import "./search_booking.css";

export class Search_Booking extends Component {
  state = {
    Search: undefined,
  };

  componentDidMount() {
    this.props.getGameAndBooking();
  }

  handleHomePage = () => {
    this.props.history.push("/");
  };

  render() {
    let searchString = this.state.Search || "";
    return (
      <div className="Home">
        <div>
          <header>
            Play Zone
            <img
              alt=""
              id="icon"
              height="40px"
              src={icon}
              onClick={this.handleHomePage}
            />
          </header>
        </div>
        <div>
          <span>
            <input
              name="Search"
              className="Search form-control"
              placeholder="Enter Your BookingID"
              value={searchString}
              onChange={(ev) =>
                this.setState({ Search: ev.target.value || undefined })
              }
            />
          </span>
          <div>
            <table>
              <thead>
                <tr id="Book_List_header">
                  <td id="Book_List_header">Booking ID</td>
                  <td id="Book_List_header">Slot Date</td>
                  <td id="Book_List_header">Name</td>
                  <td id="Book_List_header">Contact No</td>
                  <td id="Book_List_header">Game</td>
                  <td id="Book_List_header">Slots</td>
                </tr>
              </thead>
              <tbody>
                {this.props.details.some((it) =>
                  it.bookingId.includes(searchString)
                ) &&
                  this.props.details
                    .filter((it) => it.bookingId.includes(searchString))
                    .map((it) => (
                      <tr key={it.bookingId} id="Booking_List">
                        <td id="Book_List">{it.bookingId}</td>
                        <td id="Book_List">{it.slotDate}</td>
                        <td id="Book_List">{it.name}</td>
                        <td id="Book_List">{it.contact}</td>
                        <td id="Book_List">{it.game}</td>
                        <td id="Book_List">
                          {it.slot.startTime}-{it.slot.endTime}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
            {!this.props.details.length ? (
              <p id="no_booking">No Booking happend yet</p>
            ) : (
              !this.props.details.some((it) =>
                it.bookingId.includes(searchString)
              ) && <p id="no_booking">No Booking Found</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    checkBooking: state.bookingCheck,
    details: state.details,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    check: (payload) => dispatch(checkBooking(payload)),
    getGameAndBooking: () => dispatch({ type: "GAME_BOOKING" }),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Search_Booking)
);
