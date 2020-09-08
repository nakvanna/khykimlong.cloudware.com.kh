import {LocalStorage} from "quasar";

export default ({router}) => {
  router.beforeEach((to, from, next) => {
    let token = LocalStorage.getItem("userInfo") || '';
    console.log(token)
    if (!token && to.path !== '/login') {
      next('/login');
    } else {
      next()
    }
    if (token && to.path === '/login') {
      next('/');
    }
    if (token) {
      if (token.user_info.user_type !== 0 && to.path === '/user/manager') {
        next('/')
      }
    }
  });
}
