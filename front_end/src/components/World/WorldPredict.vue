<template>
  <div class="worldpredict">
    <h3>{{ id }}预测趋势图</h3>
    <div id="predict_line" class="predict_line" style="width: 100%;height: 400px;"></div>
    <p>预测数字说明：<br>预测数据基于当前日期前30天数据生成，预测数据仅供参考！！！</p>
    <h3>{{ id }}预测详细数据</h3>
    <div id="country_table" class="table">
      <table class="table table-hover">
        <thead class="thead-dark">
        <tr>
          <th scope="col">日期</th>
          <th scope="col">累计确诊（红色为预测数字）</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in num" :key="index">
          <td>{{ item.date }}</td>
          <td>{{ item.number }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts"
import moment from "moment"
import {ref,toRefs,reactive,onMounted} from "vue"
import axiosGet from '@/plugins/http'

export default {
  setup(props) {
    const {id} = toRefs(props)

    let xdata = reactive([])
    let ydata1 = reactive([])
    let ydata2 = reactive([])
    let ydata3 = reactive([])
    let num = reactive([])
    let option = reactive({})

    //获取数据
    const getLine = async (idx)=>{
      const y1 = []
      const y2 = []
      await axiosGet('/api/worldpredict/' + idx).then(res=>{
        if(res !== '暂未提供预测数据'){
          for (let key in res) {
            xdata.push(moment(res[key].日期).format('YYYY-MM-DD'))
            y1.push(parseInt(res[key].确诊病例))
            y2.push(parseInt(res[key].预测病例))
          }
        }
      })

      const arr1 = new Array(7)
      arr1.fill('-')
      const arr2 = new Array(22)
      arr2.fill('-')
      //将当前日期数据加入预测数据中,这样就可以将预测数据和原始数据连成一条线了
      arr2.push(y1[y1.length-8])
      // console.log(arr1)
      // console.log(arr2)
      //获取当前日期之前的数据
      ydata1 = [...y1.slice(0, 23),...arr1]
      //获取预测数据
      ydata2 = [...arr2,...y2.slice(-7)]
      //获取确诊数字和预测数字，展示到表格中
      ydata3 = [...y1.slice(0,23),...y2.slice(-7)]
      for (let i = 0; i < xdata.length; i++) {
        const obj = {
          date:xdata[i],
          number:ydata3[i]
        }
        num.push(obj)
      }
      draw()
    }

    //作图
    const draw = async ()=> {
      // 创建option
      option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {lineStyle: {color: 'rgb(239, 243, 250)'},},
          backgroundColor: '#fff',
          textStyle: {color: '#999', fontSize: 12,},
          extraCssText: 'box-shadow: 0 2px 10px #ccc;'
        },
        legend: {
          data: [
            '现有累计确诊', '预测累计确诊'
          ],
          show: true,
          top: '20',
        },
        xAxis: [
          {
            type: 'category',
            position:'bottom',
            data: xdata
          },
        ],
        yAxis: [{
          type: 'value',
          axisLabel: {
            formatter: function (num) {
              let numStr = num.toString()
              // 万以内直接返回
              if (numStr.length < 5) {
                return numStr
              }
              //大于8位数是亿
              else if (numStr.length > 8) {
                let decimal = numStr.substring(numStr.length - 8, numStr.length - 8)
                return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿'
              }
              //大于6位数是十万 (以10W分割 10W以下全部显示)
              else if (numStr.length > 5) {
                let decimal = numStr.substring(numStr.length - 4, numStr.length - 4)
                return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万'
              } else if (numStr.length == 5) {
                let decimal = numStr.substring(numStr.length - 3, numStr.length - 4)
                return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万'
              }
            }
          }
        }],
        dataZoom: [{
          type: 'slider',
          start: 0,
          end: 100,
          bottom: 0,
          show: true
        }],
        series: [
          {
            name: '现有累计确诊',
            type: 'line',
            data: ydata1
          },
          {
            name: '预测累计确诊',
            type: 'line',
            data: ydata2
          }
        ],
        grid: {
          x: 50,
          x2: 25,
        },
      }
      //初始化表格
      let chartline = echarts.init(document.getElementById('predict_line'))
      chartline.setOption(option)
    }

    onMounted(()=>{
      getLine(id.value)
    })
    return {
      num,
    };
  },
  props:['id']
};
</script>

<style lang="scss" scoped>
.worldpredict{
  margin-bottom: 35px;
  padding: 5px;

  h3 {
    font-size: 20px;
    color: #020202;
    margin: 10px 0;
    border-left: 5px solid red;
    padding: 0 0 0 5px;
  }

  p{
    font-size: 16px;
    color: #646566;
    margin-top: 10px;
    padding: 0 5px;
  }

  //表格的样式
  .table {

    table {
      thead {
        height: 26px;

        tr {
          th {
            border: 0;
            font-size: 0.8rem;
            padding: 15px 0;
            text-align: center;
          }

          th:nth-child(1) {
            background-color: rgb(245, 245, 245);
            color: rgb(34, 34, 34);
          }

          th:nth-child(2) {
            background-color: rgb(252, 242, 232);
            color: rgb(255, 114, 60);
          }
        }
      }

      tbody {
        tr {
          font-size: 0.725rem;
          text-align: center;

          td {
            border: 0;
            border-bottom: 1px solid #dee2e6;
          }

        }

        tr:nth-last-child(1){
          color: red;
        }
        tr:nth-last-child(2){
          color: red;
        }
        tr:nth-last-child(3){
          color: red;
        }
        tr:nth-last-child(4){
          color: red;
        }
        tr:nth-last-child(5){
          color: red;
        }
        tr:nth-last-child(6){
          color: red;
        }
        tr:nth-last-child(7){
          color: red;
        }
      }
    }
  }
}
</style>
