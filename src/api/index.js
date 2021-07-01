import axios from 'axios';
import Vue from 'vue';
import {Message, Loading} from 'element-ui';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

let loadingInstance;

api.interceptors.request.use(config => {
  let userInfo = JSON.parse(localStorage.getItem("userInfo"))
  if (userInfo && userInfo.token) {
    config.headers.AUTHORIZATION = userInfo.token
  }
  loadingInstance = Loading.service({
    fullscreen: true,
  });
  return config;
});

api.interceptors.response.use(res => {
  loadingInstance.close();
  return res.data;
}, error => {
  loadingInstance.close();
  Message.error({
    message: '系统错误，请联系管理员',
    duration: 2000,
    type: 'error',
  });
  console.log(error);
  return Promise.resolve(error.response);
});

Vue.prototype.$api = api;

export default api;
