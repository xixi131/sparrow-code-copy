<script setup>
import { ref } from "vue";
import request from "@/utils/request";
import bcrypt from "bcryptjs";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.js";
import CommonLoading from "@/assets/components/CommonLoading.vue";

const userStore = useUserStore();
const loading = ref(false);
let router = useRouter();
const checkbox = ref(false);
const username = ref("");
const password = ref("");
const salt = ref("");

const submit = async () => {
    loading.value = true;
    // 检查单选框是否被勾选
    if (!checkbox.value) {
        // 如果单选框没有被勾选，显示错误消息并返回
        ElMessage({
            message: '请先勾选同意条款后再注册',
            type: 'warning',
        });
        loading.value = false;
        return;
    }

    const usernameValue = username.value;

    try {
        // 获取用户的盐值
        const res = await request.get('/users/salt', { params: { username: usernameValue } }).then(res => {
            if (res.data.code === 200004) {
                return res;
            }
            loading.value = false;
            return false;
        });

        if (res === false) {
            ElMessage({
                message: '该用户不存在',
                type: 'error',
                plain: true,
            })
            loading.value = false;
            return;
        }
        salt.value = res.data.data;

        const hashedPassword = bcrypt.hashSync(password.value, salt.value)

        request.post('/users/login', { username: usernameValue, password: hashedPassword }, {}).then(res => {
            if (res.data.code === 200001) {
                userStore.setUserInfo(res.data.data);
                router.push('/home');
                loading.value = false;
            }else {

                ElMessage({
                    message: res.data.msg,
                    type: 'error',
                    plain: true,
                })
                loading.value = false;
            }
        });

    } catch (error) {
        console.error('Error occurred:', error);
    }

};

</script>


<template>
    <div class="container_login">
        <div id="application">
            <div id="login_topic">
                <div id="login_mq">
                    <p>欢迎来到麻雀</p>
                </div>
                <div class="login_desc">
                    <p>登录您的账户</p>
                </div>
                <div id="login_account">
                    <p>还未拥有账户? <a @click="$router.push('/register')">注册</a></p>
                </div>
            </div>
            <div id="login_container">
                <div id="login_right">
                    <div id="login_description">
                        <p>输入您的账户</p>
                    </div>
                    <div id="login" class="login">
                        <form @submit.prevent="submit">
                            <div class="item">
                                <input type="text" autocomplete="off" id="tel" required name="tel" value=""
                                       class="input"
                                       v-model="username">
                                <label for="tel">用户名</label>
                            </div>
                            <div class="item">
                                <input type="password" autocomplete="off" id="pwd" required name="pwd" value=""
                                       class="input"
                                       v-model="password">
                                <label for="pwd">密码</label>
                            </div>
                            <input type="checkbox" id="checkbox1" v-model="checkbox">
                            <label for="checkbox1" id="check">我同意条款和条件</label>

                            <button type="submit" style="display: block;" class="button">
                                <span v-if="!loading">登录</span>
                                <CommonLoading :isLoading="loading" />
                            </button>

                        </form>
<!--                        <div class="img-con">-->
<!--                            <img src="./imgs/stackoverflow.png" class="img3" alt="stackoverflow">-->
<!--                            <img src="./imgs/github.png" class="img3" alt="github">-->
<!--                            <img src="./imgs/Facebook%20(1).png" class="img3" alt="Facebook">-->
<!--                            <img src="./imgs/qq%20(1).png" class="img3" alt="qq">-->
<!--                        </div>-->
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>
body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
}

.container_login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* 设置为视口的高度，使元素垂直居中 */
    background: #F0F4F9;
}

.img3 {
    height: 34px;

    margin-top: 10px;
}

img:hover {
    cursor: pointer;
}

#application {
    background-color: #FFFFFF;
    border-radius: 30px;
    height: 700px;
    width: 1100px;
    display: flex;

}

/* 鼠标移入后移动的效果 */
/* #application:hover {
    transform: translateY(-10px);
} */
#login_topic {
    /* background-color: red; */
    border-radius: 40px;
    height: 700px;
    width: 550px;
}

#login_container {

    border-radius: 40px;
    width: 550px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}



#login_account:hover {
    cursor: pointer;
}

/* 鼠标点击input输入框后的效果 */
/* .input:focus {
    border-color: #1A73E8;
    border-width: 2px;
    outline: none;
} */
.button {
    margin-top: 20px;
    width: 300px;
    height: 50px;
    border-radius: 8px;
    font-size: 18px;
}

.img-con {
    display: flex;
    justify-content: space-around;
}

.login #checkbox1 {
    width: 16px;
    height: 16px;
}


#checkbox1,
#check {
    vertical-align: middle;
}

#login_description p {
    font-size: 22px;
    font-weight: 540;
}

#login_mq p {
    font-size: 50px;
    font-weight: 540;
    color: black;
    margin-top: 200px;
    margin-left: 100px;
    margin-bottom: 20px;
}

.login_desc p {
    font-size: 36px;
    font-weight: 500;
    color: black;
    margin-left: 100px;
}

#login_account p {
    font-size: 18px;
    font-weight: 500;
    margin-left: 100px;

}

a {
    color: #1A73E8;
    text-decoration: none;
    position: relative;
}

a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #1A73E8;
    visibility: hidden;
    transition: all 0.3s ease-in-out;
}

a:hover::after {
    visibility: visible;
    width: 100%;
}

.item {
    position: relative;
    margin-top: 10px;
    width: 200px;
}

.item label {
    position: absolute;
    top: calc((30px - 4px) / 2);
    left: 50px;
    font-size: 15px;
    pointer-events: none;
    transition: all 0.5s;
    color: gray;
}

.item input {
    box-sizing: border-box;
    border: 1px solid lightgray;
    margin-bottom: 10px;
    border-radius: 10px;
    width: 300px;
    outline: none;
    height: 50px;
    padding-left: 10px;
    font-size: 16px;
}

.item input:focus + label,
.item input:valid + label {
    top: -14px;
    font-size: 18px;
    color: #1A73E8;
    background: white;
}

.item input[type="text"] {
    background-image: url('./imgs/用户.png'); /* 设置背景图片 */
    background-repeat: no-repeat; /* 图片不重复 */
    background-position: 10px center; /* 图片位置在左边中间 */
    background-size: 30px 30px; /* 设置图片大小 */
    padding-left: 45px; /* 添加左边距 */
    /* 其他样式 */
}

.item input[type="password"] {
    background-image: url('./imgs/锁头.png'); /* 设置背景图片 */
    background-repeat: no-repeat; /* 图片不重复 */
    background-position: 10px center; /* 图片位置在左边中间 */
    background-size: 22px 22px; /* 设置图片大小 */
    padding-left: 45px; /* 添加左边距 */
}

a:hover {
    background-color: transparent;
}

.item input[type="text"]:focus,
.item input[type="password"]:focus {
    outline: none;
    border: none;
    box-shadow: 2px 2px 2px 2px #1A73E8;
    background-position: 10px center;
    padding-left: 45px;
}

#check {
    margin-left: 10px;
}

</style>