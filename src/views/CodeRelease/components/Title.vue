<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCodeReleaseStore } from "@/stores/codeRelease.js";

const router = useRouter();

const codeReleaseStore = useCodeReleaseStore();

const titleData = ref('');

const buttonClass = computed(() => {
    return titleData.value && titleData.value.trim() !== '' ? 'button' : 'button-disabled';
});

const saveTitle = () => {
    codeReleaseStore.setCodeReleaseDataByTitle(titleData.value);
    router.push({ name: 'editor' });
};

</script>

<template>
    <div class="title-container">
        <div class="title-item">
            <div class="title">
                <span>标题</span>
            </div>
            <div class="title-msg">
                <span>请给您的代码片段起一个标题，有助于他人更好地理解您的代码</span>
            </div>
            <div class="title-input">
                <form class="input-form">
                    <input type="text" class="input" v-model="titleData"/>
                </form>
            </div>
            <div class="btn-container">
                <button :class="buttonClass" @click="saveTitle" :disabled="!titleData.trim()">下一步</button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.title-container {
    width: 100%;
    display: flex;
    justify-content: center;

    .title-item {
        width: 72%;
        max-width: 1200px;
        margin: 0 auto;

        .title {
            margin-top: 20px;
            font-size: 20px;
            font-weight: bold;
        }

        .title-msg {
            margin-top: 10px;
            font-size: 14px;
            color: #666;
        }

        .title-input {
            margin-top: 10px;

            .input-form {
                width: 100%;
                display: flex;
                justify-content: center;

                .input {
                    width: 100%;
                    height: 40px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    padding: 0 10px;
                    font-size: 16px;

                }
            }
        }

        .btn-container {
            margin-top: 10px;

            .button {
                height: 40px;
                width: 80px;
                border-radius: 8px;
                font-size: 16px;
            }

            .button-disabled {
                border-radius: 8px;
                padding: 10px 16px;
                color: #909090;
                border: none;
                font-size: 16px;
                background: #F2F2F2;
            }

        }
    }
}
</style>