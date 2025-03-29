# 高德 + Vue 实现 关键词搜索和路径规划

## 准备

版本：1.4.15

1. 注册高德开发者账号
2. 创建应用，获取高德Key 和 密钥 (**注意使用的Web端JS API服务**)

## Vue 接入高德

1. 安装高德地图JS API加载器

```bash
pnpm add @amap/amap-jsapi-loader
```

2. 创建高德地图实例

index.html文件引入高德地图JS API

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width">
  <title>HELLO，AMAP!</title>
  <style>
    html,
    body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
    }
  </style>

  <script>
    window._AMapSecurityConfig = {
      securityJsCode: "密钥",
    }
  </script>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.ts"></script>
  <script type="text/javascript"
    src="http://webapi.amap.com/maps?v=1.4.15&key=我们自己的Key"></script>
  <script type="text/javascript" src="https://cache.amap.com/lbs/static/addToolbar.js"></script>
</body>
</html>
```

Map.vue

```vue
<script setup lang="js">
import { onMounted, ref } from 'vue'
let map = null //地图实例

onMounted(() => {
    map = new AMap.Map('container', {
        resizeEnable: true,
        // center: [116.480983, 39.989628], //地图中心点
        zoom: 13
    });
})
</script>

<template>
    <div id="container"></div>
</template>

<style scoped>
#container {
    position: relative;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
}
</style>
```

注意点：

- 高德地图JS API的版本号需要和加载器的版本号一致
- `window._AMapSecurityConfig = {securityJsCode: "cbcd1944b56aa75805868e704c679b4e",}` 需要在html页面全局引入
- `<script type="text/javascript"src="http://webapi.amap.com/maps?v=1.4.15&key=fe074aa3282c2979b0581d2497cc8b42"></script>`需要在html页面全局引入

3. 创建搜索实例

```js

import { ref } from 'vue'

const addwho = ref('')//判断 起点还是终点 输入框
const restData = ref(null) //搜索出来的数据存放
//表单数据
const ruleForm = ref({
    startPlace: '', //起点
    endPlace: '', //终点
    startPlaceLoat: null, //起点坐标
    endPlaceLoat: null, //终点坐标
    Policy: 'AMap.DrivingPolicy.LEAST_TIME', //驾车策略
    TravelTools: 'AMap.Driving', //出行工具
    startVal: null, //起点详细信息
    endVal: null, //终点详细信息
})
//出行工具
const TravelTools = ref([{
    name: '驾车',
    tools: 'AMap.Driving',
    //驾车策略
    Policy: [{
        name: '最快',
        resource: 'AMap.DrivingPolicy.LEAST_TIME'
    }, {
        name: '经济',
        resource: 'AMap.DrivingPolicy.LEAST_FEE'
    }, {
        name: '最短',
        resource: 'AMap.DrivingPolicy.LEAST_DISTANCE'
    }, {
        name: '实时',
        resource: 'AMap.DrivingPolicy.REAL_TRAFFIC'
    }],
}, {
    name: '步行',
    tools: 'AMap.Walking',
}, {
    name: '骑行',
    tools: 'AMap.Riding',
    //骑行策略
    Policy: [{
        name: '综合',
        resource: 0,
    }, {
        name: '推荐',
        resource: 1,
    }, {
        name: '最快',
        resource: 2,
    }],
}])
const flag = ref(false) //是否显示 搜索地址
const startMarker = ref(null) //起点标记
const endMarker = ref(null) //终点标记

//输入框 值发生改变
function handleSelect(e) {
    if (addwho.value === 'startPlace') {
        ruleForm.value.startPlace = e
    } else if (addwho.value === 'endPlace') {
        ruleForm.value.endPlace = e
    }
    autoOption()
}
//input 输入地址框 获取焦点事件
function inputFocus(num) {
    if (num == 'start') {
        addwho.value = 'startPlace'
    } else if (num == 'end') {
        addwho.value = 'endPlace'
    }
}

const resetForm = () => {

    ruleForm.value = {
        startPlace: '', //起点
        endPlace: '', //终点
        startPlaceLoat: null, //起点坐标
        endPlaceLoat: null, //终点坐标
        Policy: 'AMap.DrivingPolicy.LEAST_TIME', //驾车策略
        TravelTools: 'AMap.Driving', //出行工具
        startVal: null, //起点详细信息
        endVal: null, //终点详细信息
    }
    PolicyClear() //清除所有路线
}

//关键字搜索服务
//查询附近地点信息
function autoOption() {
    var keywords = ''
    if (addwho.value == 'startPlace') {
        keywords = ruleForm.value.startPlace
    } else if (addwho.value == 'endPlace') {
        keywords = ruleForm.value.endPlace
    }
    console.log('搜索关键字', keywords);
    AMap.service("AMap.PlaceSearch", function () {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
            pageSize: 5, // 单页显示结果条数
            pageIndex: 1, // 页码
            city: "全国", // 兴趣点城市
            citylimit: false,  //是否强制限制在设置的城市内搜索
            map: map.value, // 展现结果的地图实例
            // panel: "panel", // 结果列表将在此容器中进行展示。
            autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        //关键字查询
        placeSearch.search(keywords, function (status, result) {
            //查询成功时，result即对应匹配的POI信息
            if (result.info === 'OK') {
                console.log('搜索结果', result);
                restData.value = result //搜索出来的数据
                flag.value = true //显示 搜索地址
            } else {
                console.log('搜索失败', result.info);
            }
        });

    });
}

//地址点击
function onRest(val) {
    flag.value = false
    if (addwho.value == 'startPlace') {
        ruleForm.value.startPlace = val.name //起点名字
        ruleForm.value.startPlaceLoat = val.location //起点坐标
        ruleForm.value.startVal = val
        var startMarker = new AMap.Marker({
            position: val.location,
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
            offset: new AMap.Pixel(-13, -30),
            map: map
        })
        map.setFitView([startMarker])
    } else if (addwho.value == 'endPlace') {
        ruleForm.value.endPlace = val.name //终点名字
        ruleForm.value.endPlaceLoat = val.location //终点坐标
        ruleForm.value.endVal = val
        var endMarker = new AMap.Marker({
            position: val.location,
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
            offset: new AMap.Pixel(-13, -30),
            map: map
        })
        map.setFitView([endMarker])
    }
    map.panTo(val.location); //地图移动到坐标位置
}
```

```html
  <div class="input-card">
        <h1 class="text">区域信息</h1>
        <div class="form">
            <el-form v-model="ruleForm" status-icon ref="ruleFormRef" label-width="100px" class="demo-ruleForm"
                size="large" style="height: 1000px;">
                <el-form-item label="起点：" prop="pass" size="large">
                    <el-input id="handleSelect" v-model="ruleForm.startPlace" placeholder="请输入起点" @input="handleSelect"
                        @focus="inputFocus('start')">
                    </el-input>
                </el-form-item>
                <el-form-item label="终点：" prop="checkPass">
                    <el-input id="handleSelect" v-model="ruleForm.endPlace" placeholder="请输入终点" @input="handleSelect"
                        @focus="inputFocus('end')">
                    </el-input>
                </el-form-item>
                <el-form-item label="出行工具" prop="TravelTools">
                    <el-radio-group v-model="ruleForm.TravelTools" @change="TravelRadio">
                        <el-radio v-for="item in TravelTools" :key="item.name" :label="item.tools">{{ item.name }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="出行策略" prop="Policy">
                    <el-radio-group v-if="PolicyType === 'AMap.Driving'" v-model="ruleForm.Policy">
                        <el-radio v-for="item in TravelTools[0].Policy" :key="item.name" :label="item.resource">
                            {{ item.name }}
                        </el-radio>
                    </el-radio-group>
                    <el-radio-group v-if="PolicyType === 'AMap.Walking'" v-model="ruleForm.Policy">
                        <el-radio v-for="item in TravelTools[1].Policy" :key="item.name" :label="item.resource">
                            {{ item.name }}
                        </el-radio>
                    </el-radio-group>
                    <el-radio-group v-if="PolicyType === 'AMap.Riding'" v-model="ruleForm.Policy">
                        <el-radio v-for="item in TravelTools[2].Policy" :key="item.name" :label="item.resource">
                            {{ item.name }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">搜索</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
    <!-- 搜索地址 -->
    <div id="chunk" v-if="flag">
        <h2 class="textSearch">搜索地址</h2>
        <div class="pickWindos_son" v-for="item in restData.poiList.pois" :key="item.id" @click="onRest(item)">
            <div class="pickWindos_son_top">{{ item.name }}</div>
            <div class="pickWindos_son_bottom">地址：{{ item.pname }}{{ item.cityname }}{{ item.adname }}{{ item.address }}

            </div>
            <el-divider />
        </div>
    </div>
```

```css
.text {
    text-align: center
}

.input-card {
    position: absolute;
    top: 0;
    left: 0;
    width: 20%;
    height: 100%;
    z-index: 10;
    background-color: white;
}

.search-box {

    width: 90%;
    height: 500px;
    align-items: center;
    margin-top: 20px;

}

.form {
    width: 90%;
    height: 60%;
    margin-top: 20px;
    padding: 20px;
    font-size: 36px;
    font-weight: bold;

}


.pickWindos_son_top {
    font-size: 16px;
    color: #fff;
    font-weight: bold;
}

.pickWindos_son_bottom {
    font-size: 12px;
    color: #fff;
    font-weight: normal;
    margin-top: 10px;
    margin-bottom: 10px;
}

.textSearch {
    font-size: 26px;
    margin-top: 10px;
    margin-bottom: 30px;
    color: #fff;
    margin-left: 10px;
    font-weight: bold;
}

/* .el-form {
    --el-form-label-font-size: 24px !important;
} */

#chunk {
    position: absolute;
    top: 20px;
    left: 20%;
    width: 15%;
    height: 40%;
    z-index: 11;
    background-color: white;
    /* overflow-y: scroll; */
    background-color: #aaaaaa;
}

.pickWindos_son {
    height: 10%;
    cursor: pointer;
    /* margin-bottom: 10px; */
    margin-top: 30px;
    padding: 0 20px;
}
```

注意点：

- 1.4.15版本的插件服务要使用AMap.service来实现，其他方法`new AMap.loadAMapLoader.load({plugins: ["AMap.PlaceSearch"]})`会报错
- 注意高德限流的问题，请求次数过多会返回undefined
- 搜索返回`USERKEY_PLAT_NOMATCH` 说明请求key与绑定平台不符 例如：开发者申请的是js api的key，却用来调web服务接口
- 返回`INVALID_USER_SCODE` 说明请求的密钥不正确
- 如果出现 `AMap is not defined`，请检查是否引入了高德地图的js文件
  加上vue.config.js配置

    ```js
    module.exports = {
        configureWebpack: {
            externals: {
                AMap: 'AMap',
                AMapUI: 'AMapUI'
            },
        }
    }
    ```

## 路径规划

```js
//路径规划

const PolicyType = ref('AMap.Driving') //默认 驾车
const driving = ref(null) //驾车路线规划
const walking = ref(null)  //步行路线规划
const riding = ref(null)  //保存骑行路线规划

//提交
function submitForm(formName) {
    // console.log('提交', formName);
    //判断出行工具
    var tools = ruleForm.value.TravelTools
    if (tools == 'AMap.Driving') {
        Driving()
    } else if (tools == 'AMap.Walking') {
        Walking()
    } else if (tools == 'AMap.Riding') {
        Riding()
    }
}

//出行工具 绑定值变化时
function TravelRadio(e) {
    if (e == 'AMap.Driving') {
        ruleForm.value.Policy = 'AMap.DrivingPolicy.LEAST_TIME'
    } else if (e == 'AMap.Riding') {
        ruleForm.value.Policy = 0
    }
    PolicyType.value = e
}


//驾车事件
function Driving() {

    AMap.service("AMap.Driving", function () {
        PolicyClear()//清除所有路线
        var pol = ruleForm.value.Policy
        var driv = null
        //判断出行策略
        if (pol == 'AMap.DrivingPolicy.LEAST_TIME') {
            driv = new AMap.Driving({
                map: map.value,
                policy: AMap.DrivingPolicy.LEAST_TIME,
            });
        } else if (pol == 'AMap.DrivingPolicy.LEAST_FEE') {
            driv = new AMap.Driving({
                map: map.value,
                policy: AMap.DrivingPolicy.LEAST_FEE,
            });
        } else if (pol == 'AMap.DrivingPolicy.LEAST_DISTANCE') {
            driv = new AMap.Driving({
                map: map.value,
                policy: AMap.DrivingPolicy.LEAST_DISTANCE,
            });
        } else if (pol == 'AMap.DrivingPolicy.REAL_TRAFFIC') {
            driv = new AMap.Driving({
                map: map.value,
                policy: AMap.DrivingPolicy.REAL_TRAFFIC,
            });
        }
        driving.value = driv
        var startLngLat = ruleForm.value.startVal.location
        var endLngLat = ruleForm.value.endVal.location
        //使用地点经纬度规划路线
        driving.value.search(startLngLat, endLngLat, (status, result) => {
            if (status === 'complete') {
                console.log('驾车路线', result);
                if (result.routes && result.routes.length) {
                    // 绘制第一条路线，也可以按需求绘制其它几条路线
                    drawRoute(result.routes[0])
                    ElMessage.success('绘制驾车路线完成')
                }
            } else {
                ElMessage.error('获取驾车数据失败：' + result)
            }
        })
    });

}

//步行事件
function Walking() {
    AMap.service("AMap.Walking", function () {
        PolicyClear()//清除所有路线
        walking.value = new AMap.Walking({
            map: map.value,
        });
        var startLngLat = ruleForm.value.startVal.location
        var endLngLat = ruleForm.value.endVal.location
        walking.value.search(startLngLat, endLngLat, (status, result) => {
            console.log("goView驾车路线规划status=", status);
            if (status === 'complete') {
                if (result.routes && result.routes.length) {
                    // 绘制第一条路线，也可以按需求绘制其它几条路线
                    drawRoute(result.routes[0])
                    ElMessage.success('绘制步行路线完成')
                }
            } else {
                ElMessage.error('获取步行数据失败：' + result);
            }
        })

    });
}

//骑行事件
function Riding() {
    AMap.service("AMap.Riding", function () {
        PolicyClear() //清除所有路线
        riding.value = new AMap.Riding({
            map: map.value,
            policy: ruleForm.value.Policy,
        });
        var startLngLat = ruleForm.value.startVal.location
        var endLngLat = ruleForm.value.endVal.location
        riding.value.search(startLngLat, endLngLat, (status, result) => {
            console.log("Riding骑行路线规划status=", status);
            if (status === 'complete') {
                if (result.routes && result.routes.length) {
                    // 绘制第一条路线，也可以按需求绘制其它几条路线
                    drawRoute(result.routes[0])
                    ElMessage.success('绘制骑行路线完成')
                }
            } else {
                ElMessage.error('获取骑行数据失败：' + result);
            }
        })

    });
}

//清除所有路线
function PolicyClear() {
    //清除驾车路线 这里2.0+可以使用以下api清除
    // if (driving.value) {
    //     driving.value.clear()
    //     driving.value = null
    // }
    // //清除步行路线
    // if (walking.value) {
    //     walking.value.clear()
    //     walking.value = null
    // }
    // //清除骑行路线
    // if (riding.value) {
    //     riding.value.clear()
    //     riding.value = null
    // }
    //清除所有路线
    map.clearMap()
}

function drawRoute(route) {
    var path = parseRouteToPath(route)

    var startMarker = new AMap.Marker({
        position: path[0],
        icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
        map: map
    })

    var endMarker = new AMap.Marker({
        position: path[path.length - 1],
        icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
        map: map
    })

    var routeLine = new AMap.Polyline({
        path: path,
        isOutline: true,
        outlineColor: '#ffeeee',
        borderWeight: 2,
        strokeWeight: 15,
        strokeColor: '#3366FF',
        lineJoin: 'round'
    })

    routeLine.setMap(map)

    // 调整视野达到最佳显示区域
    map.setFitView([startMarker, endMarker, routeLine])
}

// 解析DrivingRoute对象，构造成AMap.Polyline的path参数需要的格式
// DrivingResult对象结构参考文档 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DriveRoute
function parseRouteToPath(route) {
    var path = []

    if (route.rides && route.rides.length) {
        for (var i = 0, l = route.rides.length; i < l; i++) {
            var step = route.rides[i]

            for (var j = 0, n = step.path.length; j < n; j++) {
                path.push(step.path[j])
            }
        }
        return path
    }

    for (var i = 0, l = route.steps.length; i < l; i++) {
        var step = route.steps[i]

        for (var j = 0, n = step.path.length; j < n; j++) {
            path.push(step.path[j])
        }
    }

    return path
}
```

注意点：

## 清除路线/覆盖物方法

1. 直接操作覆盖物
   若路径是通过 AMap.Polyline 绘制的，需保存对象引用后移除：
    ```js
    // 声明全局变量存储路径对象
    let currentPolyline = null; 

    // 绘制路径时保存对象
    function drawRoute() {
    currentPolyline = new AMap.Polyline({
        path: routePath, // 路径坐标数组
        strokeColor: "#3366FF", 
        strokeWeight: 5
    });
    map.add(currentPolyline);
    }

    // 清除路径
    function clearRoute() {
        if (currentPolyline) {
            map.remove(currentPolyline); // 从地图移除
            currentPolyline = null; // 释放引用
        }
    }
    ```

2. 使用 AMap.Map.clearMap() 方法
   该方法会清除地图上的所有覆盖物，包括路径、标记等：
    ```js
    map.clearMap(); // 清除地图上的所有覆盖物
    ```
3. 使用 Driving/Riding 服务
    如果路径是通过 AMap.Driving 或 AMap.Riding 服务绘制的，可以使用它们的 clear 方法：
     ```js
     driving.clear(); // 清除驾车路线
     riding.clear(); // 清除骑行路线
     ```

**关键 API 参考**：

| 方法/属性 | 作用 |  文档 |
| -------- | ---- |
| map.remove(overlay) | 移除单个覆盖物 | AMap.Map |
| map.clearMap() | 清除地图上的所有覆盖物 | AMap.Map |
| AMap.Driving.clear() | 清除驾车路线 | AMap.Driving |
| AMap.Riding.clear() | 清除骑行路线 | AMap.Riding |
| AMap.Polyline.setMap(map) | 设置路径的地图实例 | AMap.Polyline |
|layer.clear()           |清空图层内容  | AMap.Layer |
