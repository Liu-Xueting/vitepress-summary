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
