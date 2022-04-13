import sidebar from './sidebar';

export function UPDATE_CURRENT_ACTIVE(state, value) {
  console.log('updateCurrentActive', value);
  state.currentActive = value;
}

export function INIT_SIDEBAR(state) {
  state.sidebar = sidebar;
}
