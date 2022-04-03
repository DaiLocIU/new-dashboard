const util = {
  getEnv(key) {
    let { origin } = window.location;
    if (origin.includes('localhost') || origin.includes('192.168')) {
      origin = 'https://sprout.woay.io';
    }

    const defaultEnv = {
      VUE_APP_API_BASE_URL: origin,
      VUE_APP_BASE_URL: `${origin}/dashboard`,
      VUE_APP_DOMAIN: origin,
      VUE_APP_IP_SERVER: '172.104.46.180',
    };

    const val = (window.ENV && window.ENV[key]) || defaultEnv[key];
    return val || '';
  },
};

export default util;
