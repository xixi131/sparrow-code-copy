import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../Layout/LayoutPage.vue'
import UserLogin from '@/views/login/Login.vue'
import Login from "@/views/login/Login.vue";
import Register from "@/views/register/Register.vue";
import Publicity from "@/components/Publicity.vue";
import BB from "@/components/MQCodeShare.vue";
import PromoPage from "@/components/PromoPage.vue";
import { useUserStore } from "@/stores/user.js";


// TODO:添加兜底路由
const routes = [

    {
        path: '/',
        name: 'Layout',
        component: Layout,
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('@/views/Home/index.vue')
            },
            {
                path: 'home',
                redirect: '/'  // 添加重定向规则
            },
            {
                path: 'users',
                name: 'users',
                component: () => import('@/views/Users/index.vue')
            },
            {
                path: 'snippet/:snippetId',
                name: 'snippet',
                component: () => import('@/views/Snippets/index.vue')
            },
            {
                path: 'share',
                name: 'codeShare',
                component: () => import('@/views/CodeUpload/index.vue')
            },
            {
                path: 'show/:uniqueLink',
                name: 'codeShow',
                component: () => import('@/views/CodeShow/index.vue'),
                props: true
            },
            {
                path: 'show',
                name: 'show',
                component: () => import('@/views/CodeShow/index.vue'),
                props: true
            },
            {
                path: 'release',
                name: 'release',
                component: () => import('@/views/CodeRelease/index.vue'),
                children: [
                    {
                        path: 'title',
                        name: 'title',
                        component: () => import('@/views/CodeRelease/components/Title.vue')
                    },
                    {
                        path: 'editor',
                        name: 'editor',
                        component: () => import('@/views/CodeRelease/components/CodeEditor.vue')
                    },
                    {
                        path: 'info',
                        name: 'info',
                        component: () => import('@/views/CodeRelease/components/CodeInfo.vue')
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/oauth2',
        name: 'oauth2',
        component: () => import('@/views/login/components/Oauth.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/bb',
        name: 'bb',
        component: BB
    },
    {
        path: '/publicity',
        name: 'publicity',
        component: Publicity
    },
    {
        path: '/promo',
        name: 'promo',
        component: PromoPage
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    if (localStorage.getItem("ThirdPartyCallback")) {
        // 如果是第三方登录回调，跳过用户会话检查
        next();
        return;
    }
    if (
        to.name !== 'login'
        && to.name !== 'register'
        && to.name !== 'codeShare'
        && to.name !== 'show'
        && to.name !== 'codeShow'
        && to.name !== 'publicity'
        && to.name !== 'bb'
        && to.name !== 'promo'
    ) {
        userStore.getUserInfo().then((res) => {
            console.log(res.data.code)
            if (res.data.code !== 200006) {
                userStore.setDialogVisible();
            }else {
                next();
            }
        }).catch((err) => {
            console.log(err);
            userStore.setDialogVisible();
        });
    }else {
        next();
    }
});

export default router
