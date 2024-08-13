<script setup>
import { onMounted, ref } from "vue";
import { createEditor, fontSizes, Themes } from "@/views/CodeShow/composable/codeEditor.js";
import { useRoute } from "vue-router";
import request from "@/utils/request";
import Share from "@/views/CodeShow/components/Share.vue";
import { useCodeStore } from "@/stores/code.js";
import * as monaco from "monaco-editor";

const codeStore = useCodeStore();
const route = useRoute();
const editorRef = ref(null);
const selectedFontSize = ref('16');
const theme = ref('Visual Studio');
const language = ref('javascript');
let editor = null;
const uniqueLink = route.params.uniqueLink;
const error = ref('');
const tipsMsg = ref(true);

if (!uniqueLink) {
    error.value = '此页面需要您携带链接参数';
}else {
    request.get(`/codes/${ uniqueLink }`).then(res => {
        if (res.data.code === 200005) {
            editor.setValue(res.data.data.codeContent);
            codeStore.setCodeShareData(res.data.data);
            monaco.editor.setModelLanguage(editor.getModel(), res.data.data.language);
        }
    }).catch(err => {
        console.log(err);
    });
}

onMounted(() => {
    if (!error.value) { // 只有当没有错误时才创建编辑器
        editor = createEditor(editorRef.value, language.value, theme.value, selectedFontSize.value);
    }
});

const changeFontSize = () => {
    editor.updateOptions({ fontSize: parseInt(selectedFontSize.value) });
};

const changeTheme = () => {
    switch (theme.value) {
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
    <div class="cons">
        <div v-if="error" class="error-container">
            <div class="error">
                <span class="error-msg">{{ error }}</span>
            </div>
        </div>
        <div class="con" v-else>
            <div class="select-list">
                <div class="select-item">
                    <label for="fontSize">fontSize</label>
                    <select v-model="selectedFontSize" @change="changeFontSize" id="fontSize">
                        <option v-for="size in fontSizes" :key="size" :value="size">
                            {{ size }}
                        </option>
                    </select>
                </div>

                <div class="select-item">
                    <label for="theme">Theme</label>
                    <select v-model="theme" @change="changeTheme" id="theme">
                        <option v-for="item in Themes" :key="item" :value="item">
                            {{ item }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="type-container">
                <span class="language-type">{{ codeStore.codeShareData.language }}</span>
                <div class="copy-container" @click="copyCode" v-if="tipsMsg">
                    <!--                    <button class="copy-button">复制代码</button>-->
                    <img class="copy-button" src="./imgs/logo.png"/>
                    <span class="copy-msg">Copy</span>
                </div>
                <div class="tips" v-else>
                    <span class="tips-msg">已复制!</span>
                </div>
            </div>
            <div ref="editorRef" class="editor" @keydown="handleKeyDown"></div>
            <Share/>
        </div>

    </div>

</template>


<style scoped lang="scss">
.cons {
    display: flex;
    justify-content: center;
    width: 100%;

    .error-container {
        .error {
            margin-left: 0;

            .error-msg {
                font-weight: bold;
                font-size: 60px;
            }
        }
    }

    .con {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;

        .editor {
            height: 600px;
            width: 100%;
            border: 1px solid #DCDFE6;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
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

        .type-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 40px;
            width: 100.2%;
            background: #ECEFF7;
            border-radius: 12px 12px 0 0;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);

            .language-type {
                margin-left: 20px;
                font-size: 16px;
                font-weight: bold;
                color: #1B75D0;
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
                }
            }

            .tips {
                margin-right: 20px;
                cursor: pointer;
                display: flex;
            }
        }

    }
}
</style>