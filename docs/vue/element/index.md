# Element Plus

## 自定义组件库样式

### 1. 全局样式

可以直接在 `<style>` 标签中定义全局样式，这些样式会对整个项目生效。例如：

```vue
<style>
    el-input__wrapper {
        width: 600px;
    }
</style>
```

这种方法简单直接，但需要谨慎使用，以免影响到其他组件。

### 2. 全局选择器

全局选择器的效果与全局样式类似，但可以在 `<style scoped>` 中使用，从而在组件中定义非全局和全局样式。例如：

```vue
<style scoped>
    :global(.el-input__wrapper) {
        width: 600px;
    }
</style>
```

这种方法可以更好地控制样式的作用范围。

### 3. 深度选择器

深度选择器用于定义子组件的专属样式，避免样式冲突。例如：

```vue
<style scoped>
    :deep(.el-input__wrapper) {
        width: 600px;
    }
</style>
```

这种方法推荐用于自定义子组件的样式。

### 4. 使用 SCSS 变量

Element Plus 使用 SCSS 编写，可以通过修改 SCSS 变量来自定义样式。首先，在项目中创建一个 SCSS 文件，例如 styles/element/index.scss，然后在其中覆盖 Element Plus 的样式变量：

```scss
@forward 'element-plus/theme-chalk/src/common/var.scss' with (
    $colors: (
        'primary': (
            'base': green,
        ),
    ),
);
```

在项目入口文件中导入这个样式文件：

```javascript
import { createApp } from 'vue';
import './styles/element/index.scss';
import ElementPlus from 'element-plus';
import App from './App.vue';

const app = createApp(App);
app.use(ElementPlus);
```

这种方法适用于需要大规模替换样式的场景。

### 5. 使用 CSS 变量

CSS 变量是一种灵活的方式，可以动态地改变组件内的个别变量。例如：

```css
:root {
    --el-color-primary: green;
}
```

或者在特定组件中使用内联样式：

```vue
<el-tag style="--el-tag-bg-color: red">Tag</el-tag>
```
