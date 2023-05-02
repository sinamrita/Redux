import React, { Component } from "react";
import { connect } from "react-redux";
import { selectSlot } from "../Action/action";
import "./slot.css";

class Slots extends Component {
  handleSlot = (id) => {
    this.props.selectSlot(id);
  };

  render() {
    return (
      <div className="slot_list">
        {this.props.selectedGame?.slots?.map((slot) => {
          if (slot.id === this.props.bookingSlot?.id)
            return (
              <h4 key={this.props.bookingSlot.id}>
                <span
                  className={this.props.bookingSlot.slotStatus}
                  style={{ cursor: "pointer" }}
                  onClick={() => this.handleSlot(this.props.bookingSlot.id)}
                >
                  {this.props.bookingSlot.startTime} -{" "}
                  {this.props.bookingSlot.endTime}
                </span>
              </h4>
            );

          return (
            <h4 key={slot.id}>
              <span
                className={slot.slotStatus}
                style={{ cursor: "pointer" }}
                onClick={() => this.handleSlot(slot.id)}
              >
                {slot.startTime} - {slot.endTime}
              </span>
            </h4>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedGame: state.selectedGame,
    bookingSlot: state.slotBooked,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    selectSlot: (id) => dispatch(selectSlot(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Slots);
