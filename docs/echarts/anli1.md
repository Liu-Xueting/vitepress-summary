# 示例1

使用 grid 布局，6个图表，2行3列

注意的是：图表需要固定宽高 否则会混乱

添加 ：

1. 宽高适配

```css
.container {
    width: 70vw;
    max-width: 1402px;
    height: auto;
}
```

2. 页面居中

```css
.container {
    margin: 0 auto;
    margin-top: 32px;
}
```

```vue
<template>
    <Header />
    <section class="learn-title">

        <div class="zh">
            <span class="line"></span>
            <span class="main">学情分析</span>
            <span class="line"></span>
        </div>
        <div class="en">LEARNING ANALYSIS</div>
    </section>
    <div class="analysis-page">
        <div class="card">
            <el-select v-model="classManager" placeholder="班级选择" style="width: 240px">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <div class="chart-container">
                <div class="chart-item">
                    <div id="chart1" style="width: 100%; height: 100%;"></div>
                </div>
                <div class="chart-item">
                    <div id="chart2" style="width: 100%; height: 100%;"></div>
                </div>
                <div class="chart-item">
                    <div id="chart3" style="width: 100%; height: 100%;"></div>
                    <div class="chart-title">单元测试平均分</div>
                </div>
                <div class="chart-item">
                    <div id="chart4" style="width: 100%; height: 100%;"></div>
                    <div class="chart-title">当前完成实训人数</div>
                </div>
                <div class="chart-item">
                    <div id="chart5" style="width: 100%; height: 100%;"></div>
                    <div class="chart-title">实习结果占比（%）</div>
                </div>
                <div class="chart-item">
                    <div id="chart6" style="width: 100%; height: 100%;"></div>
                    <div class="chart-title">单元测试完成情况</div>
                </div>
            </div>
        </div>
        <div class="card card2">
            <section class="learn-title">

                <div class="zh">
                    <span class="line"></span>
                    <span class="main">考试结果</span>
                    <span class="line"></span>
                </div>
                <div class="en">LEARNING ANALYSIS</div>
            </section>
        </div>
        <div class="card"></div>
        <div class="card"></div>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import Header from '@/components/Header.vue';
import * as echarts from 'echarts';
import { Bottom } from '@element-plus/icons-vue';

const classManager = ref('')

const options = [
    {
        value: '一班',
        label: '1',
    },
    {
        value: '二班',
        label: '2',
    },
]

const analysisOption1 = {
    // title: {
    //     text: 'ECharts 入门示例'
    // },
    tooltip: {},
    legend: {
        data: ['数据1']
    },
    xAxis: {
        data: ['AI创新创意', 'AI营销创意', 'AI模式创新', 'AI视觉创意']
    },
    yAxis: {},
    series: [
        {
            name: '数据',
            type: 'bar',
            data: [10, 20, 30, 40]
        }
    ]
};


const analysisOption2 = {
    // title: {
    //     text: 'ECharts 入门示例'
    // },
    tooltip: {},
    legend: {
        data: ['数据1'],
        top: 'bottom'
    },
    xAxis: {
        data: ['招聘助手', '财务管理专家', '背景图设计', '产品趋势分析', '宣传视频分析']
    },
    yAxis: {},
    series: [
        {
            name: '数据',
            type: 'bar',
            data: [10, 20, 15, 40, 10]
        }
    ]
};

const analysisOption3 = {
    // title: {
    //     text: '单元测试平均分',
    //     left: 'center',
    //     top: 'bottom', // 标题在底部
    //     padding: [60, 0, 0, 0], // 上右下左，增加与图表的距离
    //     textStyle: {
    //         color: '#333',
    //         fontWeight: 500,
    //         fontSize: 16
    //     }
    // },
    legend: {
        top: 'bottom'
    },
    series: [
        {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: ['10%', '60%'],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
                borderRadius: 8
            },
            data: [
                { value: 40, name: 'rose 1' },
                { value: 38, name: 'rose 2' },
                { value: 32, name: 'rose 3' },
                { value: 30, name: 'rose 4' },
                // { value: 28, name: 'rose 5' },
                // { value: 26, name: 'rose 6' },
                // { value: 22, name: 'rose 7' },
                // { value: 18, name: 'rose 8' }
            ]
        }
    ]
};

const analysisOption4 = {
    tooltip: {
        trigger: 'item'
    },
    legend: {
        top: 'bottom'
    },
    series: [
        {
            name: '完成实训人数',
            type: 'pie',
            radius: ['30%', '60%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 40,
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 10, name: '已完成' },
                { value: 15, name: '进行中' },
                { value: 20, name: '未开始' },
            ]
        }
    ]
};

const analysisOption5 = {

    legend: {
        top: 'bottom'
    },
    series: [
        {
            name: '实习结果',
            type: 'pie',
            radius: '60%',
            data: [
                { value: 66, name: '优秀' },
                { value: 22, name: '良好' },
                { value: 12, name: '不及格' },
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

const analysisOption6 = {
    tooltip: {
        trigger: 'item'
    },
    legend: {
        top: 'bottom'
    },
    series: [
        {
            name: '单元测试完成情况',
            type: 'pie',
            radius: ['30%', '60%'],
            avoidLabelOverlap: false,
            // label: {
            //     show: false,
            //     position: 'center'
            // },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 40,
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 10, name: 'AI基础课程' },
                { value: 15, name: '提示词工程' },
                { value: 20, name: 'AI智能体' },
                { value: 25, name: 'AIGC入门' },

            ]
        }
    ]
};


const initCharts = () => {

    const Chart1 = echarts.init(document.getElementById('chart1'));
    Chart1.setOption(analysisOption1);
    const Chart2 = echarts.init(document.getElementById('chart2'));
    Chart2.setOption(analysisOption2);
    const Chart3 = echarts.init(document.getElementById('chart3'));
    Chart3.setOption(analysisOption3);
    const Chart4 = echarts.init(document.getElementById('chart4'));
    Chart4.setOption(analysisOption4);
    const Chart5 = echarts.init(document.getElementById('chart5'));
    Chart5.setOption(analysisOption5);
    const Chart6 = echarts.init(document.getElementById('chart6'));
    Chart6.setOption(analysisOption6);

    window.onresize = () => {
        Chart1.resize();
        Chart2.resize();
        Chart3.resize();
        Chart4.resize();
        Chart5.resize();
        Chart6.resize();
    }

};


onMounted(() => {
    // 在这里初始化图表
    initCharts();
});

</script>

<style scoped lang="scss">
.learn-title {
    margin-top: 48px;
    text-align: center;

    .en {
        font-family: Source Han Sans CN;
        font-weight: 500;
        font-size: 10px;
        color: #AAAAAA;
        line-height: 28px;
        margin-bottom: 8px;
        letter-spacing: 1px;
    }

    .zh {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #222;
        font-size: 22px;
        font-weight: bold;

        .line {
            display: inline-block;
            width: 32px;
            height: 2px;
            background: #e5e8ef;
            margin: 0 12px;
            vertical-align: middle;
        }

        .main {
            font-family: Source Han Sans CN;
            font-weight: bold;
            font-size: 20px;
            color: #7186FE;
            line-height: 28px;
        }
    }
}

.analysis-page {
    width: 70vw;
    max-width: 1402px;
    height: auto;
    // height: 795px;
    margin: 0 auto;
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;

    .card {
        width: 100%;
        height: 795px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        padding: 24px;

        .chart-container {
            width: 100%;
            height: calc(100% - 18px);
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2px;

            // justify-content: space-between;
            // align-items: stretch;
        }

        .chart-item {
            width: 100%;
            // max-width: 360px; // 限制最大宽度
            // 图表一定要设置固定宽高 
            height: 320px; // 固定高度
            // height: 100%;
            min-width: 0;
            min-height: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            background: #fff;
            box-sizing: border-box;
            position: relative;
        }

        .chart-title {
            text-align: center;
            font-size: 16px;
            color: #333;
            font-weight: 500;
            margin-top: 32px; // 控制与图表的距离
            margin-bottom: 0;
            width: 100%;
            pointer-events: none;
        }

        .chart-item>#chart3,
        .chart-item>#chart6 {
            flex: 1 1 auto;
        }


    }

    .card2 {
        height: 548px;
    }
}
</style>
```
