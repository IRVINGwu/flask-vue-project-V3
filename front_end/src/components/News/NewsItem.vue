<template>
  <div class="newsItem">
    <h3>{{ newsItem.title }}</h3>
    <span>{{ newsItem.source }}</span
    ><br />
    <span>{{ newsItem.time }}</span>
    <div class="content" v-html="newsItem.content"></div>
  </div>
</template>

<script>
import { onBeforeMount, ref, toRefs } from "vue";
import axios from "axios";
export default {
  setup(props) {
    const { id } = toRefs(props);
    const newsItem = ref("");
    const getNewsItem = async function(idx) {
      const body = await axios.get("/api/news/" + idx);
      if (body.status === 200) {
        newsItem.value = body.data.data[0];
      }
    };
    onBeforeMount(() => {
      getNewsItem(id.value);
    });

    return {
      newsItem,
    };
  },
  props: ["id"],
};
</script>

<style lang="scss" scoped>
.newsItem {
  //margin-top: 46px;
  margin-bottom: 50px;
  padding: 10px;
  h3 {
    text-align: center;
    font-size: 20px;
    color: #020202;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  }
  span {
    font-size: 16px;
    color: rgba(146, 131, 112, 0.9);
    padding-left: 5px;
  }
  .content {
    font-size: 16px;
    color: #020202;
    padding: 5px;
  }
}
</style>
