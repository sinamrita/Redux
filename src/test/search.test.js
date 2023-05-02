import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import configureStore from "redux-mock-store";
import { Search_Booking } from "../pages/search_booking";
configure({ adapter: new Adapter() });

const mockStore = configureStore([]);

describe("Search Page", () => {
  const historyMock = { push: jest.fn() };
  const mockfn1 = jest.fn();
  let store;
  let emptyDetail;
  let component;
  let emptyCheck;
  let noResult;
  beforeEach(() => {
    const Details = [
      {
        bookingId: "92303869",
        contact: "9876443111",
        game: "BasketBall",
        name: "Roger",
        slot: {
          id: 4,
          startTime: "12.00 P.M",
          endTime: "01.00 P.M",
          slotStatus: "btn btn-success",
        },
      },
      {
        bookingId: "14440074",
        contact: "9867844311",
        game: "FootBall",
        name: "shelly",
        slot: {
          id: 3,
          startTime: "11.00 A.M",
          endTime: "12.00 P.M",
          slotStatus: "btn btn-success",
        },
      },
    ];

    component = shallow(
      <Search_Booking
        details={Details}
        check={mockfn1}
        history={historyMock}
        getGameAndBooking={mockfn1}
      />
    );
  });
  it("DidMount", () => {
    expect(mockfn1).toHaveBeenCalledTimes(1);
  });
  it("Search page Content", () => {
    expect(component.find("header").length).toBe(1);
    expect(component.find("header").childAt(0).length).toBe(1);
    expect(component.find("header").text()).toEqual("Play Zone");
    component.find("header").find("img").simulate("click");
    expect(historyMock.push.mock.calls[0]).toEqual(["/"]);
    expect(component.find("span").find(".Search").length).toBe(1);
  });
  it("empty search field", () => {
    const tbody = component.find("table tbody");
    component
      .find(".Search")
      .simulate("change", { target: { name: "Search", value: "" } });
    expect(component.state().Search).toEqual(undefined);
    const table_body1 = tbody.find("tr").map((child) => child.render().text());
    expect(table_body1).toEqual([
      "92303869Roger9876443111BasketBall12.00 P.M-01.00 P.M",
      "14440074shelly9867844311FootBall11.00 A.M-12.00 P.M",
    ]);
  });
  it("table content after booking happend", () => {
    const thead = component.find("table thead");
    const table_header = thead.find("tr").map((child) => child.text());
    expect(table_header).toEqual([
      "Booking IDSlot DateNameContact NoGameSlots",
    ]);
    const tbody = component.find("table tbody");
    const table_body = tbody.find("tr").map((child) => child.render().text());
    expect(table_body).toEqual([
      "92303869Roger9876443111BasketBall12.00 P.M-01.00 P.M",
      "14440074shelly9867844311FootBall11.00 A.M-12.00 P.M",
    ]);
  });
  it("no booking", () => {
    const emptyDetail = [];
    const wrapper = shallow(
      <Search_Booking
        details={emptyDetail}
        check={mockfn1}
        getGameAndBooking={mockfn1}
      />
    );
    const thead = wrapper.find("table thead");
    const table_header = thead.find("tr").map((child) => child.text());
    expect(table_header).toEqual([
      "Booking IDSlot DateNameContact NoGameSlots",
    ]);
    const msg = wrapper.find("p");
    expect(msg.text()).toBe("No Booking happend yet");
  });
  it("search function", () => {
    const Booking_Check1 = [
      {
        bookingId: "14440074",
        contact: "9867844311",
        game: "FootBall",
        name: "shelly",
        slot: {
          id: 3,
          startTime: "11.00 A.M",
          endTime: "12.00 P.M",
          slotStatus: "btn btn-success",
        },
      },
    ];
    const Details1 = [
      {
        bookingId: "92303869",
        contact: "9876443111",
        game: "BasketBall",
        name: "Roger",
        slot: {
          id: 4,
          startTime: "12.00 P.M",
          endTime: "01.00 P.M",
          slotStatus: "btn btn-success",
        },
      },
      {
        bookingId: "14440074",
        contact: "9867844311",
        game: "FootBall",
        name: "shelly",
        slot: {
          id: 3,
          startTime: "11.00 A.M",
          endTime: "12.00 P.M",
          slotStatus: "btn btn-success",
        },
      },
    ];

    const component = shallow(
      <Search_Booking
        details={Details1}
        checkBooking={Booking_Check1}
        check={mockfn1}
        getGameAndBooking={mockfn1}
      />
    );

    component
      .find(".Search")
      .simulate("change", { target: { name: "Search", value: "14440074" } });
    expect(component.state().Search).toEqual("14440074");
    const thead = component.find("table thead");
    const table_header = thead.find("tr").map((child) => child.text());
    expect(table_header).toEqual([
      "Booking IDSlot DateNameContact NoGameSlots",
    ]);
    const tbody = component.find("table tbody");
    const table_body = tbody.find("tr").map((child) => child.render().text());
    expect(table_body).toEqual([
      "14440074shelly9867844311FootBall11.00 A.M-12.00 P.M",
    ]);
  });
  it("no result found", () => {
    const Booking_Check2 = [];
    const Details2 = [
      {
        bookingId: "92303869",
        contact: "9876443111",
        game: "BasketBall",
        name: "Roger",
        slot: {
          id: 3,
          startTime: "11.00 A.M",
          endTime: "12.00 P.M",
          slotStatus: "btn btn-success",
        },
      },
      {
        bookingId: "14440074",
        contact: "9867844311",
        game: "FootBall",
        name: "shelly",
        slot: {
          id: 4,
          startTime: "12.00 P.M",
          endTime: "01.00 P.M",
          slotStatus: "btn btn-success",
        },
      },
    ];
    const component = shallow(
      <Search_Booking
        details={Details2}
        checkBooking={Booking_Check2}
        check={mockfn1}
        getGameAndBooking={mockfn1}
      />
    );

    component
      .find(".Search")
      .simulate("change", { target: { name: "Search", value: "222" } });
    expect(component.state().Search).toEqual("222");
    const thead = component.find("table thead");
    const table_header = thead.find("tr").map((child) => child.text());
    expect(table_header).toEqual([
      "Booking IDSlot DateNameContact NoGameSlots",
    ]);
    const msg = component.find("p");
    expect(msg.text()).toBe("No Booking Found");
  });
});
