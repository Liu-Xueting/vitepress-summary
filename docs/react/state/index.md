# React state & Reducer

[[toc]]

## State

```js
import { useState } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

export default function TaskApp() {
  const [tasks, setTasks] = useState(initialTasks);

  function handleAddTask(text) {
    setTasks([
      ...tasks,
      {
        id: nextId++,
        text: text,
        done: false,
      },
    ]);
  }

  function handleChangeTask(task) {
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          return task;
        } else {
          return t;
        }
      })
    );
  }

  function handleDeleteTask(taskId) {
    setTasks(tasks.filter((t) => t.id !== taskId));
  }

  return (
    <>
      <h1>布拉格的行程安排</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

let nextId = 3;
const initialTasks = [
  {id: 0, text: '参观卡夫卡博物馆', done: true},
  {id: 1, text: '看木偶戏', done: false},
  {id: 2, text: '打卡列侬墙', done: false},
];
```

这个组件的每个事件处理程序都通过 setTasks 来更新状态。随着这个组件的不断迭代，其状态逻辑也会越来越多。为了降低这种复杂度，并让所有逻辑都可以存放在一个易于理解的地方，你可以将这些状态逻辑移到组件之外的一个称为 reducer 的函数中。

Reducer 是处理状态的另一种方式。你可以通过三个步骤将 useState 迁移到 useReducer：

- 将设置状态的逻辑 修改 成 dispatch 的一个 action；
- 编写 一个 reducer 函数；
- 在你的组件中 使用 reducer。

## Reducer

1. 将设置状态的逻辑 修改 成 dispatch 的一个 action

```js
function handleAddTask(text) {
  dispatch({
    type: 'added',
    id: nextId++,
    text: text,
  });
}

function handleChangeTask(task) {
  dispatch({
    type: 'changed',
    task: task,
  });
}

function handleDeleteTask(taskId) {
  dispatch({
    type: 'deleted',
    id: taskId,
  });
}
```

你传递给 dispatch 的对象叫做 “action”：

```js
// "action" 对象：
{
    type: 'deleted',
    id: taskId,
}
```

2. 编写 一个 reducer 函数

React 会将状态设置为你从 reducer 返回的状态。

在这个例子中，要将状态设置逻辑从事件处理程序移到 reducer 函数中，你需要：

- 声明当前状态（tasks）作为第一个参数；
- 声明 action 对象作为第二个参数；
- 从 reducer 返回 下一个 状态（React 会将旧的状态设置为这个最新的状态）。

```js
function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('未知 action: ' + action.type);
    }
  }
}
```

3. 在你的组件中 使用 reducer

```js
import { useReducer } from 'react';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <>
      <h1>布拉格的行程安排</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}
```

useReducer 钩子接受 2 个参数：

- 一个 reducer 函数
- 一个初始的 state
  
它返回如下内容：

- 一个有状态的值
- 一个 dispatch 函数（用来 “派发” 用户操作给 reducer）
