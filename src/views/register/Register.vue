<script setup>
import { ref } from 'vue';
import Loading from "@/views/loading/Loading.vue";
import request from "@/utils/request.js";
import bcrypt from "bcryptjs";
import { useUserStore } from "@/stores/user.js";
import { useRouter } from "vue-router";

// 定义加载状态
let isLoading = ref(false);

// 定义响应式变量
const username = ref('');
const password = ref('');
// 定义错误状态对象
const errors = ref({
    usernameEmpty: false,
    passwordEmpty: false,
    usernameLength: false,
    passwordLength: false
});

// 定义正则表达式
const usernameRegex = /^[a-zA-Z0-9_]{4,12}$/;
const passwordRegex = /^[a-zA-Z0-9_!@#$%^&*]{8,18}$/;

// 定义盐值
const salt = ref("");
const userStore = useUserStore();
let router = useRouter();

// 校验函数
function validateInput(input, regex, emptyErrorKey, lengthErrorKey) {
    if (!input.value) {
        errors.value[emptyErrorKey] = true;
        return false;
    }
    if (!regex.test(input.value)) {
        errors.value[lengthErrorKey] = true;
        return false;
    }
    return true;
}

// 表单提交处理函数
const handleSubmit = async () => {

    // 重置错误提示
    Object.keys(errors.value).forEach(key => errors.value[key] = false);

    const isUsernameValid = validateInput(username, usernameRegex, 'usernameEmpty', 'usernameLength');
    const isPasswordValid = validateInput(password, passwordRegex, 'passwordEmpty', 'passwordLength');

    if (!isUsernameValid || !isPasswordValid) {
        return; // 如果校验失败，提前返回
    }

    // 校验通过后，可以继续提交表单数据
    console.log('提交表单', { username: username.value, password: password.value });

    // 开始加载
    isLoading.value = true;

    // 随机生成盐值
    // 加密需要加盐，这里使用 bcrypt 生成盐值
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password.value, salt);

    const data = {
        username: username.value,
        password: hashedPassword,
        salt: salt
    }

    request.post('/users/register', data,).then(res => {
        console.log(res);
        if(res.data.code === 200002){
            // 注册成功
            ElNotification({
                message: '注册成功，请登录',
                type: 'success',
                duration: 4000,
            });
            router.push('/login');
        }else {
            // 注册失败
            ElMessage({
                message: res.data.msg,
                type: 'error',
                plain: true,
            })
        }
    }).finally(() => {
        isLoading.value = false;
    });

}

</script>

<template>
    <div class="login">

        <div class="login-container">
            <!--            扩展第三方登录-->
            <div class="logo">
                <img src="@/components/imgs/logo.png" alt="logo" class="img-logo">
            </div>
            <div class="login-margin">
                <div class="login-padding">
                    <form @submit.prevent="handleSubmit">
                        <div class="login-topic">
                            <span class="topic-msg">用户名</span>
                        </div>
                        <div class="login-input">
                            <input type="text" placeholder="请输入用户名" class="input" v-model="username">
                            <span class="tips-msg" v-show="errors.usernameEmpty">用户名不能为空</span>
                            <span class="tips-msg" v-show="errors.usernameLength">用户名长度需在4到12字符之间</span>
                        </div>
                        <div class="login-topic">
                            <span class="topic-msg">密码</span>
                            <a class="forgot">忘记密码?</a>
                        </div>
                        <div class="login-input">
                            <input type="password" placeholder="请输入密码" class="input" v-model="password">
                            <span class="tips-msg" v-show="errors.passwordEmpty">密码不能为空</span>
                            <span class="tips-msg" v-show="errors.passwordLength">密码长度需在8到16字符之间</span>
                        </div>
                        <div class="login-button">
                            <button class="login-button-msg button" type="submit" :disabled="isLoading">
                                <Loading :show="false" v-if="isLoading"/>
                                <span v-else class="msg">注册</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="register">
                <span class="register-msg">
                    已有账户？<a class="forgot link" href="/login">登录</a>
                </span>
            </div>
        </div>
        <div class="hover-rectangles">
            <div class="rectangle"
                 v-for="(item, index) in otherLogin"
                 :style="{ backgroundColor : item.bgColor,color: item.color}"
                 :key="index"
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
    </div>
</template>

<style scoped lang="scss">
.login {
    background: #F1F2F3;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    position: relative;

    .login-container {
        width: 300px;

        .logo {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;

            .img-logo {
                height: 50px;
                width: 40px;
            }
        }

        .register {
            display: flex;
            justify-content: center;
            margin-top: 20px;

            .register-msg {
                font-size: 14px;
                color: #3B4045;

                .forgot {
                    cursor: pointer;
                    color: #1B75D0;
                    font-size: 14px;
                }
            }
        }

        .login-margin {
            background: #FFFFFF;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);

            .login-padding {
                display: flex;
                flex-direction: column;
                border-bottom: 1px solid #D6D9DC;
                padding-bottom: 20px;

                .login-topic {
                    margin-bottom: 6px;

                    .topic-msg {
                        font-weight: 600;
                        color: #3B4045;
                        cursor: pointer;
                    }

                    .forgot {
                        cursor: pointer;
                        float: right;
                        color: #1B75D0;
                        font-size: 12px;
                    }
                }

                .login-input {
                    margin-bottom: 18px;
                    width: 100%;

                    .input {
                        height: 44px;
                        width: 100%;
                        border: none;
                        border-radius: 6px;
                        padding: 10px;
                        box-sizing: border-box;
                        font-size: 15px;
                        background-color: #D6E8FA;
                    }

                    .tips-msg {
                        color: #FF4D4F;
                        font-size: 12px;
                        margin-top: 4px;
                    }
                }

                .login-button {

                    .login-button-msg {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        height: 44px;

                        .msg {
                            font-size: 16px;
                            color: #FFFFFF;

                        }
                    }
                }
            }
        }
    }

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
}
</style>
