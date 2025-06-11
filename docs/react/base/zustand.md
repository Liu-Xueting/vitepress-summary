# zustand

极简的状态管理工具

## 安装

```bash
pnpm add zustand --save
```

## 使用

```typescript
import create from 'zustand';
// import { persist } from 'zustand/middleware';

// 1. 创建 store

const useStore = create((set) => ({
    count: 0,
    increase: () => set((state) => ({ count: state.count + 1 })),
    decrease: () => set((state) => ({ count: state.count - 1 })),
}));

// 2. 使用 store

function Counter() {
    const { count, increase, decrease } = useStore();
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increase}>Increase</button>
            <button onClick={decrease}>Decrease</button>
        </div>
    );
}
```

## zustand 异步支持

对于异步的支持不需要特殊的操作，直接在函数中编写异步逻辑，最后只需要 **调用set方法传入新状态** 即可

```typescript
import create from 'zustand';

const useStore = create((set) => ({
    count: 0,
    increase: async () => {
        const res = await fetch('https://api.example.com/increase');
        const data = await res.json();
        set({ count: data.count });
    },
    decrease: async () => {
        const res = await fetch('https://api.example.com/decrease');
        const data = await res.json();
        set({ count: data.count });
    },
}));
```

## zustand 切片模式

当单个store过于庞大时，可以使用 **切片模式** ，将store拆分成多个小的store，最后通过combine函数将它们组合在一起，类似于模块化

```typescript
import create from 'zustand';

const createCounterSlice = (set) => ({
    count: 0,
    increase: () => set((state) => ({ count: state.count + 1 })),
    decrease: () => set((state) => ({ count: state.count - 1 })),
});

const createUserSlice = (set) => ({
    user: null,
    setUser: (user) => set({ user }),
});

const useStore = create((...a) => ({
    ...createCounterSlice(...a),
    ...createUserSlice(...a),
}));

function Counter() {
    const { count, increase, decrease } = useStore();
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increase}>Increase</button>
            <button onClick={decrease}>Decrease</button>
        </div>
    );
}
function User() {
    const { user, setUser } = useStore();
    return (
        <div>
            <h1>{user ? user.name : 'No user'}</h1>
            <button onClick={() => setUser({ name: 'John' })}>Set User</button>
        </div>
    );
}
```
