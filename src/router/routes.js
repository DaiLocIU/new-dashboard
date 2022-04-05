function evaluateGuards(guards, to, from, next, store) {
  const guardsLeft = guards.slice(0);
  const nextGuard = guardsLeft.shift();
  if (nextGuard === undefined) {
    next();
    return;
  }
  nextGuard(to, from, (nextArg) => {
    if (nextArg === undefined) {
      evaluateGuards(guardsLeft, to, from, next, store);
      return;
    }
    next(nextArg);
  }, store);
}

function multiGuard(guards, store) {
  return (to, from, next) => evaluateGuards(guards, to, from, next, store);
}

async function authToken(to, from, next, store) {
  const { token } = store.state.auth;
  const { role } = store.state.auth;
  if (!token || !role) {
    return next({
      name: 'RegisterPage',
    });
  }

  return next();
}

async function checkHasLogin(to, from, next, store) {
  const { token } = store.state.auth;
  const { role } = store.state.auth;
  if (!token || !role) {
    return next();
  }

  if (from.name === 'IndexPage') {
    return location.reload();
  }
  return next({
    name: 'IndexPage',
  });
}

const routes = (store) => [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'IndexPage',
        component: () => import('pages/IndexPage.vue'),
        beforeEnter: multiGuard([authToken], store),
      },
    ],
  },
  {
    path: '/pages',
    component: () => import('layouts/FullPage.vue'),
    children: [
      {
        path: 'register',
        name: 'RegisterPage',
        component: () => import('pages/Register/Register.vue'),
        beforeEnter: multiGuard([checkHasLogin], store),
      },
    ],
  },
  {
    path: '/pages',
    component: () => import('layouts/FullPage.vue'),
    children: [
      {
        path: 'login',
        component: () => import('pages/Login/Login.vue'),
        beforeEnter: multiGuard([checkHasLogin], store),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default (store) => routes(store);
