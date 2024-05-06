import {createRouter, createWebHistory, useRoute} from "vue-router";

import HomeLayout from "../layout/HomeLayout.vue";
import Home from "../pages/Home/index.vue";
import Login from "../pages/Auth/Login.vue";
import Register from "../pages/Auth/Register.vue";
import Orders from "../pages/Order/index.vue";
import CheckOut from "../pages/Checkout/index.vue";
import Card from "../pages/Card/index.vue";
import ProductView from "../pages/Product/View.vue";
import Profile from "../pages/Profile/index.vue";

import NotFound from "../components/NotFound/index.vue";
import {useAuthStore} from "../stores/auth.js";


const routes = [
    {
        path: "/",
        name: "menu",
        component: HomeLayout,
        meta: {
            middleware: "guest",
        },
        children: [
            {
                path: "home",
                name: "home",
                component: Home,
                meta: {
                    middleware: "guest",
                },
            },
            {
                path: "login",
                name: "login",
                component: Login,
                meta: {
                    middleware: "guest",
                },
            },
            {
                path: "register",
                name: "register",
                component: Register,
                meta: {
                    middleware: "guest",
                },
            },
            {
                path: "product/:id",
                name: "product-view",
                component: ProductView,
                meta: {
                    middleware: "guest",
                },
            },
            {
                path: "orders",
                name: "orders",
                component: Orders,
                meta: {
                    middleware: "auth",
                },
            },
            {
                path: "cards",
                name: "cards",
                component: Card,
                meta: {
                    middleware: "auth",
                },
            },
            {
                path: "checkout/:id",
                name: "checkout",
                component: CheckOut,
                meta: {
                    middleware: "auth",
                },
            },
            {
                path: "profile/:id",
                name: "profile",
                component: Profile,
                meta: {
                    middleware: "auth",
                },
            },
        ]
    },
    {
        path: "/:pathMatch(.*)*",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const authUser = authStore.user;
    const requiresAuth = to.matched.some(record => record.meta.middleware !== 'guest');
    const avoidMenu = to.matched.some(record => record.name !== 'menu');
    console.log('avoidMenu',avoidMenu)
    console.log('requiresAuth',requiresAuth)

    if (!avoidMenu) {
        next({ name: 'home' });
    }
    if (requiresAuth && !authUser) {
        next({ name: 'login' });
    }
    next();
});

export default router;