<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const showTips = ref(true);

const checkRoute = () => {
    showTips.value = !(router.currentRoute.value.name === 'title'
        || router.currentRoute.value.name === 'editor'
        || router.currentRoute.value.name === 'info');
};

watch(() => router.currentRoute.value, checkRoute);

onMounted(checkRoute);

const changeFlag = () => {
    router.push({ name: 'title' });
};
</script>

<template>
    <div class="code-release-container">
        <div v-if="showTips">
            <div class="code-h1">
                <h1 class="h1">公开一段您的代码</h1>
            </div>
            <div class="code-msg">
                <div class="msg-container">
                    <div class="msg-title">
                        <span>发布一段代码</span>
                    </div>
                    <div class="msg">
                        <span>您准备好一段代码，此表格将帮助您完成整个发布过程。</span>
                    </div>
                    <div class="msg-step">
                        <span class="step">步骤</span>
                        <ul>
                            <li>用一行标题总结您的代码</li>
                            <li>复制您的代码</li>
                            <li>用一段描述详细说明您的代码</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="btn-container">
                <button class="button" @click="changeFlag">开始</button>
            </div>

        </div>

        <router-view/>

    </div>

</template>

<style scoped lang="scss">
.code-release-container {


    .code-msg {
        background: #EDF5FD;
        border-radius: 10px;
        border: 1px solid #92C2F2;
        width: 72%;
        //box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);

        .msg-container {
            padding: 20px;
            //background: #1A73E8;
            .msg-title {
                margin-top: 20px;
                font-size: 24px;
                //font-weight: bold;
                color: #3B4045;
            }

            .msg {
                margin-top: 10px;
                font-size: 16px;
                color: #3B4045;

            }

            .msg-step {

                margin-top: 10px;
                font-size: 16px;
                color: #3B4045;

                .step {
                    font-weight: bold;
                    font-size: 18px;

                }
            }
        }
    }

    .btn-container {
        margin-top: 10px;
        .button {
            height: 40px;
            width: 80px;
            cursor: pointer;
            border-radius: 8px;
            font-size: 16px;
        }
    }

}
</style>