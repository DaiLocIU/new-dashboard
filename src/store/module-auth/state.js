import util from 'src/helpers/util';

export default function () {
  const token = util.getLocalStorage('token') || '';
  const role = (util.getLocalStorage('role') && JSON.parse(util.getLocalStorage('role'))) || '';
  const user = (util.getLocalStorage('user') && JSON.parse(util.getLocalStorage('user'))) || {};

  return {
    user,
    token,
    role,
  };
}
