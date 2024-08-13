<script setup>
import { ref } from 'vue';
import GoogleLogo from '../images/Google_logo.png';
import GithubLogo from "../images/github_logo.svg";
import FacebookLogo from "../images/facebook_logo.png";
import WeChatLogo from "../images/wechat_logo.png";
import { googleLogin } from '../composable/google_login.js';
import { githubLogin } from '../composable/github_login.js';
import Loading from "@/views/loading/Loading.vue";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import request from "@/utils/request.js";
import { useUserStore } from "@/stores/user.js";

const authState = import.meta.env.VITE_APP_STATE;
const google = import.meta.env.VITE_APP_GOOGLE;
const github = import.meta.env.VITE_APP_GITHUB;
const facebook = import.meta.env.VITE_APP_FACEBOOK;
const wechat = import.meta.env.VITE_APP_WECHAT;

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

let isLoading = ref(false);

const otherLogin = [
    {
        name: google,
        img: GoogleLogo,
        bgColor: '#FFFFFF',
        imgWidth: '36px',
        imgHeight: '36px',
        color: '#000000'
    },
    {
        name: github,
        img: GithubLogo,
        bgColor: '#000000',
        imgWidth: '60px',
        imgHeight: '60px',
        color: '#FFFFFF'
    },
    {
        name: facebook,
        img: FacebookLogo,
        bgColor: '#385499',
        imgWidth: '34px',
        imgHeight: '34px',
        color: '#FFFFFF'
    },
    {
        name: wechat,
        img: WeChatLogo,
        bgColor: '#1AAD19',
        imgWidth: '38px',
        imgHeight: '38px',
        color: '#FFFFFF'
    },
];

const handleCallback = async () => {
    const { query, hash } = route;

    // 调试输出 query 和 hash
    console.log('Query:', query);
    console.log('Hash:', hash);

    const state = localStorage.getItem(authState);

    if (state === google && hash.includes('id_token')) {
        localStorage.setItem("ThirdPartyCallback", true);
        const params = new URLSearchParams(hash.replace('#', ''));
        const idToken = params.get('id_token');
        console.log('ID Token:', idToken);
        if (idToken) {
            const response = await request.post('/oauth2/google', { token: idToken });
            if (response.data.code !== 200026) {
                console.error('登录失败', response.data);
                return;
            }
            console.log('登录成功', response.data);
            userStore.setUserInfo(response.data.data);
            await router.push({ path: '/' });
            localStorage.removeItem(authState);
        }else {
            console.error('Google 回调没有找到 ID token');
        }
    }else if (state === github && query.code) {
        localStorage.setItem("ThirdPartyCallback", true);
        const code = query.code;
        console.log('GitHub Code:', code);
        if (code) {
            const response = await request.post('/oauth2/github', { code: code });
            if (response.data.code !== 200027) {
                console.log('登录失败', response.data);
                return;
            }
            console.log('登录成功', response.data);
            userStore.setUserInfo(response.data.data);
            await router.push({ path: '/' });
            localStorage.removeItem(authState);
        }else {
            console.error('未找到 GitHub 登录的 code');
        }
    }else {
        console.warn('当前页面不是回调页面，无需处理回调逻辑');
    }
};


onMounted(() => {
        handleCallback();
    }
)

const oauth2 = (name) => {
    isLoading.value = true;
    switch (name) {
        case 'Google':
            console.log(name);
            googleLogin(name);
            break;
        case 'Github':
            console.log('Github');
            githubLogin(name);
            break;
        case 'Facebook':
            console.log('Facebook');
            break;
        case 'WeChat':
            console.log('WeChat');
            break;
    }
}

</script>

<template>
    <Loading :show="true" v-show="isLoading" :color="'#000000'"/>
    <div class="hover-rectangles">
        <div class="rectangle"
             v-for="(item, index) in otherLogin"
             :style="{ backgroundColor : item.bgColor,color: item.color}"
             :key="index"
             @click="oauth2(item.name)"
        >
            <div class="img-con">
                <img :src="item.img" class="img" alt=""
                     :style="{ height: item.imgHeight,width : item.imgWidth}"
                >
            </div>
            <div class="msg-con">
                <span>使用 {{ item.name }} 登录</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.hover-rectangles {
    position: fixed;
    right: 0;
    top: 33%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .rectangle {
        cursor: pointer;
        height: 72px;
        transform: translateX(138px);
        transition: transform 0.3s ease;
        border-radius: 8px 0 0 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FF4D4F;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);

        .img-con {
            height: 100%;
            width: 70px;
            display: flex;
            justify-content: center;
            align-items: center;

            .img {
                height: 50px;
                width: 50px;
                margin-left: 0;
            }
        }

        .msg-con {
            flex: 1;
        }

        &:hover {
            transform: translateX(0);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
    }
}
</style>