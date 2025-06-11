# Props

## Props 校验

在 React 中，`Props` 是组件的输入参数。为了确保传递给组件的 `Props` 符合预期的类型和格式，我们可以使用 `PropTypes` 进行 `Props` 校验。

`PropTypes` 是 React 提供的一个库，用于定义和验证组件的 `Props` 类型。通过使用 `PropTypes`，我们可以在开发阶段捕获潜在的错误，并提供更好的文档和可读性。

使用步骤：

1. 安装 `prop-types` 库：

```bash
npm install prop-types
```

2. 在组件中导入 `PropTypes`：

```javascript
import PropTypes from 'prop-types';
```

3. 定义组件的 `PropTypes`：

```javascript
import React from 'react';
import PropTypes from 'prop-types';

const MyComponent = ({ name, age, isActive }) => {
    return (
        <div>
            <h1>{name}</h1>
            <p>Age: {age}</p>
            <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
        </div>
    );
};
MyComponent.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
    isActive: PropTypes.bool
};
// 默认值
MyComponent.defaultProps = {
    age: 18,
    isActive: false
};
export default MyComponent;
```
