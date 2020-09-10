import { REFRESH, SIGNOUT } from "./AuthActions";

export default (state, action) => {
  switch (action.type) {
    case REFRESH:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case SIGNOUT:
      return {
        ...state,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};
