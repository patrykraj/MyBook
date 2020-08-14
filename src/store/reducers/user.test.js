import reducer from "./user";
import * as actions from "../constants";

describe("user reducer", () => {
  let initialState = {
    error: null,
    loading: false,
    token: null,
    userId: null,
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
      reducer(undefined, {
        type: actions.AUTH_SUCCESS,
        payload: {
          token: "token",
          userId: "user-id",
        },
      })
    ).toEqual({
      ...initialState,
      token: "token",
      userId: "user-id",
    });
  });

  it("should remove token and userid on logout", () => {
    expect(
      reducer(undefined, {
        type: actions.AUTH_LOGOUT,
      })
    ).toEqual(initialState);
  });

  it("should store error and stop loading on failure", () => {
    expect(
      reducer(undefined, {
        type: actions.AUTH_FAILURE,
        payload: "error",
      })
    ).toEqual({
      ...initialState,
      error: "error",
    });
  });

  it("should start loading and reset error on start", () => {
    expect(
      reducer(undefined, {
        type: actions.AUTH_START,
      })
    ).toEqual({
      ...initialState,
      loading: true,
    });
  });
});
