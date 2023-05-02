import { put, takeEvery } from "redux-saga/effects";
import {
  bookSlot1,
  bookSlot2,
  bookSlot3,
  bookSlot4,
} from "../Component/slot_data";
import BasketBall from "../images/basket_ball.jpeg";
import cricket from "../images/cricket_bat.jpg";
import FootBall from "../images/football.jpeg";
import VolleyBall from "../images/volleyBall.jpeg";

function* bookingAsync(action) {}

function* getGameAndBookingAsync() {
  // fetch game slots and booking details
  yield put({
    type: "UPDATE_BOOKING",
    GameAndSlot: [
      { id: 0, src: BasketBall, name: "BasketBall", slots: bookSlot1 },
      { id: 1, src: VolleyBall, name: "VolleyBall", slots: bookSlot2 },
      { id: 3, src: cricket, name: "Cricket", slots: bookSlot3 },
      { id: 4, src: FootBall, name: "FootBall", slots: bookSlot4 },
    ],
    BookingDetail: [
      {
        bookingId: "14440074",
        contact: "9876443111",
        game: "BasketBall",
        name: "Roger",
        slotDate: "6/12/2020",
        slot: {
          id: 4,
          startTime: "12.00 P.M",
          endTime: "01.00 P.M",
          slotStatus: "btn btn-success",
        },
      },
      {
        bookingId: "92303869",
        contact: "9867844311",
        game: "FootBall",
        name: "shelly",
        slotDate: "6/12/2020",
        slot: {
          id: 3,
          startTime: "11.00 A.M",
          endTime: "12.00 P.M",
          slotStatus: "btn btn-success",
        },
      },
    ],
  });
}
function* postTodayTime(action) {
  yield put({ type: "ON_SELECTED_DAY", Day: action.date });
}

export function* watchBooking() {
  yield takeEvery("BOOKINGS", bookingAsync);
}
export function* watchUpdateGame() {
  yield takeEvery("GAME_BOOKING", getGameAndBookingAsync);
}
export function* watchPostTodayTime() {
  yield takeEvery("TODAY_DATE", postTodayTime);
}
