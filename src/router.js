import store from './store'
import VueRouter from 'vue-router'

const routes = [
  {
    path: "/login",
    name: "loginPage",
    meta: {
      authFree: true
    },
    // 페이지를 한번에 로딩하지 않고, 각 로딩한 페이지만 가지고 오는 것 -> 코드 스플리팅
    component: () => import('./views/Login')
  },
  {
    // 위의 url 이외에 접근을 시도할 때, 가장 위에 있는 것이 좋다!
    path: "*",
    component: () => import('./views/NotFoundPage')
  },
  {
    path: "/posts",
    name: "listpage",
    component: () => import('./views/PostList')
  },
  {
    path: "/posts/create",
    name: "createpage",
    component: () => import('./views/PostCreate')
  },
  {
    path: "/posts/:id",
    name: "postDetail",
    component: () => import('./views/PostCreate')
  },
]

const router = new VueRouter({
  mode: 'history',
  hashbang: false,
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const ignoreAuth = to.matched.some(r => r.meta.authFree)
  if (ignoreAuth) return next()

  store.dispatch('CHECK_AUTH').then(() => {
    next()
  })
})

export default router
