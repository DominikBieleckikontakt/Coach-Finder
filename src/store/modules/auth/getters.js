export default {
  userId(state) {
    return state.userId;
  },
  token(state) {
    return state.token;
  },
  isAuthenticated(state) {
    return state.token !== null && state.token !== undefined;
  },
  didAutoLogout(state) {
    return state.didAutoLogout;
  },
};
