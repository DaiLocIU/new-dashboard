export function isLogged(state) {
  return !!state.auth.user;
}
