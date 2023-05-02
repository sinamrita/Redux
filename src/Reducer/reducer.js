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

const bookNowReducer = (state = initState, action) => {
  switch (action.type) {
    case "UPDATE_BOOKING":
      return {
        ...state,
        Games: [...action.GameAndSlot],
        details: [...action.BookingDetail],
      };

    case "DONE_BOOKING":
      return {
        ...state,
        selectedGame: {
          ...state.selectedGame,
          slots: state.selectedGame.slots.map((it) => {
            if (it.id === state.slotBooked.id)
              return {
                ...it,
                slotStatus: "btn btn-danger",
              };
            return it;
          }),
        },
        slotBooked: undefined,
      };

    case "SELECT_GAME":
      let game = state.Games.find((it) => it.id === action.id);

      return {
        ...state,
        Games: [
          ...state.Games.filter((it) => it !== game),
          {
            ...game,
            slots: game.slots.map((it) => {
              if (it.slotStatus !== "btn btn-danger")
                it.slotStatus = "btn btn-success";

              return it;
            }),
          },
        ],
        selectedGame: state.Games.find((it) => it.id === action.id),
      };

    case "ICON_CLICK":
      return {
        ...state,
        selectedGame: undefined,
        selectedDate: new Date(),
        slotBooked: undefined,
      };

    case "ON_SELECTED_DAY":
      return {
        ...state,
        selectedDate: action.Day,
      };

    case "ON_SELECT_SLOT":
      let selectedSlot = state.selectedGame.slots
        .filter((it) => it.slotStatus !== "btn btn-danger")
        .find((it) => it.id === action.id);
      return {
        ...state,
        slotBooked:
          (selectedSlot &&
            selectedSlot.id !== state.slotBooked?.id && {
              ...selectedSlot,
              slotStatus: "btn btn-primary",
            }) ||
          undefined,
      };

    case "CHECK_BOOKING":
      return {
        ...state,
        bookingCheck: [
          ...state.details.filter((it) =>
            it.bookingId.includes(action.payload)
          ),
        ],
      };

    default:
      return state;
  }
};
export default bookNowReducer;
