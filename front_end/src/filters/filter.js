import moment from "moment";

export default function(app) {
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
}
