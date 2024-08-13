<script setup>
import { onMounted, ref } from "vue";
import { createEditor } from "@/views/CodeShow/composable/codeEditor.js";
import * as monaco from "monaco-editor";

const props = defineProps(['codeContent', 'codeLanguage']);

const editorRef = ref(null);
const selectedFontSize = ref('16');
const theme = ref('Visual Studio');
const language = ref(props.codeLanguage);
let editor = null;
const tipsMsg = ref(true);

onMounted(() => {
    editor = createEditor(editorRef.value, language.value, theme.value, selectedFontSize.value);
    editor.setValue(props.codeContent);
    monaco.editor.setModelLanguage(editor.getModel(), language.value);
});

const handleKeyDown = (event) => {
    if (event.ctrlKey && event.altKey && event.code === 'KeyL') {
        editor.getAction('editor.action.formatDocument').run();
        event.preventDefault(); // 阻止默认行为
    }
};

const copyCode = () => {

    navigator.clipboard.writeText(editor.getValue()).then(() => {
        tipsMsg.value = false;
        setTimeout(() => {
            tipsMsg.value = true;
        }, 2000);
    }).catch(err => {
        console.error('Error occurred:', err);
    });

}
</script>

<template>
    <div class="app">
        <div class="type-container">
            <span class="language-type">{{ language }}</span>
            <div class="copy-container" @click="copyCode" v-if="tipsMsg">
                <img class="copy-button" src="../images/logo.png"/>
                <span class="copy-msg">Copy</span>
            </div>
            <div class="tips" v-else>
                <span class="tips-msg">已复制!</span>
            </div>
        </div>
        <div ref="editorRef" class="editor" @keydown="handleKeyDown"></div>
    </div>
</template>

<style scoped lang="scss">
.app {
    padding: 0 0 30px 0;
    border-bottom: 1px solid #DCDFE6;

    .type-container {
        margin-left: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        width: 96.1%;
        background: #FFFDDB;
        border-radius: 12px 12px 0 0;
        box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.3);

        .language-type {
            margin-left: 20px;
            font-size: 16px;
            font-weight: bold;
            color: #595959;
        }

        .copy-container {
            margin-right: 20px;
            cursor: pointer;
            display: flex;

            .copy-button {
                width: 22px;
                height: 26px;
            }

            .copy-msg {
                margin-left: 4px;
                margin-top: 4px;
                color: #595959;

            }
        }

        .tips {
            margin-right: 20px;
            cursor: pointer;
            display: flex;

            .tips-msg {
                color: #595959;
            }
        }
    }

    .editor {
        margin-left: 20px;
        height: 600px;
        width: 96%;
        //box-shadow: 2px 1px 4px 4px #F6F7F7;
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
    }
}
</style>