# 两行动态布局

```vue
<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';

const showSidebar = ref(true);
const isResize = ref(true);

function dragControllerLR() {
  var resize = document.getElementsByClassName("resize");
  var left = document.getElementsByClassName("left");
  var mid = document.getElementsByClassName("mid");
  var box = document.getElementsByClassName("box");
  // console.log(document.getElementsByClassName("resize"));
  for (let i = 0; i < resize.length; i++) {
    // 鼠标按下事件
    resize[i].onmousedown = function (e) {
      //颜色改变提醒
      // resize[i].style.background = "#818181";
      var startX = e.clientX;
      resize[i].left = resize[i].offsetLeft;
      // 鼠标拖动事件
      document.onmousemove = function (e) {
        var endX = e.clientX;
        var moveLen = resize[i].left + (endX - startX); // （endx-startx）=移动的距离。resize[i].left+移动的距离=左边区域最后的宽度
        var maxT = box[i].clientWidth - resize[i].offsetWidth; // 容器宽度 - 左边区域的宽度 = 右边区域的宽度

        if (moveLen < 250) moveLen = 250; // 左边区域的最小宽度为50px
        if (moveLen > maxT - 350) moveLen = maxT - 350; //右边区域最小宽度为150px

        resize[i].style.left = moveLen; // 设置左侧区域的宽度

        for (let j = 0; j < left.length; j++) {
          left[j].style.width = moveLen + "px";
          mid[j].style.width = box[i].clientWidth - moveLen - 10 + "px";
        }
      };
      // 鼠标松开事件
      // eslint-disable-next-line no-unused-vars
      document.onmouseup = function (evt) {
        //颜色恢复
        // resize[i].style.background = "#d6d6d6";
        document.onmousemove = null;
        document.onmouseup = null;
        resize[i].releaseCapture && resize[i].releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
      };
      resize[i].setCapture && resize[i].setCapture(); //该函数在属于当前线程的指定窗口里设置鼠标捕获
      return false;
    };
  }
}

onMounted(() => {
  dragControllerLR()
  showSidebar.value = true
  getList()
})

</script>
<template>
<div class="courseInfoPage">
  <div class="content box">
    <div class="content-left left fadeInLeft animated" v-show="showSidebar">
    </div>
    <div class="ex-grid green resize " @click="showSidebar = !showSidebar" v-show="isResize">
      <el-tooltip class="item" effect="dark" :content="showSidebar ? '点击收缩,长按拖拽调整' : '点击展开'" placement="top">
        <el-icon class='el-icon' :size='24' style="color: white;">
          <ArrowRight v-show="showSidebar" />
          <ArrowLeft v-show="!showSidebar" />
        </el-icon>
      </el-tooltip>
    </div>
    <div class="content-right mid fadeInRight animated" ref="rightContent" v-loading='loading'>
      <div>
        <div v-show="showMode == 'precode' || showMode == 'pdf' || showMode == 'excel'" class="pdfBox"
          style="width: 100%;">
          <div v-if="docPath" class="pdf-container" ref="pdfContainer">
            <vue-pdf-embed ref="pdfEmbed" :source="docPath" class="vue-pdf-embed" @error="handlePdfError"
              @loading-failed="handlePdfError" @rendered="onPdfRendered" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.courseInfoPage {
  width: 85%;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-flow: column;
  font-family: Source Han Sans CN;
}

.videoBox {
  // width: 70%;
  height: 100%;
  margin: 20px auto;

  video {
    width: 100%;
    height: auto;
  }
}

.vue-pdf-embed canvas {
  height: 100% !important;
  width: 100% !important;
  display: block;
}

.content {
  flex: 1;
  height: 0;
  min-height: 0;
  width: 100%;
  /* min-height: 800px; */
  background: #ffffff;
  border-radius: 5px;
  /* margin: 30px auto; */
  overflow: hidden;
  display: flex;
  box-sizing: border-box;
  padding: 10px 10px 15px 10px;
}


.content-left {
  width: 25%;
  box-shadow: #e4e7ec 0px 0px 5px 5px;
  height: calc(100% - 69px);
  //overflow: auto;
  border-radius: 5px;
}

.content-right {
  text-align: left;
  padding: 45px 26px;
  flex: 1;
  width: 0;
  min-width: 0;
  height: calc(100% - 69px);
  overflow-y: auto;
  box-shadow: #e4e7ec 0px 0px 5px 5px;
  position: relative;
  border-radius: 5px;
}

.pdfBox {
  width: 100%;
  margin: 0 auto;
  border: 1px solid #EBEEF5;
  box-sizing: border-box;
  padding: 10px;
}


:deep(.el-collapse-item__header) {
  font-weight: 400;
  font-size: 16px;
  color: #14151C;
  line-height: 28px;
  border: none !important;
  background: #F7F8FC;
  border-radius: 4px;
  margin-bottom: 4px;
  padding-left: 14px;
  height: 36px;
}

:deep(.el-collapse) {
  border: none !important;
}

:deep(.el-collapse-item__wrap) {
  border: none !important;
}


.ex-grid {
  margin: auto;
  margin-right: .3125rem;
  width: 1.25rem;
  height: 5rem;
  background-color: #409eff;
  border-top-right-radius: .625rem;
  border-bottom-right-radius: .625rem;
  transform: perspective(.5rem) rotateX(0) rotateY(8deg) translateZ(0);
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.green {
  border: 0;
  border-radius: .3125rem;
  color: #fff;
  outline: none;
  position: relative;
}

.green:before {
  content: "";
  display: block;
  background: linear-gradient(to left, #fff0 50%, #fff6 50%);
  background-size: 210% 100%;
  background-position: right bottom;
  height: 100%;
  width: 100%;
  position: absolute;
  inset: 0;
  border-radius: .3125rem;
  transition: all 1s;
  -webkit-transition: all 1s;
}

.green[data-v-5e9d319b] {
  background-image: linear-gradient(to right, #25aae1, #5877ff);
}

.green:hover:before {
  background-position: left bottom;
  box-shadow: 0 4px 15px 0 #25aae1;
}

.category {
  margin: 20px;
  overflow: auto;
  height: 95%;

  .course_item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 20px;
    text-align: left;
    font-size: 16px;
    color: #14151C;
    line-height: 28px;
    font-weight: 400;
  }
}
</style>

<style lang='scss'>
.vue-pdf-embed canvas {
  height: 100% !important;
  width: 100% !important;
  display: block;
}

.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.animated.infinite {
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}

.animated.hinge {
  -webkit-animation-duration: 2s;
  animation-duration: 2s;
}

/*the animation definition*/
@-webkit-keyframes fadeInRight {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0)
  }

  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none
  }
}

@keyframes fadeInRight {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    -ms-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0)
  }

  100% {
    opacity: 1;
    -webkit-transform: none;
    -ms-transform: none;
    transform: none
  }
}

.fadeInRight {
  -webkit-animation-name: fadeInRight;
  animation-name: fadeInRight
}

/*base code*/
.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.animated.infinite {
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}

.animated.hinge {
  -webkit-animation-duration: 2s;
  animation-duration: 2s;
}

/*the animation definition*/
@-webkit-keyframes fadeOutRight {
  0% {
    display: block;
  }

  100% {
    display: none;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0)
  }
}

@keyframes fadeOutRight {
  0% {
    display: block;
  }

  100% {
    display: none;
    -webkit-transform: translate3d(100%, 0, 0);
    -ms-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0)
  }
}

.fadeOutRight {
  -webkit-animation-name: fadeOutRight;
  animation-name: fadeOutRight
}

/*base code*/
.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.animated.infinite {
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}

.animated.hinge {
  -webkit-animation-duration: 2s;
  animation-duration: 2s;
}

/*the animation definition*/
@-webkit-keyframes fadeInLeft {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0)
  }

  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none
  }
}

@keyframes fadeInLeft {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    -ms-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0)
  }

  100% {
    opacity: 1;
    -webkit-transform: none;
    -ms-transform: none;
    transform: none
  }
}

.fadeInLeft {
  -webkit-animation-name: fadeInLeft;
  animation-name: fadeInLeft
}
</style>
