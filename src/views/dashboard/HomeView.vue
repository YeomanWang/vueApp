<script setup lang="ts">
import * as echarts from 'echarts'
import { useTemplateRef , onMounted } from 'vue'
import { chartData } from './chartData'
type EChartsOption = echarts.EChartsOption
const input = useTemplateRef('my-chart')
let option: EChartsOption = {}
// const processedData = {
//   female: [],
//   male: []
// }
onMounted(() => {})

/**This is the resolution of use requestIdleCallback */
// function initChart(data: (number[] | undefined)[]) {
//   console.log(data);
//   const myChart = echarts.init(input.value)
//   option = {
//     title: {
//       text: 'Male and female height and weight distribution',
//       subtext: 'Data from: Heinz 2003',
//     },
//     grid: {
//       left: '3%',
//       right: '7%',
//       bottom: '7%',
//       containLabel: true,
//     },
//     tooltip: {
//       // trigger: 'axis',
//       showDelay: 0,
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       formatter: function (params: any) {
//         if (params.value.length > 1) {
//           return params.seriesName + ' :<br/>' + params.value[0] + 'cm ' + params.value[1] + 'kg '
//         } else {
//           return params.seriesName + ' :<br/>' + params.name + ' : ' + params.value + 'kg '
//         }
//       },
//       axisPointer: {
//         show: true,
//         type: 'cross',
//         lineStyle: {
//           type: 'dashed',
//           width: 0.1,
//         },
//       },
//     },
//     toolbox: {
//       feature: {
//         dataZoom: {},
//         brush: {
//           type: ['rect', 'polygon', 'clear'],
//         },
//       },
//     },
//     brush: {},
//     legend: {
//       data: ['Female', 'Male'],
//       left: 'center',
//       bottom: 10,
//     },
//     xAxis: [
//       {
//         type: 'value',
//         scale: true,
//         axisLabel: {
//           formatter: '{value} cm',
//         },
//         splitLine: {
//           show: false,
//         },
//       },
//     ],
//     yAxis: [
//       {
//         type: 'value',
//         scale: true,
//         axisLabel: {
//           formatter: '{value} kg',
//         },
//         splitLine: {
//           show: false,
//         },
//       },
//     ],
//     series: [
//       {
//         name: 'Female',
//         type: 'scatter',
//         emphasis: {
//           focus: 'series',
//         },
//         large: true,
//         largeThreshold: 2000,
//         symbolSize: 1,
//         // prettier-ignore
//         data: data.female,
//         markArea: {
//           silent: true,
//           itemStyle: {
//             color: 'transparent',
//             borderWidth: 1,
//             borderType: 'dashed',
//           },
//           data: [
//             [
//               {
//                 name: 'Female Data Range',
//                 xAxis: 'min',
//                 yAxis: 'min',
//               },
//               {
//                 xAxis: 'max',
//                 yAxis: 'max',
//               },
//             ],
//           ],
//         },
//         markPoint: {
//           data: [
//             { type: 'max', name: 'Max' },
//             { type: 'min', name: 'Min' },
//           ],
//         },
//         markLine: {
//           lineStyle: {
//             type: 'solid',
//           },
//           data: [{ type: 'average', name: 'AVG' }, { xAxis: 160 }],
//         },
//       },
//       {
//         name: 'Male',
//         type: 'scatter',
//         large: true,
//         largeThreshold: 2000,
//         emphasis: {
//           focus: 'series',
//         },
//         symbolSize: 1,
//         // prettier-ignore
//         data: data.male,
//         markArea: {
//           silent: true,
//           itemStyle: {
//             color: 'transparent',
//             borderWidth: 1,
//             borderType: 'dashed',
//           },
//           data: [
//             [
//               {
//                 name: 'Male Data Range',
//                 xAxis: 'min',
//                 yAxis: 'min',
//               },
//               {
//                 xAxis: 'max',
//                 yAxis: 'max',
//               },
//             ],
//           ],
//         },
//         markPoint: {
//           data: [
//             { type: 'max', name: 'Max' },
//             { type: 'min', name: 'Min' },
//           ],
//         },
//         markLine: {
//           lineStyle: {
//             type: 'solid',
//           },
//           data: [{ type: 'average', name: 'Average' }, { xAxis: 170 }],
//         },
//       },
//     ],
//   }
//   myChart.setOption(option)
// }

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// function processLargeDataBatch(deadline: any) {
//   while (deadline.timeRemaining() > 0 && chartData.female.length > 0) {
//     // 每次从数据中取出一部分处理
//     processedData.female.push(chartData.female.shift())
//     processedData.male.push(chartData.male.shift())
//   }

//   // 检查数据是否处理完，如果未完成则继续请求空闲时间
//   if (chartData.female.length > 0) {
//     requestIdleCallback(processLargeDataBatch)
//   } else {
//     // 数据处理完成后初始化图表
//     initChart(processedData)
//   }
// }

// requestIdleCallback(processLargeDataBatch)
/** requestIdleCallback end */

/** Web worker */
// 创建 Web Worker 实例
const worker = new Worker(new URL('./dataProcess.js', import.meta.url))

// 假设 largeData 是非常大的数据集
const largeData = {male: chartData.male, female: chartData.female} // 生成大数据集

// 将数据发送到 Worker
worker.postMessage(largeData)

// 监听 Worker 返回的消息，接收处理后的数据
worker.onmessage = function (event) {
  console.log(event);
  // processedData = event.data

  // 使用处理后的数据初始化图表
  initChart(event.data)
}

// 初始化图表的函数
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function initChart(data:any) {
  option = {
    title: {
      text: 'Male and female height and weight distribution',
      subtext: 'Data from: Heinz 2003',
    },
    grid: {
      left: '3%',
      right: '7%',
      bottom: '7%',
      containLabel: true,
    },
    tooltip: {
      // trigger: 'axis',
      showDelay: 0,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: function (params:any) {
        if (params.value.length > 1) {
          return params.seriesName + ' :<br/>' + params.value[0] + 'cm ' + params.value[1] + 'kg '
        } else {
          return params.seriesName + ' :<br/>' + params.name + ' : ' + params.value + 'kg '
        }
      },
      axisPointer: {
        show: true,
        type: 'cross',
        lineStyle: {
          type: 'dashed',
          width: 0.1,
        },
      },
    },
    toolbox: {
      feature: {
        dataZoom: {},
        brush: {
          type: ['rect', 'polygon', 'clear'],
        },
      },
    },
    brush: {},
    legend: {
      data: ['Female', 'Male'],
      left: 'center',
      bottom: 10,
    },
    xAxis: [
      {
        type: 'value',
        scale: true,
        axisLabel: {
          formatter: '{value} cm',
        },
        splitLine: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        scale: true,
        axisLabel: {
          formatter: '{value} kg',
        },
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: 'Female',
        type: 'scatter',
        emphasis: {
          focus: 'series',
        },
        large: true,
        largeThreshold: 2000,
        symbolSize: 1,
        // prettier-ignore
        data: data.female,
        markArea: {
          silent: true,
          itemStyle: {
            color: 'transparent',
            borderWidth: 1,
            borderType: 'dashed',
          },
          data: [
            [
              {
                name: 'Female Data Range',
                xAxis: 'min',
                yAxis: 'min',
              },
              {
                xAxis: 'max',
                yAxis: 'max',
              },
            ],
          ],
        },
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' },
          ],
        },
        markLine: {
          lineStyle: {
            type: 'solid',
          },
          data: [{ type: 'average', name: 'AVG' }, { xAxis: 160 }],
        },
      },
      {
        name: 'Male',
        type: 'scatter',
        large: true,
        largeThreshold: 2000,
        emphasis: {
          focus: 'series',
        },
        symbolSize: 1,
        // prettier-ignore
        data: data.male,
        markArea: {
          silent: true,
          itemStyle: {
            color: 'transparent',
            borderWidth: 1,
            borderType: 'dashed',
          },
          data: [
            [
              {
                name: 'Male Data Range',
                xAxis: 'min',
                yAxis: 'min',
              },
              {
                xAxis: 'max',
                yAxis: 'max',
              },
            ],
          ],
        },
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' },
          ],
        },
        markLine: {
          lineStyle: {
            type: 'solid',
          },
          data: [{ type: 'average', name: 'Average' }, { xAxis: 170 }],
        },
      },
    ],
  }

  const chart = echarts.init(input.value)
  chart.setOption(option)
}

/** end */
</script>

<template>
  <div id="container" ref="my-chart"></div>
</template>
<style>
#container {
  width: 100%;
  height: 100%;
}
</style>
