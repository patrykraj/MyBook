import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Search } from "./Search";
import Books from "../../components/Books/Books";

configure({ adapter: new Adapter() });

describe("<Search />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Search books={[]} searchedQuery={null} />);
  });

  it("should not render Books component if not searched", () => {
    wrapper.setProps({ books: undefined });
    expect(wrapper.find(Books)).toHaveLength(0);
  });

  it("should render Books component if found any books", () => {
    wrapper.setProps({ books: ["el"], searchedQuery: "query" });
    expect(wrapper.find(Books)).toHaveLength(1);
  });
});
