<script setup>
import { ref } from 'vue';
import request from "@/utils/request";
import { useRouter } from "vue-router";
import { useCodeStore } from "@/stores/code.js";

const codeStore = useCodeStore();
// const emit = defineEmits(['getEditorData']);
let props = defineProps(['editorData', 'language']);
const router = useRouter();

const submitCode = () => {
    // emit('getEditorData')
    // console.log(props.editorData, props.language)
    const data = {
        codeContent: props.editorData,
        language: props.language
    }

    if (!data.codeContent) {
        ElMessage.warning('代码不能为空');
        return;
    }

    request.post('/codes/upload', data).then(res => {
        // console.log(res);
        codeStore.setCodeData(res.data.data);
        router.push({ name: 'codeShow', params: { uniqueLink: res.data.data.uniqueLink } });
    });
}

const selectedTab = ref('tab1');

const selectTab = (tab) => {
    selectedTab.value = tab;
};

</script>

<template>
    <div class="container">
        <div class="select_btn">
        </div>
        <div class="btn-list">
            <button class="button active" @click="submitCode">提交</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;

    .btn-list {
        display: flex;
        margin-right: 0;

        .button {
            height: 40px;
            width: 80px;
            cursor: pointer;
            border-radius: 8px;
            font-size: 16px;
        }


        //.active {
        //    margin-right: 10px;
        //}

    }

    .select_btn {
        border-radius: 12px;

        .tab {
            display: inline-block;
            padding: 10px 20px;
            cursor: pointer;
            border: 1px solid #ccc;
            background-color: #FFFFFF;
        }

        .tab.active {
            background-color: #6962D0;
            color: #fff;
        }
    }

}

</style>