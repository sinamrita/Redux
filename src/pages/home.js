import "bootstrap/dist/css/bootstrap.css";
import { add } from "date-fns";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { selectGame } from "../Action/action";
import icon from "../images/football.svg";
import "./home.css";

export class Games extends Component {
  componentDidMount() {
    this.props.getGameAndBooking();
    this.props.postDate(add(new Date(), { days: 1 }));
  }

  handleBook = (id) => {
    this.props.selectGame(id);
    this.props.history.push("/booking");
  };

  handleSearch = () => {
    this.props.history.push("/search");
  };

  render() {
    return (
      <div className="Home">
        <header>
          Play Zone
          <img src={icon} alt="" height="40px" />
        </header>
        <center className="games-list">
          {this.props.Games.map((game) => (
            <div className="card game-card" key={game.id}>
              <ul>
                <li>
                  <img
                    height="300px"
                    width="200px"
                    src={game.src}
                    alt={game.name}
                  />
                </li>
                <li>
                  <h4>{game.name}</h4>
                </li>
                <li>
                  <button
                    className="btn btn-dark"
                    onClick={() => this.handleBook(game.id)}
                  >
                    Book Now
                  </button>
                </li>
              </ul>
            </div>
          ))}
        </center>
        <center>
          <div>
            <button
              className=" btn-lg btn btn-dark m-2"
              onClick={() => this.handleSearch()}
            >
              Check your booking
            </button>
          </div>
        </center>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    Games: state.Games,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    postDate: (date) => dispatch({ type: "TODAY_DATE", date }),
    selectGame: (id) => dispatch(selectGame(id)),
    getGameAndBooking: () => dispatch({ type: "GAME_BOOKING" }),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Games));
