<template>
  <div class="news_container">
    <div class="news_header">
      <img src="../assets/images/news_banner.png" alt=""/>
      <div class="header_content">
        <span>同心合力 抗击疫情</span>
        <span>covid-19疫情最新进展</span>
      </div>
    </div>

    <!--    vant上拉加载组件-->
    <div class="news_content">
      <h3>疫情追踪<span></span></h3>
      <!--      疫情列表-->
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          tag="ul"
          class="newsul"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多内容了！"
          @load="onload"
        >
          <van-cell
            tag="li"
            class="newsli"
            v-for="(item, index) in newsContent"
            :key="index"
          >
<!--            加上这个van-clearfix类名之后,就没有出现一次加载完的情况了-->
            <div class="news_item van-clearfix">
              <span>{{ item.time }}</span>
              <div class="item_content">
                <h4 class="title">{{ item.title }}</h4>
                <!-- <div class="content">{{ item.content | formatContent }}...</div> -->
                <div class="content">
                  {{ $filters.formatContent(item.content) }}...
                </div>
                <router-link :to="'/news/' + item.id" tag="span"
                >查看详情&gt;&gt;&gt;
                </router-link
                >
              </div>
            </div>
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import {Divider, List, Cell, PullRefresh} from 'vant'
import {onBeforeMount, reactive, ref} from 'vue'
import axiosGet from '../plugins/http.js'

export default {
  setup () {
    let news = reactive([])
    let newsContent = reactive([])
    const newsLen = ref(0)
    // const flag = ref(true);
    const loading = ref(false)
    const finished = ref(false)
    const refreshing = ref(false)
    const getNews = async () => {
      await axiosGet('/api/news').then((res) => {
        // console.log(res);
        for (const key in res) {
          news.push(res[key])
        }
      })
    }
    //TODO:这里最好使用vuex来做，因为每次都要请求数据，很麻烦，不如直接存放在本地。如果是可以下拉加载的话，就没有必要了。
    const onload = function () {
      //这里的setTimeout的意思是，激活这个onload时间后多长时间请求数据。
      setTimeout(() => {
        if (refreshing.value) {
          newsContent.value = []
          refreshing.value = false
        }
        newsLen.value += 10
        // newsContent = [];
        for (let i = newsLen.value - 10; i < newsLen.value; i++) {
          if (news[i] !== undefined) {
            newsContent.push(news[i])
          }
        }
        //加载状态结束
        loading.value = false
        //数据全部加载完成
        if (newsContent.length >= news.length) {
          finished.value = true
        }
        // console.log(newsContent.value);
      }, 1000)
    }
    const onRefresh = () => {
      finished.value = false
      //重新加载
      loading.value = true
      onload()
    }
    onBeforeMount(() => {
      getNews()
      onload()
    })
    return {
      onload,
      loading,
      finished,
      newsContent,
      news,
      refreshing,
      onRefresh,
      //   flag,
    }
  },
  components: {
    [Divider.name]: Divider,
    [List.name]: List,
    [Cell.name]: Cell,
    [PullRefresh.name]: PullRefresh,
  },
}
</script>

<style lang="scss" scoped>
.news_container {
  //margin-top: 46px;
  margin-bottom: 35px;

  .news_header {
    position: relative;
    background-color: rgb(0, 86, 238);

    img {
      width: 100%;
      height: 150px;
    }

    .header_content {
      position: absolute;
      width: 100%;
      // background-color: pink;
      left: 0;
      top: 40px;
      display: flex;
      flex-direction: column;
      font-size: 24px;
      color: white;
      text-align: center;

      span:nth-child(2) {
        font-size: 28px;
        font-style: italic;
      }
    }
  }

  .news_content {
    padding: 15px;

    h3 {
      position: relative;
      font-size: 20px;
      font-weight: bold;
      margin: 10px 0;
      border-left: 5px solid red;
      padding-left: 5px;
      height: 30px;
      line-height: 30px;

      span {
        position: absolute;
        display: inline-block;
        width: 106px;
        height: 30px;
        background: url("../assets/images/zhuizong.png") no-repeat;
        background-size: 100% 100%;
        right: 10px;
        top: 0;
      }
    }

    .newsul {
      width: 100%;

      .newsli {
        padding: 0;

        .news_item {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding: 15px 0 20px 0;
          border-bottom: 2px solid #f3f3f3;

          span {
            font-size: 16px;
            color: rgb(115, 115, 160);
            margin-top: -7px;
          }

          .item_content {
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 5px;
            background-color: rgb(248, 248, 248);
            margin-top: 15px;

            h4 {
              font-size: 16px;
            }

            //h4::before {
            //  content: "";
            //  font-size: 0;
            //  line-height: 0;
            //  position: absolute;
            //  width: 3.3px;
            //  height: 3.3px;
            //  border: 5.6px solid #005dff;
            //  border-radius: 50%;
            //  left: -5px;
            //  top: 0;
            //  background-color: #fff;
            //}

            .content {
              margin: 0 0 5px 0;
              font-size: 15px;
              color: rgb(123, 117, 120);
            }

            span {
              font-size: 15px;
              color: rgb(123, 117, 120);
            }
          }
        }
      }
    }
  }
}
</style>
