import api from 'src/boot/api';

export async function register(context, payload) {
  console.log('register --- payload', payload);
  await api.register(payload);
}
export async function login(context, payload) {
  const { commit } = context;
  const { data } = await api.loginWithEmail(payload);
  commit('AUTH_SUCCESS', data);
}
