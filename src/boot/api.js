import axios from 'axios';
import util from 'src/helpers/util';

axios.defaults.withCredentials = false;
const prefix = util.getEnv(VUE_APP_API_BASE_URL);
const token = util.getLocalStorage('token') || util.getCookie('token');
let client = axios.create({
  withCredentials: false,
  baseURL: prefix,
  timeout: 10 * 60 * 1000,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const api = {
  get(url) {
    return new Promise((resolve, reject) => {
      try {
        client.get(prefix + url, {}).then((resp) => {
          const { data } = resp;
          if (!data.error) {
            resolve(resp);
          } else {
            reject(data.error);
          }
        }).catch((error) => {
          if (error.response.data) {
            if (error.response.data.error) {
              return reject(error.response.data.error);
            }
            return reject(new Error(error.response.data.message));
          }
          return reject(error);
        });
      } catch (e) {
        reject(e);
      }
    });
  },
  getNoRejectError(url) {
    return new Promise((resolve, reject) => {
      try {
        client.get(prefix + url, {}).then((resp) => {
          const { data } = resp;
          if (!data.error) {
            resolve(resp);
          } else {
            reject(data.error);
          }
        }).catch((error) => {
          if (error.response && error.response.data) {
            if (error.response.data.error) {
              return reject(error.response.data.error);
            }
            return reject(error.response.data.message);
          }
          return reject(error);
        });
      } catch (e) {
        reject(e);
      }
    });
  },
  post(url, dataPost) {
    return new Promise((resolve, reject) => {
      try {
        client.post(prefix + url, dataPost).then((resp) => {
          const { data } = resp;
          if (!data.error) {
            resolve(resp);
          } else {
            reject(data.error);
          }
        }).catch((error) => {
          if (error.response.data) {
            if (error.response.data.error) {
              return reject(new Error(error.response.data.error.message));
            }
            return reject(new Error(error.response.data.message));
          }
          return reject(error);
        });
      } catch (e) {
        reject(e);
      }
    });
  },
  put(url, dataPut) {
    return new Promise((resolve, reject) => {
      try {
        client.put(prefix + url, dataPut).then((resp) => {
          const { data } = resp;
          if (!data.error) {
            resolve(resp);
          } else {
            reject(data.error);
          }
        }).catch((error) => {
          if (error.response.data) {
            if (error.response.data.error) {
              return reject(new Error(error.response.data.error.message));
            }
            return reject(new Error(error.response.data.message));
          }
          return reject(error);
        });
      } catch (e) {
        reject(e);
      }
    });
  },
  delete(url, dataDelete) {
    return new Promise((resolve, reject) => {
      try {
        client.delete(prefix + url, {
          dataDelete,
        }).then((resp) => {
          const { data } = resp;
          if (!data.error) {
            resolve(resp);
          } else {
            reject(data.error);
          }
        }).catch((error) => {
          if (error.response.data) {
            if (error.response.data.error) {
              return reject(new Error(error.response.data.error.message));
            }
            return reject(new Error(error.response.data.message));
          }
          return reject(error);
        });
      } catch (e) {
        reject(e);
      }
    });
  },
  postForm(url, formData) {
    return new Promise((resolve, reject) => {
      try {
        return client.post(url, formData, {
          // todo: check header will be merged or overrided with
          // header set by setHeaders function !?
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then((resp) => {
          const { data } = resp;
          if (!data.error) {
            resolve(resp);
          } else {
            reject(data.error);
          }
        }).catch((error) => {
          if (error.response.data) {
            if (error.response.data.error) {
              return reject(new Error(error.response.data.error.message));
            }
            return reject(new Error(error.response.data.message));
          }
          return reject(error);
        });
      } catch (e) {
        reject(e);
      }
    });
  },
  setHeaders(object) {
    client = axios.create({
      baseURL: prefix,
      timeout: 10 * 60 * 1000,
      headers: object,
    });
  },
};
async function register(payload) {
  const resp = await api.post('/api.user/email/signup', payload);

  return resp;
}

async function loginWithEmail(payload) {
  const resp = await api.post('/api.user/email/login', payload);
  return resp.data;
}
export default {
  ...api,
  register,
  loginWithEmail,
};
