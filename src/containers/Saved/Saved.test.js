import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Saved } from "./Saved";
import Books from "../../components/Books/Books";

configure({ adapter: new Adapter() });

describe("<Saved />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Saved />);
  });

  it("should not render Books component if not added any", () => {
    expect(wrapper.find(Books)).toHaveLength(0);
  });
});
