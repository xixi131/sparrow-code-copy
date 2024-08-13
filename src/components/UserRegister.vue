<script setup>
import { ref } from "vue";
import request from "@/utils/request";
import bcrypt from "bcryptjs";
import { useRouter } from "vue-router";
import CommonLoading from "@/assets/components/CommonLoading.vue";

const router = useRouter();
const checkbox = ref(false);
const username = ref("");
const password = ref("");
const loading = ref(false);

const submit = async () => {
    // 检查单选框是否被勾选
    if (!checkbox.value) {
        // 如果单选框没有被勾选，显示错误消息并返回
        ElMessage({
            message: '请先勾选同意条款后再注册',
            type: 'warning',
        });
        return;
    }

    // 正则表达式，要求密码至少8位，且必须包含至少一个字母和一个数字
    // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    const usernameRegex = /^[a-zA-Z0-9]{5,12}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;

    // 检查用户名是否符合要求
    if (!usernameRegex.test(username.value)) {
        // 如果用户名不符合要求，显示错误消息并返回
        ElMessage({
            message: '用户名必须是长度5到12位的字母或数字',
            type: 'warning',
        });
        return;
    }

    // 检查密码是否符合要求
    if (!passwordRegex.test(password.value)) {
        // 如果密码不符合要求，显示错误消息并返回
        ElMessage({
            message: '密码必须是长度8到15位，且必须包含至少一个字母和一个数字',
            type: 'warning',
        });
        return;
    }

    // 随机生成盐值
    // 加密需要加盐，这里使用 bcrypt 生成盐值
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password.value, salt);

    const data = {
        username: username.value,
        password: hashedPassword,
        salt: salt
    }
    loading.value = true;
    request.post('/users/register', data,).then(res => {
        console.log(res);
        if( res.data.code === 200002){
            // 注册成功
            loading.value = false;
            router.push('/login');
        }else {
            // 注册失败
            loading.value = false;
            ElMessage({
                message: res.data.msg,
                type: 'error',
                plain: true,
            })
        }
    });

};

</script>

<template>
    <div class="container_register">
        <div id="application">
            <div id="login_topic">
                <div id="login_mq">
                    <p>欢迎来到麻雀</p>

                </div>
                <div class="login_desc">
                    <p>注册您的账户</p>
                </div>
                <div id="login_account">
                    <p>已经拥有账户? <a @click="$router.push('/login')">登录</a></p>
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
                            <button type="submit" id="submit" style="display: block;" class="button">
                                <span v-if="!loading">注册</span>
                                <CommonLoading :isLoading="loading" />
                            </button>
                        </form>
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

}

.container_register {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #F0F4F9;
}

#application {
    background-color: #FFFFFF;
    border-radius: 30px;
    height: 700px;
    width: 1100px;
    display: flex;
}

#login_topic {
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


.button {
    margin-top: 20px;
    width: 300px;
    height: 50px;
    border-radius: 8px;
    font-size: 18px;
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
    margin-top: 20px;
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

a:hover {
    cursor: pointer;
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
    top: -16px;
    font-size: 18px;
    color: #1A73E8;
    background: white;
}

.item input[type="text"] {
    background-image: url('./imgs/用户.png');
    background-repeat: no-repeat;
    background-position: 10px center;
    background-size: 30px 30px;
    padding-left: 45px;

}

.item input[type="password"] {
    background-image: url('./imgs/锁头.png');
    background-repeat: no-repeat;
    background-position: 10px center;
    background-size: 22px 22px;
    padding-left: 45px;

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