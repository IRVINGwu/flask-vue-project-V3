<template>
  <div class="homeContainer">
    <!-- 页首的图片 -->
    <div class="home_header">
      <img src="../assets/images/head.png" alt="" />
      <div class="header_content">
        <span>科学防护 共渡难关</span>
        <span>covid-19疫情实时播报</span>
        <span>数据来源：WHO及权威媒体报道</span>
      </div>
    </div>

    <!-- 疫情数据展示 -->
    <div class="home_content">
      <!-- 当日全国疫情数据展示 -->
      <div class="data_country_daily">
        <h3>全国疫情数据(含港澳台)</h3>
        <van-grid :column-num="3" :gutter="6" class="vanGrid" :border="true">
          <van-grid-item icon="photo-o" text="文字" class="van-grid-item_1"
            ><span>现有确诊</span
            ><span class="number_1" v-cloak>{{ chinaDataToday.confirm }}</span
            ><span
              >较上日:<span class="number_1" v-cloak>{{
                $filters.formatNumber(chinaDataToday.storeConfirm)
              }}</span></span
            ></van-grid-item
          >

          <van-grid-item icon="photo-o" text="文字" class="van-grid-item_2"
            ><span>无症状感染者</span
            ><span class="number_2" v-cloak>{{ extDat.noSymptom }}</span
            ><span
              >较上日:<span class="number_2" v-cloak>{{
                $filters.formatNumber(extDat.incrNoSymptom)
              }}</span></span
            ></van-grid-item
          >

          <van-grid-item icon="photo-o" text="文字" class="van-grid-item_3"
            ><span>境外输入</span
            ><span class="number_3" v-cloak>{{ chinaDataTotal.input }}</span
            ><span
              >较上日:<span class="number_3" v-cloak>{{
                $filters.formatNumber(chinaDataToday.input)
              }}</span></span
            ></van-grid-item
          >

          <van-grid-item icon="photo-o" text="文字" class="van-grid-item_4"
            ><span>累计确诊</span
            ><span class="number_4" v-cloak>{{ chinaDataTotal.confirm }}</span
            ><span
              >较上日:<span class="number_4" v-cloak>{{
                $filters.formatNumber(chinaDataToday.input)
              }}</span></span
            ></van-grid-item
          >

          <van-grid-item icon="photo-o" text="文字" class="van-grid-item_5"
            ><span>累计治愈</span
            ><span class="number_5" v-cloak>{{ chinaDataTotal.heal }}</span
            ><span
              >较上日:<span class="number_5" v-cloak>{{
                $filters.formatNumber(chinaDataToday.heal)
              }}</span></span
            ></van-grid-item
          >

          <van-grid-item icon="photo-o" text="文字" class="van-grid-item_6"
            ><span>累计死亡</span
            ><span class="number_6" v-cloak>{{ chinaDataTotal.dead }}</span
            ><span
              >较上日:<span class="number_6" v-cloak>{{
                $filters.formatNumber(chinaDataToday.dead)
              }}</span></span
            ></van-grid-item
          >
        </van-grid>
        <h4 v-cloak>统计截止至:{{ date }}</h4>
      </div>

      <!-- 全国疫情概况 -->
      <div class="data_country">
        <h3>中国疫情地图</h3>
        <ChinaMap></ChinaMap>
        <h3>今日疫情详情</h3>
        <ChinaDetailTable></ChinaDetailTable>
        <h3>中国疫情趋势图</h3>
        <ChinaLine></ChinaLine>
        <p>
          注意：疫情趋势图数据来源于网易，如有数据更新不及时的情况，敬请谅解。
        </p>
        <h3>中国疫情详情</h3>
        <ChinaTable></ChinaTable>
        <p>数据来源：WHO及权威媒体</p>
      </div>

      <!-- 疫情注意事项 -->
      <div class="cautions">
        <div class="card bg-light mb-3">
          <div class="card-header">新冠肺炎预防须知</div>
          <div class="card-body">
            <h5 class="title1">
              个人清洁
            </h5>
            <ul>
              <li>
                保持个人卫生首先就要勤洗手，将病毒彻底洗干净，保持双手清洁，尤其在触摸口、鼻、眼之前。
              </li>
              <li>经常用洗手液和肥皂清洗双手，搓手最少20秒，并用纸巾擦干。</li>
              <li>
                打喷嚏或咳嗽时应用纸巾掩盖口鼻，把用过的纸巾弃置于有盖的垃圾桶内，然后彻底清洁双手。
              </li>
            </ul>
            <h5 class="title2">尽量避免</h5>
            <ul>
              <li>减少前往人流密集场所，如不可避免，应戴上外科口罩。</li>
              <li>
                避免到访医院，如有必要到访医院，应佩戴外科口罩，时刻注意个人和手部卫生。
              </li>
              <li>
                避免接触动物（包括野味）、禽鸟或其粪便；避免到海鲜、活禽市场。
              </li>
              <li>切勿进食野味及光顾有提供野味的餐馆。</li>
              <li>
                注意食物安全和卫生，避免进食或饮用未熟透的动物食品，包括奶类、蛋类和肉类。
              </li>
            </ul>
            <h5 class="title3">尽快就诊</h5>
            <ul>
              <li>
                如有身体不适，特别是有发热或咳嗽，应尽快就诊。
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!--      冬季疫情预防注意事项轮播图-->
      <div class="swiper">
        <h3>冬季疫情预防注意事项</h3>
        <van-swipe class="my-swipe" :autoplay="5000" indicator-color="white">
          <van-swipe-item
            ><img src="../assets/images/guide-1.jpg" alt=""
          /></van-swipe-item>
          <van-swipe-item
            ><img src="../assets/images/guide-2.jpg" alt=""
          /></van-swipe-item>
          <van-swipe-item
            ><img src="../assets/images/guide-3.jpg" alt=""
          /></van-swipe-item>
          <van-swipe-item
            ><img src="../assets/images/guide-4.jpg" alt=""
          /></van-swipe-item>
          <van-swipe-item
            ><img src="../assets/images/guide-5.jpg" alt=""
          /></van-swipe-item>
          <van-swipe-item
            ><img src="../assets/images/guide-6.jpg" alt=""
          /></van-swipe-item>
          <van-swipe-item
            ><img src="../assets/images/guide-7.jpg" alt=""
          /></van-swipe-item>
          <van-swipe-item
            ><img src="../assets/images/guide-8.jpg" alt=""
          /></van-swipe-item>
          <van-swipe-item
            ><img src="../assets/images/guide-9.jpg" alt=""
          /></van-swipe-item>
        </van-swipe>
      </div>
    </div>
  </div>
</template>

<script>
import { Grid, GridItem, Swipe, SwipeItem } from "vant";
import { ref, onBeforeMount, resolveComponent } from "vue";
import ChinaMap from "../components/China/ChinaDataMap.vue";
import ChinaLine from "../components/China/ChinaDataLine.vue";
import ChinaTable from "../components/China/ChinaDataTable.vue";
import ChinaDetailTable from "../components/China/ChinaDetailTable.vue";
import axiosGet from "../plugins/http.js";

export default {
  name: "Home",
  setup() {
    const chinaDataToday = ref("");
    const chinaDataTotal = ref("");
    const extDat = ref("");
    const date = ref("");

    // 这是原来请求数据的写法，现在我直接定义在了http.js文件中了，可以直接使用定义好的函数
    // const getChinaData = async () => {
    //   const body = await axios.get("/api/chinaDaily");
    //   if (body.status === 200) {
    //     chinaDataToday.value = body.data.data.chinaTotal.today;
    //     chinaDataTotal.value = body.data.data.chinaTotal.total;
    //     extDat.value = body.data.data.chinaTotal.extData;
    //     date.value = body.data.data.lastUpdateTime;
    //   }
    // };

    const getData = async () => {
      await axiosGet("/api/chinaDaily").then((res) => {
        // console.log(res);
        chinaDataToday.value = res.data.chinaTotal.today;
        chinaDataTotal.value = res.data.chinaTotal.total;
        extDat.value = res.data.chinaTotal.extData;
        date.value = res.data.lastUpdateTime;
      });
    };

    onBeforeMount(() => {
      getData();
    });
    return {
      chinaDataToday,
      chinaDataTotal,
      extDat,
      date,
    };
  },
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    ChinaMap,
    ChinaLine,
    ChinaTable,
    ChinaDetailTable,
  },
};
</script>

<style lang="scss">
h3 {
  margin: 0;
  padding: 0;
}

.homeContainer {
  //margin-top: 46px;
  margin-bottom: 50px;

  .home_header {
    position: relative;

    img {
      width: 100%;
      height: 150px;
    }

    .header_content {
      position: absolute;
      width: 100%;
      // background-color: pink;
      left: 0;
      top: 30px;
      display: flex;
      flex-direction: column;
      font-size: 24px;
      color: white;
      text-align: center;

      :nth-child(3) {
        font-size: 16px;
      }
    }
  }

  .home_content {
    margin: 0 auto;
    padding: 5px;

    .data_country_daily {
      width: 100%;
      display: flex;
      flex-direction: column;
      text-align: center;

      h3 {
        font-size: 18px;
        color: #1d1c1c;
        margin: 0 0 5px 0;
      }

      h4 {
        margin: 5px 0;
        padding: 0;
        font-size: 12px;
        color: rgb(124, 124, 124);
      }

      .vanGrid {
        .van-grid-item__content--center {
          border: 0.5px solid #ddd;
          border-radius: 5px;
          padding: 8px 0;

          :nth-child(1) {
            color: rgb(34, 34, 34);
            font-size: 13px;
          }

          :nth-child(2) {
            font-size: 24px;
          }

          :nth-child(3) {
            font-size: 12px;
            color: rgb(124, 124, 124);
          }
        }

        .van-grid-item_1 {
          .van-grid-item__content--center {
            background-color: rgb(253, 241, 241);

            .number_1 {
              color: rgb(242, 58, 59);
            }
          }
        }

        .van-grid-item_2 {
          .van-grid-item__content--center {
            background-color: rgb(250, 242, 246);

            .number_2 {
              color: rgb(202, 63, 129);
            }
          }
        }

        .van-grid-item_3 {
          .van-grid-item__content--center {
            background-color: rgb(252, 244, 240);

            .number_3 {
              color: rgb(240, 89, 38);
            }
          }
        }

        .van-grid-item_4 {
          .van-grid-item__content--center {
            background-color: rgb(253, 241, 241);

            .number_4 {
              color: rgb(204, 30, 30);
            }
          }
        }

        .van-grid-item_5 {
          .van-grid-item__content--center {
            background-color: rgb(241, 248, 244);

            .number_5 {
              color: rgb(23, 139, 90);
            }
          }
        }

        .van-grid-item_6 {
          .van-grid-item__content--center {
            background-color: rgb(243, 246, 248);

            .number_6 {
              color: rgb(78, 90, 101);
            }
          }
        }
      }
    }

    .data_country {
      h3 {
        font-size: 20px;
        color: #020202;
        margin: 10px 0;
        border-left: 5px solid red;
        padding-left: 5px;
      }

      p {
        font-size: 14px;
        color: rgba(22, 22, 22, 0.5);
        padding-left: 5px;
      }
    }
  }

  // 注意事项
  .cautions {
    width: 100%;

    .card {
      width: 100%;
    }

    .card-header {
      text-align: center;
      padding: 5px 0;
      color: #020202;
      font-size: 18px;
    }

    .card-body {
      color: rgb(75, 78, 75);
      padding: 15px 2px 0px 15px;
      background-color: rgb(248, 248, 248);

      h5 {
        font-size: 16px;
        vertical-align: middle;
      }

      .title1:before {
        content: "";
        display: inline-block;
        width: 1.5rem;
        height: 1.5rem;
        background: url(../assets/images/zhuyi_icon.png) no-repeat;
        background-position: 50% 35%;
        background-size: 60% 60%;
        margin-right: 7px;
        vertical-align: middle;
      }

      .title2:before {
        content: "";
        display: inline-block;
        width: 1.5rem;
        height: 1.5rem;
        background: url(../assets/images/jinzhi_icon.png) no-repeat;
        background-position: 50% 35%;
        background-size: 60% 60%;
        margin-right: 7px;
        vertical-align: middle;
      }

      .title3:before {
        content: "";
        display: inline-block;
        width: 1.5rem;
        height: 1.5rem;
        background: url(../assets/images/jiuzhen_icon.png) no-repeat;
        background-position: 50% 35%;
        background-size: 60% 60%;
        margin-right: 7px;
        vertical-align: middle;
      }

      ul {
        list-style-type: none;
        font-size: 14px;
        // margin-left: 0.1em;
        li:before {
          content: "";
          width: 6px;
          height: 6px;
          display: inline-block;
          border-radius: 50%;
          background: rgb(0, 93, 255);
          vertical-align: middle;
          margin-right: 7px;
        }
      }
    }
  }

  //冬季疫情预防
  .swiper {
    width: 100%;

    h3 {
      font-size: 20px;
      color: #020202;
      margin: 10px 0;
      border-left: 5px solid red;
      padding-left: 5px;
    }

    .my-swipe {
      width: 100%;
      padding: 10px;
      overflow: hidden;
    }

    .my-swipe .van-swipe-item {
      color: #fff;
      font-size: 20px;

      //height: 150px;
      line-height: 150px;
      text-align: center;
      //background-color: rgb(81, 122, 178);
    }

    img {
      width: 100%;
      //padding: 5px;
    }
  }
}
</style>
