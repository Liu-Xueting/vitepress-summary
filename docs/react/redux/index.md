# Redux

## 基本使用

1. 安装 Redux Toolkit 和 React-Redux

    ```bash
    pnpm add @reduxjs/toolkit react-redux
    ```
2. 创建 Redux store

   创建 src/app/store.js 文件。从 Redux Toolkit 引入 configureStore API。

   ```js
   app/store.js
   import { configureStore } from '@reduxjs/toolkit'

    export default configureStore({
    reducer: {}
    })

   ```

   上面代码创建了 Redux store ，并且自动配置了 Redux DevTools 扩展 ，这样你就可以在开发时调试 store。

3. 为 React 提供 Redux Store

   创建 store 后，便可以在 React 组件中使用它。 在 src/index.js 中引入我们刚刚创建的 store , 通过 React-Redux 的 `<Provider>` 将 `<App>` 包裹起来,并将 store 作为 prop 传入。

    ```js
    index.js
    import React from 'react'
    import ReactDOM from 'react-dom'
    import './index.css'
    import App from './App'
    import store from './app/store'
    import { Provider } from 'react-redux'

    ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
    )
    ```

4. 创建 Redux slice

    Redux slice 是 Redux Toolkit 中的一个概念，它是一个包含 reducer 和 action 的对象。我们可以使用 createSlice 函数来创建一个 slice。

    ```js
    features/counter/counterSlice.js
    import { createSlice } from '@reduxjs/toolkit'

    export const counterSlice = createSlice({
        name: 'counter',
        initialState: {
            value: 0
        },
        reducers: {
            increment: state => {
            // Redux Toolkit 允许我们在 reducers 写 "可变" 逻辑。它
            // 并不是真正的改变状态值，因为它使用了 Immer 库
            // 可以检测到“草稿状态“ 的变化并且基于这些变化生产全新的
            // 不可变的状态
            state.value += 1
            },
            decrement: state => {
            state.value -= 1
            },
            incrementByAmount: (state, action) => {
            state.value += action.payload
            }
        }
    })
    // 每个 case reducer 函数会生成对应的 Action creators
    export const { increment, decrement, incrementByAmount } = counterSlice.actions

    export default counterSlice.reducer
    ```

5. 将 Slice Reducers 添加到 Store 中

   我们可以使用 useSelector 从 store 中读取数据，使用 useDispatch dispatch actions。
   创建包含 `<Counter>` 组件的 src/features/counter/Counter.js 文件，然后将该组件导入 App.js 并在 `<App>` 中渲染它。

   ```js
   features/counter/Counter.js
    import React from 'react'
    import { useSelector, useDispatch } from 'react-redux'
    import { decrement, increment } from './counterSlice'
    import styles from './Counter.module.css'

    export function Counter() {
        const count = useSelector(state => state.counter.value)
        const dispatch = useDispatch()

        return (
            <div>
            <div>
                <button
                aria-label="Increment value"
                onClick={() => dispatch(increment())}
                >
                Increment
                </button>
                <span>{count}</span>
                <button
                aria-label="Decrement value"
                onClick={() => dispatch(decrement())}
                >
                Decrement
                </button>
            </div>
            </div>
        )
    }
    ```

现在，每当你点击”递增“和“递减”按钮。

- 会 dispatch 对应的 Redux action 到 stores
- 在计数器切片对应的 reducer 中将看到 action 并更新其状态
- `<Counter>` 组件将从 store 中看到新的状态，并使用新数据重新渲染组件

**总结**：

- 使用 `configureStore` 创建 Redux store
  - `configureStore` 接受 reducer 函数作为命名参数
  - `configureStore` 使用的好用的默认设置自动设置 store
- 为 React 应用程序组件提供 Redux store
  - 使用 React-Redux `<Provider>` 组件包裹你的 `<App />`
  - 传递 Redux store 如 `<Provider store={store}>`
- 使用 `createSlice` 创建 Redux "slice" reducer
  - 使用字符串名称、初始状态和命名的 reducer 函数调用“createSlice”
  - Reducer 函数可以使用 Immer 来“改变”状态
  - 导出生成的 slice reducer 和 action creators
- 在 React 组件中使用 React-Redux `useSelector/useDispatch` 钩子
  - 使用 `useSelector` 钩子从 store 中读取数据
  - 使用 `useDispatch` 钩子获取 dispatch 函数，并根据需要 dispatch actions
