import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/vant.js";
import "./plugins/globalConfig.js";
import moment from "moment"
// 为什么导入filter.js文件不行呢？
// import "./filters/filter.js"

const app = createApp(App)
app.config.globalProperties.$filters = {
    formatContent(data) {
      if (data === null) {
        return "暂时未找到新闻内容";
      } else {
        return data.slice(3, 20);
      }
    },
    formatNumber(data) {
      if (data < 0) {
        return data.toString();
      } else if (data > 0) {
        return "+" + data;
      } else {
        return "+0";
      }
    },
    formatDate(data) {
      return moment(data).format("YYYY-MM-DD");
    },
  };

app
  .use(router)
  .mount("#app");
