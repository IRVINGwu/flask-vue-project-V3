<template>
  <div class="world_line">
    <div id="line1" class="line" style="width: 100%;height: 400px;"></div>
    <div id="line2" class="line" style="width: 100%;height: 400px;"></div>
    <div id="line3" class="line" style="width: 100%;height: 400px;"></div>
  </div>
</template>

<script>
import axiosGet from '@/plugins/http'
import * as echarts from 'echarts'
import {reactive, onMounted} from 'vue'

export default {
  setup () {
    //所需要的x轴和y轴数据
    let xdata = reactive([])
    let ydata1 = reactive([])
    let ydata2 = reactive([])
    let ydata3 = reactive([])
    //制图的配置项
    let option1 = reactive({})
    let option2 = reactive({})
    let option3 = reactive({})
    //绘图
    const draw = () => {
      let line1 = document.getElementById('line1')
      let line2 = document.getElementById('line2')
      let line3 = document.getElementById('line3')
      line1.style.display = 'block'
      line2.style.display = 'block'
      line3.style.display = 'block'
      let chartline1 = echarts.init(line1)
      let chartline2 = echarts.init(line2)
      let chartline3 = echarts.init(line3)
      chartline1.setOption(option1)
      chartline2.setOption(option2)
      chartline3.setOption(option3)
    }
    //设置配置项
    const getWorldData = async () => {
      await axiosGet('/api/worldSum').then(res => {
        let table = res.data
        for (let i = 0; i < table.length; i++) {
          xdata.push(table[i].date.slice(0, 10))
          ydata1.push(table[i].确诊病例)
          ydata2.push(table[i].死亡病例)
          ydata3.push(table[i].康复病例)
        }
        option1 = {
          title: {
            text: '累计确诊'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {lineStyle: {color: 'rgb(239,243,250)'}},
            backgroundColor: '#fff',
            textStyle: {color: '#999', fontSize: 12},
            extraCssText: 'box-shadow:0 2px 10px #ccc'
          },
          legend: {
            data: ['累计确诊'],
            show: true,
            top: '20'
          },
          xAxis: [{
            type: 'category',
            data: xdata
          }],
          yAxis: [{
            type: 'value',
            axisLabel: {
              formatter: function (num) {
                let numStr = num.toString()
                if (numStr.length < 5) {
                  return numStr
                } else if (numStr.length > 8) {
                  let decimal = numStr.substring(numStr.length - 8, numStr.length - 8)
                  return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿'
                } else if (numStr.length > 5) {
                  let decimal = numStr.substring(numStr.length - 4, numStr.length - 4)
                  return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万'
                } else if (numStr.length === 5) {
                  let decimal = numStr.substring(numStr.length - 3, numStr.length - 4)
                  return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万'
                }
              }
            }
          }],
          series: [{
            name: '累计确诊',
            type: 'line',
            data: ydata1
          }],
          grid: {
            x: 50,
            x2: 25,
            y2:25,
          }
        }
        option2 = {
          title: {
            text: '累计死亡'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {lineStyle: {color: 'rgb(239,243,250)'}},
            backgroundColor: '#fff',
            textStyle: {color: '#999', fontSize: 12},
            extraCssText: 'box-shadow:0 2px 10px #ccc'
          },
          legend: {
            data: ['累计死亡'],
            show: true,
            top: '20'
          },
          xAxis: [{
            type: 'category',
            data: xdata
          }],
          yAxis: [{
            type: 'value',
            axisLabel: {
              formatter: function (num) {
                let numStr = num.toString()
                if (numStr.length < 5) {
                  return numStr
                } else if (numStr.length > 8) {
                  let decimal = numStr.substring(numStr.length - 8, numStr.length - 8)
                  return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿'
                } else if (numStr.length > 5) {
                  let decimal = numStr.substring(numStr.length - 4, numStr.length - 4)
                  return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万'
                } else if (numStr.length === 5) {
                  let decimal = numStr.substring(numStr.length - 3, numStr.length - 4)
                  return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万'
                }
              }
            }
          }],
          series: [{
            name: '累计死亡',
            type: 'line',
            data: ydata2
          }],
          grid: {
            x: 50,
            x2: 25,
            y2:25,
          }
        }
        option3 = {
          title: {
            text: '累计治愈'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {lineStyle: {color: 'rgb(239,243,250)'}},
            backgroundColor: '#fff',
            textStyle: {color: '#999', fontSize: 12},
            extraCssText: 'box-shadow:0 2px 10px #ccc'
          },
          legend: {
            data: ['累计治愈'],
            show: true,
            top: '20'
          },
          xAxis: [{
            type: 'category',
            data: xdata
          }],
          yAxis: [{
            type: 'value',
            axisLabel: {
              formatter: function (num) {
                let numStr = num.toString()
                if (numStr.length < 5) {
                  return numStr
                } else if (numStr.length > 8) {
                  let decimal = numStr.substring(numStr.length - 8, numStr.length - 8)
                  return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿'
                } else if (numStr.length > 5) {
                  let decimal = numStr.substring(numStr.length - 4, numStr.length - 4)
                  return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万'
                } else if (numStr.length === 5) {
                  let decimal = numStr.substring(numStr.length - 3, numStr.length - 4)
                  return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万'
                }
              }
            }
          }],
          series: [{
            name: '累计治愈',
            type: 'line',
            data: ydata3
          }],
          grid: {
            x: 50,
            x2: 25,
            y2:25,
          }
        }

        draw()
      })
    }

    onMounted(()=>{
      getWorldData()
    })
    return {}
  },
}
</script>

<style lang="scss" scoped>
.world_line {
  .line {
    margin: 15px 0;
  }
}
</style>
