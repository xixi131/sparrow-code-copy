<script setup>
import * as monaco from 'monaco-editor';
import { computed, onMounted, ref } from 'vue';
import { createEditor, fontSizes, Themes, languages } from '../composable/codeEditor.js';
import { useRoute, useRouter } from 'vue-router';
import { onBeforeRouteLeave} from "vue-router";
import { useCodeStore } from "@/stores/code.js";
import { useCodeReleaseStore } from "@/stores/codeRelease.js";

const codeReleaseStore = useCodeReleaseStore();
const codeStore = useCodeStore();
const route = useRoute();
const router = useRouter();
const editorRef = ref(null);
const selectedFontSize = ref('16');
const theme = ref('Visual Studio');
const language = ref('javascript');
let editor = null;
const editorData = ref('');

onMounted(() => {
    editor = createEditor(editorRef.value, language.value, theme.value, selectedFontSize.value, getEditorData);
    if (route.name === 'codeUpload') {
        editor.setValue(codeStore.codeData.codeContent);
    }
});

onBeforeRouteLeave(() => {
    codeStore.setCode(editor.getValue());
});

const changeFontSize = (selectedFontSize) => {
    editor.updateOptions({ fontSize: parseInt(selectedFontSize) });
};

const changeTheme = (selectedTheme) => {
    switch (selectedTheme) {
        case 'Visual Studio':
            editor.updateOptions({ theme: 'vs' });
            break;
        case 'Visual Studio Dark':
            editor.updateOptions({ theme: 'vs-dark' });
            break;
        case 'High Contrast Dark':
            editor.updateOptions({ theme: 'hc-black' });
            break;
    }
};

const changeLanguage = (selectedLanguage) => {
    monaco.editor.setModelLanguage(editor.getModel(), selectedLanguage);
};

const getEditorData = (value) => {
    editorData.value = value;
};

const buttonClass = computed(() => {
    return editorData.value && editorData.value.trim() !== '' ? 'button' : 'button-disabled';
});

const saveCode = () => {

    const data = {
        codeContent: editorData.value,
        codeLanguage: language.value,
    };

    codeReleaseStore.setCodeReleaseDataByCodeData(data);

    router.push({ name: 'info' });
};

</script>

<template>
    <div class="cons">

        <div class="con">
            <div class="editor-title">
                <span>附上您想要公开的代码</span>
            </div>
            <div class="editor-tips">
                <span>粘贴或写上您的代码</span>
            </div>
            <div class="select-list">

                <div class="select-item">
                    <label for="fontSize">fontSize</label>
                    <el-select v-model="selectedFontSize" @change="changeFontSize" id="fontSize">
                        <el-option v-for="item in fontSizes" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </div>
                <div class="select-item">
                    <label for="theme">Theme</label>
                    <el-select v-model="theme" @change="changeTheme" id="theme">
                        <el-option v-for="item in Themes" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </div>
                <div class="select-item">
                    <label for="language">Language</label>
                    <el-select v-model="language" filterable @change="changeLanguage" id="language">
                        <el-option v-for="item in languages" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </div>
            </div>
            <div ref="editorRef" class="editor"></div>
            <div class="submit">
                <button :class="buttonClass" @click="saveCode" :disabled="!editorData.trim()">下一步</button>
            </div>
        </div>

    </div>

</template>


<style scoped lang="scss">
.cons {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 20px;
    //background: #1A73E8;
    .con {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        //height: 600px;
        width: 100%;
        background: #FFFFFF;
        padding: 20px;
        border-radius: 12px;
        border: 1px solid #DEE3E8;

        box-shadow: 1px 1px 2px 2px #F6F7F7;

        .editor {
            height: 600px;
            width: 100%;
            border: 1px solid #ccc;
        }

        .editor-title {
            font-size: 20px;
            font-weight: bold;
        }

        .editor-tips {
            font-size: 14px;
            color: #636B74;
            margin: 10px 0 10px 0;
        }

        .select-list {
            display: flex;
            width: 100%;
            height: 72px;

            // background: red;
            .select-item {
                flex: 1;
                display: flex;
                flex-direction: column;

                label {
                    margin-top: 10px;
                }

                select {
                    width: 100%;
                    height: 31px;
                    border-radius: 4px;
                }
            }
        }

        .submit {
            align-self: flex-end;
            width: 100%;
            display: flex;
            //justify-content: flex-end;
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
