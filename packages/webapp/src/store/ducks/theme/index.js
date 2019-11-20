// * Actions
const SWAP_THEME_MODE = "theme/SWAP_THEME_MODE";

// * Default state
const DEFAULT_STATE = {
  mode: "light"
};

// * Reducer
const themeReducer = (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {
    case SWAP_THEME_MODE:
      return state.mode === "light"
        ? { ...state, mode: "dark" }
        : { ...state, mode: "light" };
    default:
      return state;
  }
};

export default themeReducer;

// * Action creators
export const swapThemeMode = () => ({
  type: SWAP_THEME_MODE
});
