import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { DayPicker } from "react-day-picker";
import configureStore from "redux-mock-store";
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
import { Booking } from "../pages/book";

configure({ adapter: new Adapter() });

const mockStore = configureStore([]);
describe("Book page", () => {
  const historyMock = { push: jest.fn() };
  const mockfn1 = jest.fn();
  const mockfn2 = jest.fn();
  window.alert = jest.fn();
  let store;
  let component;
  let error;
  let Dates;
  let Closed;

  beforeEach(() => {
    const Games1 = [
      { id: 0, src: BasketBall, name: "BasketBall", slots: bookSlot1 },
      { id: 1, src: VolleyBall, name: "VolleyBall", slots: bookSlot2 },
      { id: 2, src: cricket, name: "Cricket", slots: bookSlot3 },
      { id: 3, src: FootBall, name: "FootBall", slots: bookSlot4 },
    ];
    const selectedGame1 = [
      { id: 1, src: VolleyBall, name: "VolleyBall", slots: bookSlot2 },
    ];
    const selectedDate1 = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + 1
    );
    const slotBooked1 = undefined;
    component = shallow(
      <Booking
        game={Games1}
        selectedGame={selectedGame1}
        selectedDate={selectedDate1}
        slotBooked={slotBooked1}
        onSelectedDay={mockfn1}
        bookingDetails={mockfn1}
        iconClick={mockfn1}
        history={historyMock}
        doneBooking={mockfn1}
      />
    );
  });
  it("Book Content", () => {
    const Date_display =
      new Date().getDate() +
      1 +
      "/" +
      (new Date().getMonth() + 1) +
      "/" +
      new Date().getFullYear();
    expect(component.find("header").length).toBe(1);
    expect(component.find("header").childAt(0).length).toBe(1);
    expect(component.find("header").find("p").length).toBe(1);
    expect(component.find("header").text()).toBe(
      "Play Zone:Slot Date:" + Date_display
    );
    expect(component.find(".card").length).toBe(1);
    expect(component.find("#book_button")).toBeTruthy();
    component.find("header").find("img").simulate("click");
    expect(historyMock.push.mock.calls[0]).toEqual(["/"]);
    expect(component.find("#date").find(DayPicker).length).toBe(1);
  });
  it("input fields", () => {
    expect(component.find("#contact").length).toBe(2);
    component
      .find("#contact")
      .at(0)
      .simulate("change", { target: { name: "name", value: "anu" } });
    expect(component.state().name).toEqual("anu");
    component
      .find("#contact")
      .at(1)
      .simulate("change", { target: { name: "contact", value: "9890900001" } });
    expect(component.state().contact).toEqual("9890900001");
    component
      .find("#contact")
      .at(0)
      .simulate("change", { target: { name: "name", value: "" } });
    expect(component.state().name).toEqual("");
    component
      .find("#contact")
      .at(1)
      .simulate("change", { target: { name: "contact", value: "" } });
    expect(component.state().contact).toEqual("");
  });
  it("err msg: select your slot", () => {
    component.find("#book_button").simulate("Click");
    expect(component.state().errorStmt).toEqual("Select your slot!!!");
    component
      .find("#contact")
      .at(0)
      .simulate("change", { target: { name: "name", value: "anu" } });
    component
      .find("#contact")
      .at(1)
      .simulate("change", { target: { name: "contact", value: "9890900001" } });
    component.find("#book_button").simulate("Click");
    expect(component.state().errorStmt).toEqual("Select your slot!!!");
  });
  it("err msg check your field", () => {
    const Games2 = [
      { id: 0, src: BasketBall, name: "BasketBall", slots: bookSlot1 },
      { id: 1, src: VolleyBall, name: "VolleyBall", slots: bookSlot2 },
      { id: 2, src: cricket, name: "Cricket", slots: bookSlot3 },
      { id: 3, src: FootBall, name: "FootBall", slots: bookSlot4 },
    ];
    const selectedGame2 = {
      id: 1,
      src: VolleyBall,
      name: "VolleyBall",
      slots: [
        {
          id: 3,
          startTime: "11.00 A.M",
          endTime: "12.00 P.M",
          slotStatus: "btn btn-primary",
        },
        {
          id: 4,
          startTime: "12.00 P.M",
          endTime: "01.00 P.M",
          slotStatus: "btn btn-success",
        },
      ],
    };

    const selectedDate2 = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + 1
    );
    const slotBooked2 = [
      {
        id: 3,
        startTime: "11.00 A.M",
        endTime: "12.00 P.M",
        slotStatus: "btn btn-success",
      },
    ];
    const wrapper = shallow(
      <Booking
        game={Games2}
        selectedGame={selectedGame2}
        selectedDate={selectedDate2}
        slotBooked={slotBooked2}
        onSelectedDay={mockfn1}
        bookingDetails={mockfn2}
        iconClick={mockfn1}
        history={historyMock}
        doneBooking={mockfn1}
      />
    );

    wrapper.find("#book_button").simulate("Click");
    expect(wrapper.state().errorStmt).toEqual("Invalid Input!!!");
    wrapper
      .find("#contact")
      .at(0)
      .simulate("change", { target: { name: "name", value: "anu" } });
    wrapper.find("#book_button").simulate("Click");
    expect(wrapper.state().errorStmt).toEqual("Invalid Input!!!");
    wrapper
      .find("#contact")
      .at(1)
      .simulate("change", { target: { name: "contact", value: "9890" } });
    wrapper.find("#book_button").simulate("Click");
    expect(wrapper.state().errorStmt).toEqual("Invalid Input!!!");
    wrapper
      .find("#contact")
      .at(0)
      .simulate("change", { target: { name: "name", value: "987" } });
    wrapper
      .find("#contact")
      .at(0)
      .simulate("change", { target: { name: "contact", value: "9890980908" } });
    wrapper.find("#book_button").simulate("Click");
    expect(wrapper.state().errorStmt).toEqual("Invalid Input!!!");
    wrapper
      .find("#contact")
      .at(0)
      .simulate("change", { target: { name: "name", value: "anu" } });
    wrapper
      .find("#contact")
      .at(1)
      .simulate("change", { target: { name: "contact", value: "9890980908" } });
    wrapper.find("#book_button").simulate("Click");
    expect(wrapper.state().errorStmt).toEqual("");
    expect(mockfn1).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalled();
  });

  it("Display slot", () => {
    expect(component.find("Connect(Slots)").length).toBe(1);
  });
  it("Booking not opened", () => {
    const Games3 = [
      { id: 0, src: BasketBall, name: "BasketBall", slots: bookSlot1 },
      { id: 1, src: VolleyBall, name: "VolleyBall", slots: bookSlot2 },
      { id: 2, src: cricket, name: "Cricket", slots: bookSlot3 },
      { id: 3, src: FootBall, name: "FootBall", slots: bookSlot4 },
    ];
    const selectedGame3 = [
      { id: 1, src: VolleyBall, name: "VolleyBall", slots: bookSlot2 },
    ];
    const selectedDate3 = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + 2
    );
    const slotBooked3 = undefined;
    const wrapper = shallow(
      <Booking
        game={Games3}
        selectedGame={selectedGame3}
        selectedDate={selectedDate3}
        slotBooked={slotBooked3}
        onSelectedDay={mockfn1}
        bookingDetails={mockfn1}
        iconClick={mockfn1}
        history={historyMock}
        doneBooking={mockfn1}
      />
    );
    expect(wrapper.find("#not_opened").text()).toBe(
      "Booking is not opened yet"
    );
    expect(wrapper.find("Slots").length).toBe(0);
    expect(component.find("#date").find(DayPicker).length).toBe(1);
    expect(wrapper.find("#book_button").length).toBe(0);
  });
  it("Booking Closed", () => {
    const Games1 = [
      { id: 0, src: BasketBall, name: "BasketBall", slots: bookSlot1 },
      { id: 1, src: VolleyBall, name: "VolleyBall", slots: bookSlot2 },
      { id: 2, src: cricket, name: "Cricket", slots: bookSlot3 },
      { id: 3, src: FootBall, name: "FootBall", slots: bookSlot4 },
    ];
    const selectedGame1 = [
      { id: 1, src: VolleyBall, name: "VolleyBall", slots: bookSlot2 },
    ];
    const selectedDate1 = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );
    const slotBooked1 = undefined;
    const Date_display =
      new Date().getDate() +
      1 +
      "/" +
      (new Date().getMonth() + 1) +
      "/" +
      new Date().getFullYear();
    const wrapper = shallow(
      <Booking
        game={Games1}
        selectedGame={selectedGame1}
        selectedDate={selectedDate1}
        slotBooked={slotBooked1}
        onSelectedDay={mockfn1}
        iconClick={mockfn1}
        history={historyMock}
        doneBooking={mockfn1}
      />
    );

    expect(wrapper.find("#not_opened").render().text()).toBe(
      "Booking has been closed. Book your slot for" + Date_display
    );
    expect(wrapper.find("Slots").length).toBe(0);
    expect(wrapper.find("#date").find(DayPicker).length).toBe(1);
    expect(wrapper.find("#book_button").length).toBe(0);
  });
});
