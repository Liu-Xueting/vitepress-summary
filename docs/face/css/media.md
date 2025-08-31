# 适配方案

```css
/* 移动端（<600px） */
@media (max-width: 600px) {
  body { background: #ff9999; }
}

/* 平板（601px-1024px） */
@media (min-width: 601px) and (max-width: 1024px) {
  body { background: #99ff99; }
}

/* PC端（1025px-1200px） */
@media (min-width: 1025px) and (max-width: 1200px) {
  body { background: #9999ff; }
}

/* 大屏设备（>1200px） */
@media (min-width: 1200px) {
  body { background: #ffff99; }
}

```

大屏幕设备优先：大屏幕 桌面在1200px以上    大型设备（大台式电脑，1200px 以上）
中等屏幕 992px-1200px
@media screen and (max-width:1200px) { ... } /*中型设备（台式电脑，1200px 以下） */
小屏幕 768px-992px
@media screen and (max-width:992px){ ... }/* 小型设备（平板电脑，992px 以下） */
超小屏幕 768px屏幕以下
@media screen and (max-width:768px){ ... }/* 超小型设备（手机，768px 以下） */
或者
@media screen and (max-width:768px){ ... }/* 超小型设备（手机，767px 以下） */
    /* 注意：此时超小屏幕和小屏幕在768px之间有冲突，怎么解决？
    把超小屏幕的区间降低1px*/

手机（移动设备）：小于等于 480px
平板电脑和小型笔记本电脑：481px – 768px
普通笔记本电脑和桌面电脑：769px – 1024px
大型桌面电脑：1025px – 1200px
高分辨率桌面电脑：大于 1201px
