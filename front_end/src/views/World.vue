<template>
  <div class="world_container">
    <div class="world_header">
      <img src="../assets/images/world_banner.png" alt=""/>
      <div class="header_content">
        <span>山川异域 日月同天</span>
        <span>covid-19世界疫情实时播报</span>
        <span>数据来源：WHO及权威媒体报道</span>
      </div>
    </div>

    <div class="world_content">
      <!--      当日世界疫情数据展示-->
      <div class="data_country_daily">
        <h3>世界疫情数据</h3>
        <van-grid :column-num="3" :gutter="6" class="vanGrid" :border="true">
          <van-grid-item icon="photo-o" text="文字" class="van-grid-item_1"><span>现有确诊</span><span
            class="number_1" v-cloak>{{ worldTodayConfirm }}</span></van-grid-item>

          <van-grid-item icon="photo-o" text="文字" class="van-grid-item_2"><span>今日治愈</span><span
            class="number_2" v-cloak>{{ worldTodayHeal }}</span></van-grid-item>

          <van-grid-item icon="photo-o" text="文字" class="van-grid-item_3"><span>今日死亡</span><span
            class="number_3" v-cloak>{{ worldTodayDead }}</span></van-grid-item>

          <van-grid-item icon="photo-o" text="文字" class="van-grid-item_4"
          ><span>累计确诊</span><span class="number_4">{{ totalConfirm }}</span
          ></van-grid-item>

          <van-grid-item icon="photo-o" text="文字" class="van-grid-item_5"
          ><span>累计治愈</span><span class="number_5">{{ totalHeal }}</span
          ></van-grid-item>

          <van-grid-item icon="photo-o" text="文字" class="van-grid-item_6"
          ><span>累计死亡</span><span class="number_6">{{ totalDead }}</span
          ></van-grid-item>
        </van-grid>
        <h4>统计截止至:{{ date }}</h4>
      </div>

      <!--      展示世界疫情发展概况-->
      <div class="world_line">
        <h3>世界疫情趋势图</h3>
        <WorldLine></WorldLine>
        <h3>世界疫情详情</h3>
        <WorldTable></WorldTable>
      </div>
    </div>
  </div>
</template>

<script>
import WorldLine from '../components/World/WorldDataLine'
import WorldTable from '../components/World/WorldDataTable'
import axiosGet from '@/plugins/http'
import {Grid, GridItem} from 'vant'
import {ref,onMounted} from 'vue'

export default {
  setup () {
    let worldTodayConfirm = ref(0)
    let worldTodayDead = ref(0)
    let worldTodayHeal = ref(0)
    let totalConfirm = ref(0)
    let totalDead = ref(0)
    let totalHeal = ref(0)
    let date = ref(0)

    const getWorldData = async () => {
      await axiosGet('/api/worldDaily').then(res => {
        for (let i = 0; i < res.length; i++) {
          worldTodayConfirm.value += res[i].today.confirm === null ? 0 : parseInt(res[i].today.confirm)
          worldTodayDead.value += res[i].today.dead === null ? 0 : parseInt(res[i].today.dead)
          worldTodayHeal.value += res[i].today.heal === null ? 0 : parseInt(res[i].today.heal)
          totalConfirm.value += res[i].total.confirm === null ? 0 : parseInt(res[i].total.confirm)
          totalDead.value += res[i].total.dead === null ? 0 : parseInt(res[i].total.dead)
          totalHeal.value += res[i].total.heal === null ? 0 : parseInt(res[i].total.heal)
        }
        date.value = res[0].lastUpdateTime
      })
    }
    onMounted(() => {
      getWorldData()
    })
    return {
      worldTodayConfirm,
      worldTodayDead,
      worldTodayHeal,
      totalConfirm,
      totalDead,
      totalHeal,
      date,
    }
  },
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    WorldLine,
    WorldTable,
  }
}
</script>

<style lang="scss">
h3 {
  margin: 0;
  padding: 0;
}

.world_container {
  //margin-top: 46px;
  margin-bottom: 35px;

  .world_header {
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
      font-size: 22px;
      color: white;
      text-align: center;

      :nth-child(3) {
        font-size: 16px;
      }
    }
  }

  .world_content {
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
        border: 0;
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
            font-size: 20px;
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

    h3 {
      font-size: 20px;
      color: #020202;
      margin: 10px 0;
      border-left: 5px solid red;
      padding-left: 5px;
    }
  }
}
</style>
