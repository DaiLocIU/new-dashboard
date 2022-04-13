export function updateCurrentActive(context, value) {
  const { commit } = context;
  commit('UPDATE_CURRENT_ACTIVE', value);
}

export function initSidebar(context) {
  const { commit } = context;
  commit('INIT_SIDEBAR');
}

export function initSidebarAdmin(context) {
  const { commit } = context;
  commit('INIT_SIDEBAR_ADMIN');
}

export function initSidebarBottom(context) {
  const { commit } = context;
  commit('INIT_SIDEBAR_ADMIN');
}
