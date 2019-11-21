import theme, { swapThemeMode } from "./index";

const DEFAULT_STATE = {
  mode: "light"
};

describe("Theme store action", () => {
  it("should create SWAP_THEME_MODE", () => {
    const expectedAction = {
      type: "theme/SWAP_THEME_MODE"
    };
    expect(swapThemeMode()).toEqual(expectedAction);
  });
});

describe("Theme store reducer", () => {
  it("should return the initial state", () => {
    expect(theme(undefined, {})).toEqual(DEFAULT_STATE);
  });

  it("should handle SWAP_THEME_MODE", () => {
    expect(
      theme(DEFAULT_STATE, {
        type: "theme/SWAP_THEME_MODE"
      })
    ).toEqual({
      mode: "dark"
    });
  });
});
