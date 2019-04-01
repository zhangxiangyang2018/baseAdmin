<template>
<div>
    <!-- <h4>
        用户行为信息:{{  typeStr}}
    </h4> -->
   <div  id="main1" style="width:100%;height:400px;">

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
       memory(){
          return this.$store.state.performance.memory
       }

    },
    methods: {
       
        init() {
            this.chart = echarts.init(document.getElementById('main1'))
            let option = option = {
    backgroundColor: '#2c343c',

    title: {
        text: '浏览器内存使用情况',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#ccc'
        }
    },

    tooltip : {
        trigger: 'item',
       
    },

    visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
            colorLightness: [0, 1]
        }
    },
    series : [
        {
            name:'内存使用情况',
            type:'pie',
            radius : '55%',
            center: ['50%', '50%'],
            data:[
                {value:this.memory.jsHeapSizeLimit, name:'内存大小限制'},
                {value:this.memory.totalJSHeapSize, name:' 可使用的内存'},
                {value:this.memory.usedJSHeapSize, name:'JS对象(包括V8引擎内部对象)占用的内存'},
               
            ].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
                normal: {
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    }
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                }
            },
            itemStyle: {
                normal: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
};

              this.chart.setOption(option)
             
        }
    }
}
</script>
