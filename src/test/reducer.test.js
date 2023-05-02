import { bookSlot1, bookSlot2 } from "../Component/slot_data";
import bookNowReducer from "../Reducer/reducer";
import BasketBall from "../images/basket_ball.jpeg";
import VolleyBall from "../images/volleyBall.jpeg";

describe("testing cart reducer", () => {
  const initState = {
    Games: [],
    selectedGame: undefined,
    selectedDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + 1
    ),

    slotBooked: undefined,
    details: [],
    bookingCheck: [],
  };
  it("initial state check", () => {
    expect(bookNowReducer(undefined, {})).toEqual(initState);
  });
  it("UPDATE_BOOKING", () => {
    const state = {
      Games: [],
      details: [],
    };
    expect(
      bookNowReducer(state, {
        type: "UPDATE_BOOKING",
        GameAndSlot: [
          { id: 0, src: BasketBall, name: "BasketBall", slots: bookSlot1 },
          { id: 1, src: VolleyBall, name: "VolleyBall", slots: bookSlot2 },
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
      })
    ).toEqual({
      Games: [
        { id: 0, src: BasketBall, name: "BasketBall", slots: bookSlot1 },
        { id: 1, src: VolleyBall, name: "VolleyBall", slots: bookSlot2 },
      ],
      details: [
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
  });
  it("select game(onBook)", () => {
    const state = {
      Games: [
        { id: 0, src: BasketBall, name: "BasketBall", slots: bookSlot1 },
        { id: 1, src: VolleyBall, name: "VolleyBall", slots: bookSlot2 },
      ],
      selectedGame: [],
    };
    expect(bookNowReducer(state, { type: "SELECT_GAME", id: 1 })).toEqual({
      Games: [
        { id: 0, src: BasketBall, name: "BasketBall", slots: bookSlot1 },
        { id: 1, src: VolleyBall, name: "VolleyBall", slots: bookSlot2 },
      ],
      selectedGame: {
        id: 1,
        src: VolleyBall,
        name: "VolleyBall",
        slots: bookSlot2,
      },
    });
    const next_state = {
      Games: [
        { id: 0, src: BasketBall, name: "BasketBall", slots: bookSlot1 },
        {
          id: 1,
          src: VolleyBall,
          name: "VolleyBall",
          slots: [
            {
              id: 1,
              startTime: "09.00 A.M",
              endTime: "10.00 A.M",
              slotStatus: "btn btn-primary",
            },
            {
              id: 2,
              startTime: "10.00 A.M",
              endTime: "11.00 A.M",
              slotStatus: "btn btn-success",
            },
            {
              id: 3,
              startTime: "12.00 P.M",
              endTime: "01.00 P.M",
              slotStatus: "btn btn-danger",
            },
          ],
        },
      ],
      selectedGame: [],
    };
    expect(bookNowReducer(next_state, { type: "SELECT_GAME", id: 1 })).toEqual({
      Games: [
        { id: 0, src: BasketBall, name: "BasketBall", slots: bookSlot1 },
        {
          id: 1,
          src: VolleyBall,
          name: "VolleyBall",
          slots: [
            {
              id: 1,
              startTime: "09.00 A.M",
              endTime: "10.00 A.M",
              slotStatus: "btn btn-success",
            },
            {
              id: 2,
              startTime: "10.00 A.M",
              endTime: "11.00 A.M",
              slotStatus: "btn btn-success",
            },
            {
              id: 3,
              startTime: "12.00 P.M",
              endTime: "01.00 P.M",
              slotStatus: "btn btn-danger",
            },
          ],
        },
      ],
      selectedGame: {
        id: 1,
        src: VolleyBall,
        name: "VolleyBall",
        slots: [
          {
            id: 1,
            startTime: "09.00 A.M",
            endTime: "10.00 A.M",
            slotStatus: "btn btn-success",
          },
          {
            id: 2,
            startTime: "10.00 A.M",
            endTime: "11.00 A.M",
            slotStatus: "btn btn-success",
          },
          {
            id: 3,
            startTime: "12.00 P.M",
            endTime: "01.00 P.M",
            slotStatus: "btn btn-danger",
          },
        ],
      },
    });
  });
  // .....

  it("onShow", () => {
    const state = {
      selectedDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 1
      ),
    };
    expect(
      bookNowReducer(state, {
        type: "ON_SELECTED_DAY",
        Day: "Wed Mar 11 2020 12:00:00 GMT+0530 (India Standard Time)",
      })
    ).toEqual({
      selectedDate: "Wed Mar 11 2020 12:00:00 GMT+0530 (India Standard Time)",
    });
  });
  it("on select slot", () => {
    const state = {
      selectedGame: {
        id: 1,
        src: VolleyBall,
        name: "VolleyBall",
        slots: bookSlot2,
      },
      slotBooked: undefined,
    };
    expect(bookNowReducer(state, { type: "ON_SELECT_SLOT", id: 2 })).toEqual({
      selectedGame: {
        id: 1,
        src: VolleyBall,
        name: "VolleyBall",
        slots: bookSlot2,
      },
      slotBooked: {
        id: 2,
        startTime: "10.00 A.M",
        endTime: "11.00 A.M",
        slotStatus: "btn btn-primary",
      },
    });
    expect(bookNowReducer(state, { type: "ON_SELECT_SLOT", id: 6 })).toEqual({
      selectedGame: {
        id: 1,
        src: VolleyBall,
        name: "VolleyBall",
        slots: bookSlot2,
      },
      slotBooked: {
        id: 6,
        startTime: "02.00 P.M",
        endTime: "03.00 P.M",
        slotStatus: "btn btn-primary",
      },
    });

    const Nextstate = {
      selectedGame: {
        id: 1,
        src: VolleyBall,
        name: "VolleyBall",
        slots: [
          {
            id: 1,
            startTime: "09.00 A.M",
            endTime: "10.00 A.M",
            slotStatus: "btn btn-success",
          },
          {
            id: 2,
            startTime: "10.00 A.M",
            endTime: "11.00 A.M",
            slotStatus: "btn btn-danger",
          },
        ],
      },
      slotBooked: undefined,
    };
    expect(
      bookNowReducer(Nextstate, { type: "ON_SELECT_SLOT", id: 2 })
    ).toEqual({
      selectedGame: {
        id: 1,
        src: VolleyBall,
        name: "VolleyBall",
        slots: [
          {
            id: 1,
            startTime: "09.00 A.M",
            endTime: "10.00 A.M",
            slotStatus: "btn btn-success",
          },
          {
            id: 2,
            startTime: "10.00 A.M",
            endTime: "11.00 A.M",
            slotStatus: "btn btn-danger",
          },
        ],
      },
      slotBooked: undefined,
    });
  });
  it("DONE_BOOKING", () => {
    const state = {
      selectedGame: {
        id: 1,
        src: VolleyBall,
        name: "VolleyBall",
        slots: [
          {
            id: 1,
            startTime: "09.00 A.M",
            endTime: "10.00 A.M",
            slotStatus: "btn btn-success",
          },
          {
            id: 2,
            startTime: "10.00 A.M",
            endTime: "11.00 A.M",
            slotStatus: "btn btn-primary",
          },
        ],
      },
      slotBooked: {
        id: 2,
        startTime: "10.00 A.M",
        endTime: "11.00 A.M",
        slotStatus: "btn btn-primary",
      },
    };
    expect(bookNowReducer(state, { type: "DONE_BOOKING" })).toEqual({
      selectedGame: {
        id: 1,
        src: VolleyBall,
        name: "VolleyBall",
        slots: [
          {
            id: 1,
            startTime: "09.00 A.M",
            endTime: "10.00 A.M",
            slotStatus: "btn btn-success",
          },
          {
            id: 2,
            startTime: "10.00 A.M",
            endTime: "11.00 A.M",
            slotStatus: "btn btn-danger",
          },
        ],
      },
      slotBooked: undefined,
    });
  });
  it("doneBooking", () => {
    const state = {
      slotBooked: {
        id: 2,
        startTime: "10.00 A.M",
        endTime: "11.00 A.M",
        slotStatus: "btn btn-primary",
      },
    };
    expect(bookNowReducer(state, { type: "ICON_CLICK", id: 2 })).toEqual({
      slotBooked: undefined,
      selectedDate: new Date(),
      slotBooked: undefined,
    });
  });

  it("check Booking", () => {
    const state = {
      bookingCheck: [],
      details: [
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
    };
    expect(
      bookNowReducer(state, { type: "CHECK_BOOKING", payload: "9230" })
    ).toEqual({
      bookingCheck: [
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
      details: [
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
  });
});
