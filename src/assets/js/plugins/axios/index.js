// 引入axios
// import axios from 'axios'
// import TrunkConst from './constant.js'

import Vue from "vue";
import axios from "axios";
// import { Message } from "iview";
import { Message } from "element-ui";
import qs from "qs";
import commonParams from "./constant.js";
let cancel,
  promiseArr = {};
let errorCount = 0;
const CancelToken = axios.CancelToken;

let TOKEN = sessionStorage.getItem("token");
// 创建axios默认请求
const service = axios.create({
  // baseURL: "https://testpm.haiercash.com:9002/",
  // baseURL: commonParams.docIP,//
  baseURL: commonParams.baseIP,
  timeout: 10000, // request timeout,
  headers: commonParams.globalHeader
});

// 请求拦截
service.interceptors.request.use(
  config => {
    if (errorCount > 3) {
      alert("网络异常，请检查网络连接或刷新重试");
      return false;
    }
    if (!commonParams.noToken.includes(config.url)) {
      if (TOKEN) {
        config.headers = Object.assign({}, commonParams.globalHeader, {
          Authorization: "Bearer " + TOKEN,
          access_token: TOKEN
        });
      } else {
        alert("请先获取token");
      }
    }
    // 为了防止重复请求ajax
    if (promiseArr[config.url]) {
      promiseArr[config.url]("操作取消");
      promiseArr[config.url] = cancel;
    } else {
      promiseArr[config.url] = cancel;
    }
    // 拼接公共参数
    // console.log(config.params, "config.params");
    // config.params = Object.assign({}, commonParams, config.params);

    //当为传统接收方式post的时候对参数进行序列化
    // if (config.method === "put" || config.method === "delete") {
    //   // 序列化
    //   config.headers = {
    //     "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" //当post的时候请求头需要序列化
    //   };
    //   config.data = qs.stringify(config.data);
    // }
    // 是否携带cookie不知
    // if (TOKEN) {
    // //   config.headers["Token"] = getToken(); // 让每个请求携带token-- ['Token']为自定义key 请根据实际情况自行修改
    //   config.headers["Token"] = TOKEN; // 让每个请求携带token-- ['Token']为自定义key 请根据实际情况自行修改
    // }
    return config;
  },
  error => {
    // Do something with request error
    // console.log(error); // for debug
    // console.log(Promise.reject(error));
    return Promise.reject(error);
  }
);
// 响应拦截
service.interceptors.response.use(
  response => {
    // console.log(response,"response")
    if (response.data.head.retFlag == "00000") {
      //服务端定义的响应成功的code码为00000
      return Promise.resolve(response); //使用Promise.resolve 正常响应
    } else if (response.data.head.retFlag  === 1401) {
      //服务端定义的响应code码为401时为未传token
      Message({
        message: "未登录"
      });
      // router.push('/login')
      return Promise.reject(response); //使用Promise.reject 抛出错误和异常
    } else {
      return Promise.reject(response);
    }
    // return response;
  },
  error => {
    errorCount++;
    // console.log(error, "error");
    // console.log(error.response, "error.response");
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          Message = "请求错误";
          break;
        case 401:
          // router.push({
          //     path: "/login"
          // });
          error.response.statusText = "未授权，请重新登录";
          break;
        case 403:
          Message = "拒绝访问";
          break;
        case 404:
          error.response.statusText = "请求错误,未找到该资源";
          Message({
            //  饿了么的消息弹窗组件,类似toast
            showClose: true,
            message: error.response.statusText,
            type: "error",
            center: true
          });
          break;
        case 408:
          Message = "请求超时";
          break;
        case 500:
          Message = "服务器内部错误";
          break;
        case 501:
          Message = "服务未实现";
          break;
        case 502:
          // Message = '网关错误'
          // break
          console.log(Vue.prototype);
          console.log(error.response, "error.response");
          error.response.statusText = "网络通讯异常";
          Vue.prototype.$Message.config({
            top: 50,
            duration: 3
          });
          // Message({
          //   //  饿了么的消息弹窗组件,类似toast
          //   showClose: true,
          //   message: error.response.statusText,
          //   type: "error",
          //   center: true
          // });
          break;
        case 503:
          Message = "服务不可用";
          break;
        case 504:
          Message = "网关超时";
          break;
        case 505:
          Message = "HTTP版本不受支持";
          break;
      }
    } else {
      error.response.statusText = "连接到服务器失败";
    }
    errorCount = 0;
    return Promise.reject(error);
  }
);
export default {
  //get请求
  get(url, param) {
    return new Promise((resolve, reject) => {
      service({
        method: "get",
        url,
        params: param,
        // 取消请求函数创建
        cancelToken: new CancelToken(c => {
          cancel = c;
        })
      })
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  //   put请求
  put(url, param) {
    return new Promise((resolve, reject) => {
      //   axios({
      //       method:'put',
      //       url,
      //       data:param,
      //       cancelToken:new CancelToken(c=>{
      //           cancel=c
      //       })
      //   })
      service
        .put(
          url,
          param,
          // 取消请求函数创建
          {
            cancelToken: new CancelToken(c => {
              cancel = c;
            })
          }
        )
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  //post请求
  post(url, param) {
    return new Promise((resolve, reject) => {
      service
        .post(
          url,
          param,
          // 取消请求函数创建
          {
            cancelToken: new CancelToken(c => {
              cancel = c;
            })
          }
        )
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
