import reducer from "./user";
import * as actions from "../constants";

describe("user reducer", () => {
  let initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
  };

  beforeEach(() => {
    reducer(
      {
        token: null,
        userId: null,
        error: null,
        loading: false,
      },
      {
        type: null,
      }
    );
  });

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should store the token upon login", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
        },
        {
          type: actions.AUTH_SUCCESS,
          payload: {
            token: "token",
            userId: "user-id",
          },
        }
      )
    ).toEqual({
      token: "token",
      userId: "user-id",
      error: null,
      loading: false,
    });
  });
});
