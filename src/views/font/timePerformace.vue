<template>
<div style="background:#2c343c;padding:30px">
    <!-- <h4>
        用户行为信息:{{  typeStr}}
    </h4> -->
   <div  id="main" style="width:100%;height:400px;">

   </div>
  




   
   
</div>
</template>

<script>
import echarts from 'echarts';
import resize from './mixins/resize'
export default {
     mixins: [resize],
    mounted() {
        this.init()
    },
    data() {
        return {
            chart: null
        }
    },
   computed:{
       times(){
           return this.$store.state.performance.times
       },
       typeStr(){
            return this.$store.state.performance.navigationType
       }

    },
    methods: {
       
        init() {
            this.chart = echarts.init(document.getElementById('main'))
            let option = {
                 backgroundColor: '#2c343c',

    title: {
        text: '前端性能监控',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#ccc'
        }
    },

    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
                color: ['#3398DB'],
                 legend: {
                        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎','百度','谷歌','必应','其他']
                    },        
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: "{a} <br/>{b}: {c} ms"
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    name:"加载项",
                    data: ['页面加载时间', 'DOM加载', '重定向加载', 'DNS查询',  '内容加载完', 'DNS缓存','页面卸载','tcp连接','白屏时间','domReady'],
                    axisTick: {
                        alignWithLabel: true
                    },
                     axisLine: {
                   lineStyle: {
                       type: 'solid',
                       color:'#ccc',
                       width:'2'
                   }
               },
               axisLabel: {
                   textStyle: {
                       color: '#ccc'
                   }
               }
                }],
                yAxis: [{
                    type: 'value',
                    name:"时间/毫秒",
                     axisLine: {
                   lineStyle: {
                       type: 'solid',
                       color:'#ccc',
                       width:'2'
                   }
               },
               axisLabel: {
                   textStyle: {
                       color: '#ccc'
                   }
               }
                }],
                series: [{
                    name: '加载时间',
                    type: 'bar',
                    barWidth: '60%',
                    data: this.times
                }]
            };

              this.chart.setOption(option)
             
        }
    }
}
</script>
