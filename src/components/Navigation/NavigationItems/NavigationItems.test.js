import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { NavigationItems } from "./NavigationItems";

configure({ adapter: new Adapter() });

describe("<NavigationItems />", () => {
  it("should render two <NavigationItem /> elements if not logged in", () => {
    const wrapper = shallow(<NavigationItems />);
    expect(wrapper.find("li")).toHaveLength(2);
  });
});
