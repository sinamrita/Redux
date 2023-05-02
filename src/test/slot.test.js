import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import configureStore from "redux-mock-store";
import Slots from "../Component/slot";
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

configure({ adapter: new Adapter() });

const mockStore = configureStore([]);
describe("Slot component", () => {
  const mockfn1 = jest.fn();
  let store;
  let component;
  beforeEach(() => {
    store = mockStore({
      Games: [
        { id: 0, src: BasketBall, name: "BasketBall", slots: bookSlot1 },
        { id: 1, src: VolleyBall, name: "VolleyBall", slots: bookSlot2 },
        { id: 2, src: cricket, name: "Cricket", slots: bookSlot3 },
        { id: 3, src: FootBall, name: "FootBall", slots: bookSlot4 },
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
            startTime: "11.00 A.M",
            endTime: "12.00 P.M",
            slotStatus: "btn btn-success",
          },
          {
            id: 4,
            startTime: "12.00 P.M",
            endTime: "01.00 P.M",
            slotStatus: "btn btn-success",
          },
          {
            id: 5,
            startTime: "01.00 P.M",
            endTime: "02.00 P.M",
            slotStatus: "btn btn-success",
          },
          {
            id: 6,
            startTime: "02.00 P.M",
            endTime: "03.00 P.M",
            slotStatus: "btn btn-success",
          },
          {
            id: 7,
            startTime: "03.00 P.M",
            endTime: "04.00 P.M",
            slotStatus: "btn btn-success",
          },
          {
            id: 8,
            startTime: "04.00 P.M",
            endTime: "05.00 P.M",
            slotStatus: "btn btn-success",
          },
          {
            id: 9,
            startTime: "05.00 P.M",
            endTime: "06.00 P.M",
            slotStatus: "btn btn-success",
          },
        ],
      },
      selectedDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 1
      ),
      slotBooked: [],
      details: [],
    });
    component = shallow(<Slots store={store} Select_Slot={mockfn1} />)
      .childAt(0)
      .dive();
  });
  it("Slot Content", () => {
    let slot = component.find(".slot_list");
    const Product = slot.find("h4").map((child) => child.text());
    expect(Product).toEqual([
      "09.00 A.M - 10.00 A.M",
      "10.00 A.M - 11.00 A.M",
      "11.00 A.M - 12.00 P.M",
      "12.00 P.M - 01.00 P.M",
      "01.00 P.M - 02.00 P.M",
      "02.00 P.M - 03.00 P.M",
      "03.00 P.M - 04.00 P.M",
      "04.00 P.M - 05.00 P.M",
      "05.00 P.M - 06.00 P.M",
    ]);
  });
  it("handle_Slot", () => {
    const spy = jest.spyOn(component.instance(), "handleSlot");
    let slot = component.find(".slot_list").find("h4").find("span").at(3);
    slot.simulate("click");
    expect(spy).toBeCalledTimes(1);
  });
});
