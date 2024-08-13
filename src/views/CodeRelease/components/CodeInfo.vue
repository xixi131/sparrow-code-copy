<script setup>
import { computed, ref } from 'vue';
import { useCodeReleaseStore } from "@/stores/codeRelease.js";
import request from "@/utils/request.js";
import { useRouter } from 'vue-router';

const router = useRouter();

const codeReleaseStore = useCodeReleaseStore();

const codeDescription = ref('');

const buttonClass = computed(() => {
    return codeDescription.value && codeDescription.value.trim() !== '' ? 'button' : 'button-disabled';
});

const saveDescription = () => {
    codeReleaseStore.setCodeReleaseDataByCodeDescription(codeDescription.value);

    const data = {
        title: codeReleaseStore.codeReleaseData.title,
        codeContent: codeReleaseStore.codeReleaseData.code.codeContent,
        codeLanguage: codeReleaseStore.codeReleaseData.code.language,
        description: codeReleaseStore.codeReleaseData.codeDescription,
    }

    request.post('/releases/upload', data).then(res => {
        console.log(res);
        if (res.data.code === 200009) {
            router.push({ name: 'home' })
        }
        
    }).catch(err => {
        console.log(err);
    });

};
</script>

<template>
    <div class="md-editor">
        <div class="md-title">
            <span>给您的代码一段详细的描述</span>
        </div>
        <div class="md-tips">
            <span>介绍您的代码内容</span>
        </div>
        <div>
            <v-md-editor v-model="codeDescription" height="400px" ></v-md-editor>
        </div>
        <div class="submit">
            <button :class="buttonClass" @click="saveDescription" :disabled="!codeDescription.trim()">发布</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.md-editor {
    display: flex;
    flex-direction: column;
    background: #FFFFFF;
    padding: 20px;
    border-radius: 12px;
    border: 1px solid #DEE3E8;

    box-shadow: 1px 1px 2px 2px #F6F7F7;
    margin-top: 20px;
    .md-title {
        font-size: 20px;
        font-weight: bold;
    }

    .md-tips {
        font-size: 14px;
        color: #636B74;
        margin: 10px 0 10px 0;
    }

    .submit {
        align-self: flex-end;
        width: 100%;
        display: flex;
        margin-top: 10px;
        .button {
            height: 40px;
            width: 80px;
            border-radius: 8px;
            font-size: 16px;
        }
        .button-disabled {
            height: 40px;
            width: 80px;
            border-radius: 8px;
            padding: 10px 16px;
            color: #909090;
            border: none;
            font-size: 16px;
            background: #F2F2F2;
        }
    }
}
</style>