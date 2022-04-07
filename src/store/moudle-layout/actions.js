export function updateWindowWidth(context, value) {
  const { commit } = context;
  commit('UPDATE_WINDOW_WIDTH', value);
}
