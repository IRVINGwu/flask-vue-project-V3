import axios from "axios";
import { Toast, Dialog } from "vant";

axios.defaults.baseURL = "http://127.0.0.1:8080";

//设置超时
axios.defaults.timeout = 10000;

//发起请求之前提示一下
axios.interceptors.request.use(
  (config) => {
    Toast.loading({
      duration: 0,
      message: "加载中...",
      forbidClick: true,
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//得到response之后提示
axios.interceptors.response.use(
  (response) => {
    Toast.clear();
    return response;
  },
  (error) => {
    Toast.clear();
    Dialog.alert({
      title: "提示",
      message: "网络请求失败，反馈给客服",
    });
  }
);

//定义获取数据的函数
function axiosGet(url, data = "") {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url,
      params: data,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export default axiosGet;
