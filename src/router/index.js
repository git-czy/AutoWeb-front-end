import {createRouter, createWebHistory} from "vue-router";

import LAYOUT from "@/layout/index.vue";
// 路由信息
const routes = [
    {
        path: "/",
        redirect: {name: 'home'},
        component: LAYOUT,
        children: [
            {
                path: "home",
                name: "home",
                component: () => import('@/page/home/index.vue'),
            },
            {
                path: "action",
                name: "action",
                component: () => import('@/page/action/index.vue'),
            },
            {
                path: "about",
                name: "about",
                component: () => import('@/page/about/index.vue'),
            },
        ]
    },

    {
        path: "/home",
        redirect: {name: '/home'},
    },
    {
        path: "/action",
        redirect: {name: '/action'},
    },
    {
        path: "/about",
        redirect: {name: '/about'},
    },

];

// 导出路由
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;

