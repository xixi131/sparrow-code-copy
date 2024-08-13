<script setup>
import * as monaco from 'monaco-editor';
import { onMounted, ref } from 'vue';
import { createEditor, fontSizes, Themes, languages } from './composable/codeEditor.js';
import Submit from "@/views/CodeUpload/components/Submit.vue";
import { useRoute } from 'vue-router';
import { onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";
import { useCodeStore } from "@/stores/code.js";

const codeStore = useCodeStore();
const route = useRoute();
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

const handleKeyDown = (event) => {
    if (event.ctrlKey && event.altKey && event.code === 'KeyL') {
        editor.getAction('editor.action.formatDocument').run();
        event.preventDefault(); // 阻止默认行为
    }
};

</script>

<template>
    <div class="cons">
        <div class="con">
            <div class="select-list">
                <div class="select-item">
                    <label for="fontSize">fontSize</label>
                    <!--                    <select v-model="selectedFontSize" @change="changeFontSize" id="fontSize">-->
                    <!--                        <option v-for="size in fontSizes" :key="size" :value="size">-->
                    <!--                            {{ size }}-->
                    <!--                        </option>-->
                    <!--                    </select>-->
                    <el-select v-model="selectedFontSize" @change="changeFontSize" id="fontSize">
                        <el-option v-for="item in fontSizes" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </div>
                <div class="select-item">
                    <label for="theme">Theme</label>
                    <!--                    <select v-model="theme" @change="changeTheme" id="theme">-->
                    <!--                        <option v-for="item in Themes" :key="item" :value="item">-->
                    <!--                            {{ item }}-->
                    <!--                        </option>-->
                    <!--                    </select>-->
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
            <div ref="editorRef" class="editor" @keydown="handleKeyDown"></div>
            <Submit @getEditorData="getEditorData" :editorData="editorData" :language="language"/>
        </div>

    </div>

</template>


<style scoped lang="scss">
.cons {
    display: flex;
    justify-content: center;

    width: 100%;

    .con {
        display: flex;
        flex-direction: column;

        //height: 600px;
        width: 100%;
        .editor {
            height: 600px;
            width: 100%;
            border: 1px solid #ccc;
            //box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
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
    }
}
</style>