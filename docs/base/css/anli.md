# 项目中常见 css 案例

## 1. 文字超出部分显示省略号

```css
.ellipsis {
  white-space: nowrap; /* 不换行 */
  overflow: hidden;    /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 显示省略号 */
}
```

## 2. 卡片两面翻转效果

```vue
<template>
    <div class="item item1" @click="sendMsg">
        <div class="card-inner">
            <div class="card-front">
                <img src="@/assets/image/integration/card1.png" alt="">
                <div class="text">产品信息更新</div>
            </div>
            <div class="card-back">
                <div class="back-text">淘宝平台上产品信息的更新</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .item {
        width: 288px;
        height: 382px;
        border-radius: 62px;
        perspective: 1200px;
        // border: 2px solid;
        padding: 76px 40px 96px 40px;
        // box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        transition: all 0.3s ease;

        .card-inner {
            width: 100%;
            height: 100%;
            position: relative;
            transition: transform 0.7s cubic-bezier(.25, .8, .25, 1);
            transform-style: preserve-3d;
        }

        &:hover .card-inner {
            transform: rotateY(180deg);
        }

        .card-front,
        .card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            backface-visibility: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-radius: 62px;
        }

        .card-front {
            z-index: 2;
        }

        .card-back {
            transform: rotateY(180deg);
            // background: #fff;
            z-index: 1;

            .back-text {
                font-family: Source Han Sans CN;
                font-weight: 500;
                font-size: 1.25rem;
                color: #171924;
                line-height: 1.75rem;
                text-align: center;
            }
        }

        img {
            width: 178px;
            height: 124px;
            margin-bottom: 40px;
        }

        .text {
            font-family: Source Han Sans CN;
            font-weight: 500;
            font-size: 20px;
            color: #171924;
            line-height: 28px;
        }
    }
    .item {
        animation: cardFadeIn 0.8s cubic-bezier(.25, .8, .25, 1) both;
        transition: box-shadow 0.3s, transform 0.3s;
        will-change: transform, box-shadow;
        position: relative;

        &:hover {
            transform: translateY(-18px) scale(1.04) rotate(-2deg);
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
            z-index: 2;
        }
    }
</style>
