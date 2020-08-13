import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Auth } from "./Auth";

configure({ adapter: new Adapter() });

describe("<Auth />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Auth />);
  });

  it("should be created", () => {
    expect(wrapper).toBeTruthy();
  });

  it("should render two <form> elements if unauthorized", () => {
    expect(wrapper.find("form")).toHaveLength(1);
  });
});
