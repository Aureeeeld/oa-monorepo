import { openLoginPopup } from "./loginUtils";

// * Actions
const LOGIN_PENDING = "LOGIN_PENDING";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILED = "LOGIN_FAILED";
const LOGOUT = "LOGOUT";
const INIT_POPUP = "INIT_POPUP";
const CLOSE_POPUP = "CLOSE_POPUP";
const SET_DISCORD_ID = "SET_DISCORD_ID";

// * Default state
const DEFAULT_STATE = {
  discordId: undefined,
  isLoggedIn: false,
  isPending: false,
  loginPopup: null
};

// * Reducer
const loginReducer = (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {
    case LOGIN_PENDING:
      return { ...state, isPending: true };
    case LOGIN_SUCCESS:
      return { ...state, isLoggedIn: true, isPending: false };
    case LOGIN_FAILED:
      return { ...state, isPending: false, error: action.payload };
    case LOGOUT:
      return { ...state, isLoggedIn: false };
    case INIT_POPUP:
      return { ...state, loginPopup: action.payload };
    case CLOSE_POPUP:
      return { ...state, loginPopup: state.loginPopup.close() };
    case SET_DISCORD_ID:
      return { ...state, discordId: action.payload };
    default:
      return state;
  }
};

export default loginReducer;

// * Action creators
export const login = socket => dispatch => {
  dispatch({ type: LOGIN_PENDING });
  dispatch({ type: INIT_POPUP, payload: openLoginPopup(socket) });
};

export const logout = () => ({
  type: LOGOUT
});

export const closeAuth = user => dispatch => {
  dispatch({ type: SET_DISCORD_ID, payload: user.id });
  dispatch({ type: CLOSE_POPUP });
  dispatch({ type: LOGIN_SUCCESS });
};
