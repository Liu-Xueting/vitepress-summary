# 前端权限框架

前端权限框架的设计是为了确保不同用户能够访问和操作不同的页面和功能模块。常见的权限控制模型包括基于角色的访问控制（RBAC）和访问控制列表（ACL）。在实际开发中，RBAC 是最常用的权限控制方案。

## 核心概念

用户（User）：系统的使用者，如张三、李四。

角色（Role）：权限的集合，如管理员、普通用户。

权限（Permission）：具体操作的最小单元，如 user:add、order:delete。

角色-权限映射：角色与权限的关联关系，如管理员拥有 user:add 和 user:delete

## 动态路由

动态路由是实现权限控制的核心技术之一。它根据用户的权限动态生成路由，确保用户只能访问有权限的页面。

实现步骤：

- 定义所有路由：在项目中定义所有可能的路由，包括需要权限控制的动态路由和公共路由。

```javascript
// router.js
import { createRouter, createWebHistory } from 'vue-router';

// 公共路由（无需权限）
const publicRoutes = [
{ path: '/login', component: () => import('@/views/Login.vue'), meta: { isPublic: true } },
{ path: '/403', component: () => import('@/views/403.vue'), meta: { isPublic: true } },
];

// 动态路由（需要权限）
const dynamicRoutes = [
{ path: '/dashboard', component: () => import('@/views/Dashboard.vue'), meta: { permission: 'dashboard_view' } },
{ path: '/profile', component: () => import('@/views/Profile.vue'), meta: { permission: 'profile_view' } },
{ path: '/admin', component: () => import('@/views/Admin.vue'), meta: { permission: 'admin_access' } },
];

const router = createRouter({
history: createWebHistory(),
routes: publicRoutes, // 初始化时只添加公共路由
});

export { router, dynamicRoutes };
```

- 用户登录后获取权限：用户登录后，从后端获取权限信息，并存储在 Vuex 中。

```javascript
// user.js
import { createStore } from 'vuex';

const user = createStore({
    state: {
    user: null,
    permissions: [], // 用户权限列表
},
mutations: {
    setUser(state, user) {
        state.user = user;
    },
    setPermissions(state, permissions) {
        state.permissions = permissions;
    },
},
actions: {
    async login({ commit }, { username, password }) {
        const userInfo = await api.login(username, password);
        const permissions = await api.getPermissions(userInfo.role);
        commit('setUser', userInfo);
        commit('setPermissions', permissions);
    },
},
});

export default user;
```

- 动态生成路由：根据用户权限动态生成路由表，并添加到路由实例中。(登录完之后就动态生成路由)

```javascript
// permission.js
import { router, dynamicRoutes } from './router';
import store from './store';

function hasPermission(permission, permissions) {
    return permissions.includes(permission);
}

function filterRoutes(routes, permissions) {
    return routes.filter(route => {
        if (route.meta?.isPublic) {
            return true; // 公共路由，无需权限
        }
        if (route.meta?.permission) {
            return hasPermission(route.meta.permission, permissions); // 校验权限
        }
        return true; // 默认允许访问
    });
}

// 后面的菜单根据路由动态生成
export function setupDynamicRoutes() {
    const permissions = store.state.permissions;
    const accessRoutes = filterRoutes(dynamicRoutes, permissions);
    accessRoutes.forEach(route => router.addRoute(route));
}

```

- 路由守卫校验权限：在路由跳转时，校验用户是否有权限访问目标路由。

```javascript
    // permission.js
router.beforeEach((to, from, next) => {
    const permissions = store.state.permissions;
    if (to.meta?.isPublic) {
        next(); // 公共路由，直接放行
    } else if (to.meta?.permission) {
    if (hasPermission(to.meta.permission, permissions)) {
        next(); // 有权限，放行
    } else {
        next('/403'); // 无权限，跳转到 403 页面
    }
    } else {
        next(); // 默认放行
    }
});
```
