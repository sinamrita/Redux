import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
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
import { Games } from "../pages/home";

configure({ adapter: new Adapter() });

const mockStore = configureStore([]);
describe("Home component", () => {
  const historyMock = { push: jest.fn() };
  const mockfn1 = jest.fn();
  const mockfn2 = jest.fn();
  const mockfn3 = jest.fn();
  let store;
  let component;
  afterEach(() => {
    jest.clearAllMocks();
  });
  beforeEach(() => {
    const Games1 = [
      { id: 0, src: BasketBall, name: "BasketBall", slots: bookSlot1 },
      { id: 1, src: VolleyBall, name: "VolleyBall", slots: bookSlot2 },
      { id: 2, src: cricket, name: "Cricket", slots: bookSlot3 },
      { id: 3, src: FootBall, name: "FootBall", slots: bookSlot4 },
    ];
    component = shallow(
      <Games
        Games={Games1}
        selectGame={mockfn3}
        getGameAndBooking={mockfn1}
        history={historyMock}
        postDate={mockfn2}
      />
    );
  });
  it("DidMount", () => {
    expect(mockfn1).toHaveBeenCalledTimes(1);
    expect(mockfn2).toHaveBeenCalledTimes(1);
  });
  it("play zone content", () => {
    expect(component.find("header").length).toBe(1);
    expect(component.find("header").text()).toEqual("Play Zone");
    expect(component.find(".card").length).toBe(4);
    const align = component.find("center").at(1).find("div").find("button");
    expect(align.render().text()).toBe("Check your booking");
    expect(component.find("header").childAt(0).length).toBe(1);
  });
  it("card content", () => {
    const Cards = component.find(".card");
    const Product = Cards.find("ul").map((child) => child.text());
    expect(Product).toEqual([
      "BasketBallBook Now",
      "VolleyBallBook Now",
      "CricketBook Now",
      "FootBallBook Now",
    ]);
  });
  it("BookNow Click", () => {
    const spy = jest.spyOn(component.instance(), "handleBook");
    const BookNow_Btn = component
      .find("center")
      .at(0)
      .find("div")
      .find("button")
      .at(1);
    BookNow_Btn.simulate("click");
    expect(spy).toHaveBeenCalled();
    expect(mockfn3).toHaveBeenCalledTimes(1);
  });
  it("On Clicking Book Now", () => {
    const spy = jest.spyOn(component.instance(), "handleSearch");
    const check_btn = component.find("center").at(1).find("div").find("button");
    check_btn.simulate("click");
    expect(spy).toHaveBeenCalled();
  });
});
