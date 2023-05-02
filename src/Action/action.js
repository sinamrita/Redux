export const selectGame = (id) => {
  return {
    type: "SELECT_GAME",
    id,
  };
};

export const onSelectedDay = (Day) => {
  return {
    type: "ON_SELECTED_DAY",
    Day,
  };
};
export const doneBooking = (Day) => {
  return {
    type: "DONE_BOOKING",
    Day,
  };
};
export const iconClick = () => {
  return {
    type: "ICON_CLICK",
  };
};
export const selectSlot = (id) => {
  return {
    type: "ON_SELECT_SLOT",
    id,
  };
};

export const onCLICK = () => {
  return {
    type: "on_CLICK",
  };
};

export const checkBooking = (payload) => {
  return {
    type: "CHECK_BOOKING",
    payload,
  };
};
