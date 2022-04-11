export function updateCurrentActive(context, value) {
  const { commit } = context;
  commit('UPDATE_CURRENT_ACTIVE', value);
}
