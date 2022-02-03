import Vue from 'vue'
import router from '@/router'
import axios from 'axios'
import VueAxios from 'vue-axios'

const AUTH_TOKEN_KEY = 'token'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/'
})

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    // invalid authenticated
    if ([401, 403].includes(error.response.status)) {
      router.push({ name: 'loginPage' })
      return Promise.reject(error)
    }
  }
)
Vue.use(VueAxios, api)
