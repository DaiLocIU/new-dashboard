const util = {
  prefix: 'woay_',
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

  getLocalStorage(name) {
    const cname = this.prefix + name;
    const str = localStorage.getItem(cname);
    if (!str) return null;
    const wrap = JSON.parse(str);
    if (!wrap.exp || new Date(wrap.exp) < new Date()) {
      localStorage.removeItem(cname);
      return null;
    }
    return wrap.value;
  },

  setLocalStorage(name, value, exdays = 7) {
    const d = new Date();
    const cname = this.prefix + name;
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    localStorage.setItem(cname, JSON.stringify({
      exp: d,
      value,
    }));
  },
  getCookie(name) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i += 1) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
};

export default util;
