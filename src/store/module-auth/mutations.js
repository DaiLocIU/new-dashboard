import util from 'src/helpers/util';
import api from 'src/boot/api';

export function AUTH_SUCCESS(state, data) {
  state.user = data.user;
  state.role = data.role;
  state.token = data.token || data.jwt;
  util.setLocalStorage('token', state.token, 7);
  util.setLocalStorage('user', JSON.stringify(data.user), 7);
  util.setLocalStorage('role', JSON.stringify(data.role), 7);
  api.setHeaders({
    Authorization: `Bearer ${state.token}`,
  });
}
