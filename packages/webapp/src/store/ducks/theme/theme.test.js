import theme, { setThemeMode } from "./index";

const DEFAULT_STATE = {
  mode: "light"
};

describe("Theme store action", () => {
  it("should create CHANGE_THEME_MODE", () => {
    const text = "dark";
    const expectedAction = {
      type: "CHANGE_THEME_MODE",
      payload: text
    };
    expect(setThemeMode(text)).toEqual(expectedAction);
  });
});

describe("Theme store reducer", () => {
  it("should return the initial state", () => {
    expect(theme(undefined, {})).toEqual(DEFAULT_STATE);
  });

  it("should handle CHANGE_THEME_MODE", () => {
    const text = "dark";
    expect(
      theme(DEFAULT_STATE, {
        type: "CHANGE_THEME_MODE",
        payload: text
      })
    ).toEqual({
      mode: text
    });
  });
});
