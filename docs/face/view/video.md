# 视频播放进度记录

## 前端实现

1. 监听视频播放进度

```javascript
const videoElement = document.querySelector('video');
// 定期保存播放进度
videoElement.addEventListener('timeupdate', () => {
   const currentTime = videoElement.currentTime;
   localStorage.setItem('videoProgress', currentTime); // 保存到本地存储
});
```

2. 页面加载时恢复播放进度

```javascript
window.addEventListener('load', () => {
   const savedTime = localStorage.getItem('videoProgress');
   if (savedTime) {
       videoElement.currentTime = savedTime; // 恢复播放进度
   }                                        
    videoElement.play(); // 自动播放
});
```

3. 离开页面时保存进度

```javascript
window.addEventListener('beforeunload', () => {
   const currentTime = videoElement.currentTime;
   localStorage.setItem('videoProgress', currentTime); // 保存到本地存储
});
```

## 后端实现

1. 数据库设计

创建一个表来存储用户的视频播放进度

```sql
CREATE TABLE video_progress (
   id BIGINT AUTO_INCREMENT PRIMARY KEY,
   user_id BIGINT NOT NULL,
   video_id BIGINT NOT NULL,
   progress INT NOT NULL, -- 播放进度（单位：秒）
   update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   UNIQUE (user_id, video_id)
);
```

2. 保存播放进度的接口

```java
app.post('/saveProgress', (req, res) => {
   const { userId, videoId, currentTime } = req.body;
   // 更新数据库逻辑
});
```

3. 获取播放进度的接口

```java
app.get('/getProgress', (req, res) => {
   const { userId, videoId } = req.query;
   // 查询数据库逻辑
});
```

优化与注意事项

高频率更新：前端每隔10秒发送一次心跳请求，减少误差。

隐私保护：使用HTTPS传输数据，确保安全性。

多视频支持：为每个视频分配唯一标识符，避免混淆。

注意：

这个需要前后端做最好，因为网页关闭的话，你没法马上同步进度，但是后端的分发服务知道当前用户分发到哪了；比如hls，一个**分片**是5s，前端播放的时候把**分片标号**同步下来，这样就算前端当前播放的分片没有同步下来，上一个分片的进度也会同步下来，算上比较极端的情况，误差也不会大于10s左右，这个完全可以接受；后端记录前端拿了多少分片，分片的标号，前端发送当前播放分片的标号，这里用前端同步主要是考虑预加载的情况，避免误差过大

## 示例

```vue

<template>

<!-- F:\projects\aitraining_web\src\views\course\classInfos.vue -->
<div v-if="resourceType == 'video'" class="video-wrapper">
   <video ref="videoPlayer" src="" controls poster preload="metadata" @timeupdate="onTimeUpdate"
      @loadedmetadata="onVideoLoaded" @ended="onVideoEnded">
      <p>您的浏览器不支持HTML5视频播放。</p>
   </video>
   <button v-if="showPlayButton" @click="playVideo" class="play-button">
      <img src="@/assets/image/index/play.png" alt="" style="width: 100px" />
   </button>
</div>
</template>

<script lang="js" setup>


// 设置资源显示(这里一般是页面加载得时候调用, 传入资源URL)
const setupResourceDisplay = (url) => {
  resourceUrl.value = url;
  resourceType.value = detectFileType(url);

  // 清除之前的定时器
  stopAllTimers();

  switch (resourceType.value) {
    case "video":
      setupVideoPlayer(url);
      break;
    case "ppt" || "pptx":
      setupPPTViewer(url);
      break;
    case "pdf":
      setupPDFViewer(url);
      // 为PDF启动定时保存
      // startPdfSaveTimer()
      break;
    default:
      console.log("不支持的文件类型");
  }
};


// 设置视频播放器
const setupVideoPlayer = (url) => {
  if (videoPlayer.value) {
    videoPlayer.value.src = url;
    videoPlayer.value.load();

    videoPlayer.value.onloadedmetadata = () => {
      if (courseData.value.userStudy?.currentDuration) {
        const lastWatchedTime = courseData.value.userStudy.currentDuration;
        const seekTime = Math.min(lastWatchedTime, videoPlayer.value.duration);
        videoPlayer.value.currentTime = seekTime;
        currentTime.value = seekTime;
        console.log(`视频定位到上次观看位置: ${Math.floor(seekTime)}秒`);
      }
    };
  }
};

// 保存学习记录
const SaveUserLearningrRecordsFun = () => {
  let params;
  if (resourceType.value === "video") {
    params = {
      id: courseData.value.userStudy?.id,
      currentDuration: Math.floor(currentTime.value),
    };
  } else if (resourceType.value === "pdf") {
    params = {
      id: courseData.value.userStudy?.id,
      currentPage: currentPdfPage.value,
      total: totalPdfPages.value,
    };
  } else {
    params = {
      // id: courseData.value.userStudy?.id,
      // currentDuration: Math.floor(currentTime.value),
    };
  }
  console.log(params, "params");

  SaveUserLearningrRecords(params)
    .then((res) => {
      if (res.code == 200) {
        // console.log("学习记录保存成功:", res);
      }
    })
    .catch((err) => {
      console.error("学习记录保存失败:", err);
    });
};


// 视频时间更新
const onTimeUpdate = () => {
  if (videoPlayer.value) {
    currentTime.value = videoPlayer.value.currentTime;

    // 检查视频是否正在播放
    isVideoPlaying.value = !videoPlayer.value.paused;

    // 如果视频暂停，停止定时保存
    if (videoPlayer.value.paused) {
      stopSaveTimer();
    } else if (!saveTimer.value) {
      // 如果视频正在播放但定时器未启动，启动定时器
      startSaveTimer();
    }

    // 如果当前视频已播放完成 并且为100%，则保存学习记录
    if (duration.value > 0 && currentTime.value == duration.value) {
      videoWatched.value = true;
      // 保存学习记录
      SaveUserLearningrRecordsFun();
    }
  }
};

// 视频加载完成
const onVideoLoaded = () => {
  if (videoPlayer.value) {
    duration.value = videoPlayer.value.duration;

    // 设置视频当前时长到上次观看的位置
    if (courseData.value.userStudy?.currentDuration) {
      const lastWatchedTime = courseData.value.userStudy.currentDuration;
      // 确保时间不超过视频总时长
      const seekTime = Math.min(lastWatchedTime, duration.value);
      videoPlayer.value.currentTime = seekTime;
      currentTime.value = seekTime;
      console.log(`视频定位到上次观看位置: ${Math.floor(seekTime)}秒`);
    }

    // 监听播放事件
    videoPlayer.value.addEventListener("play", () => {
      isVideoPlaying.value = true;
      startSaveTimer();
    });

    // 修改：监听暂停事件 - 暂停时也保存一次
    videoPlayer.value.addEventListener("pause", () => {
      isVideoPlaying.value = false;
      stopSaveTimer();
      // 暂停时保存一次
      SaveUserLearningrRecordsFun();
    });

    // 监听寻址事件（用户拖拽进度条）
    videoPlayer.value.addEventListener("seeking", () => {
      if (isVideoPlaying.value) {
        stopSaveTimer();
      }
    });

    // 监听寻址完成事件
    videoPlayer.value.addEventListener("seeked", () => {
      if (isVideoPlaying.value) {
        startSaveTimer();
      }
    });
  }
};

// 修改：停止定时保存（视频）
const stopSaveTimer = () => {
  if (saveTimer.value) {
    clearInterval(saveTimer.value);
    saveTimer.value = null;
  }
};

// 新增：停止所有定时器
const stopAllTimers = () => {
  stopSaveTimer();
  stopPdfSaveTimer();
};

// 修改：开始定时保存（视频）
const startSaveTimer = () => {
  if (saveTimer.value) {
    clearInterval(saveTimer.value);
  }

  saveTimer.value = setInterval(() => {
    if (isVideoPlaying.value && currentTime.value > 0) {
      SaveUserLearningrRecordsFun();
    }
  }, 1000); // 改为每1秒执行一次
};


// 修改：视频播放结束
const onVideoEnded = () => {
  videoWatched.value = true;
  isVideoPlaying.value = false;
  stopSaveTimer(); // 停止定时保存
  SaveUserLearningrRecordsFun(); // 结束时保存一次

  ElMessage.success("视频观看完成！");
};


</script>

