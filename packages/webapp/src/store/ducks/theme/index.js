// * Actions
const CHANGE_THEME_MODE = "CHANGE_THEME_MODE";

// * Default state
const DEFAULT_STATE = {
  mode: "light"
};

// * Reducer
const themeReducer = (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {
    case CHANGE_THEME_MODE:
      return { ...state, mode: action.payload };
    default:
      return state;
  }
};

export default themeReducer;

// * Action creators
export const setThemeMode = text => ({
  type: CHANGE_THEME_MODE,
  payload: text
});
