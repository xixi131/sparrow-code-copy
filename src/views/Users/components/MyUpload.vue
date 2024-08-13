<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted, onBeforeUnmount } from "vue";
import request from "@/utils/request.js";
import Tag from "@/views/Users/components/Tag.vue";
import CommonDialog from "@/assets/components/CommonDialog.vue";

const router = useRouter();

const flagSettings = ref(false);
const myUpload = ref([]);
const showOperation = ref(false);
const selectedOperationIndex = ref(null);
const dialogRefs = ref([]);

onMounted(() => {
    request.get('/snippets/user-snippet').then(res => {
        myUpload.value = res.data.data;
        console.log(res);
    });
});

const toSnippet = (index) => {
    router.push({
        name: 'snippet',
        params: { snippetId: myUpload.value[index].id },
        query: {
            title: myUpload.value[index].title,
            description: myUpload.value[index].description,
            codeContent: myUpload.value[index].codeContent,
            codeLanguage: myUpload.value[index].codeLanguage,
        }
    });
};

const handleOperationClick = (index) => {
    selectedOperationIndex.value = index;
    showOperation.value = !showOperation.value;
};

const handleDocumentClick = (e) => {
    if (e.target.closest('.operation') === null) {
        showOperation.value = false;
    }
};

onMounted(() => {
    document.addEventListener('click', handleDocumentClick);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleDocumentClick);
});

const handleDelete = () => {
    showOperation.value = false;
    if (selectedOperationIndex.value !== null) {
        dialogRefs.value[selectedOperationIndex.value]?.openDialog();
    }
};

const buttonMsg = '取消';

const onConfirm = (index) => {

    const snippetId = myUpload.value[index].id;
    console.log(snippetId);
    request.delete(`/snippets/delete-snippet/${ snippetId }`).then(res => {
        console.log(res);
        if (res.data.code !== 200025) {
            ElMessage({
                message: '删除失败，稍后请重试',
                type: 'error',
                plain: true,
            })
            return;
        }
        myUpload.value.splice(index, 1);
        ElNotification({
            message: '删除成功',
            type: 'success',
            duration: 2000,
        });
    });
    if (selectedOperationIndex.value !== null) {
        dialogRefs.value[selectedOperationIndex.value]?.closeDialog();
    }
};

const notConfirm = () => {
    if (selectedOperationIndex.value !== null) {
        dialogRefs.value[selectedOperationIndex.value]?.closeDialog();
    }
};

</script>

<template>
    <div class="app">
        <div class="active" v-if="myUpload.length > 0">
            <span class="msg">我的发布</span>
        </div>
        <div class="upload-list">

            <div class="upload-item" v-for="(item, index) in myUpload" :key="index">
                <CommonDialog
                    :ref="el => dialogRefs[index] = el"
                    :button-msg="buttonMsg"
                    :confirm-show="true"
                    @confirmA="onConfirm(index)"
                    @confirmB="notConfirm"
                >
                    <div class="dialog-content">
                        <span class="msg">确认删除该代码片块？</span>
                    </div>
                </CommonDialog>
                <div class="title">
                    <span class="title-msg" @click="toSnippet(index)">{{ item.title }}</span>
                </div>
                <div class="code">
                    <span class="code-msg">
                    <Tag :flag-settings="flagSettings" :tags="new Array(item.codeLanguage)"/>
                    </span>
                </div>
                <div class="time">
                    <span class="time-msg">{{ item.createdAt }}</span>
                    <div class="operation" @click.stop="handleOperationClick(index)">
                        <img class="img" alt="operation" src="../imgs/操作.png"/>
                    </div>
                    <div class="operation-do" v-if="showOperation && selectedOperationIndex === index">
                        <div class="con" @click.stop="handleDelete()" >
                            <span class="msg">删除</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.app {
    margin-top: 10px;
    .active {
        display: flex;
        width: 80px;
        padding: 10px 20px 10px 20px;
        background: #D3E3FD;
        border-radius: 30px;
        box-shadow: 1px 1px 2px 2px #F6F7F7;

        //border: 1px solid #92C2F2;
        .msg {
            color: #041E49;
            font-size: 20px;
            //font-weight: bold;
        }
    }
    .upload-list {
        display: flex;
        flex-wrap: wrap;

        .upload-item {
            display: flex;
            flex-direction: column;
            padding: 10px;
            border-radius: 8px;
            box-shadow: 1px 1px 2px 2px #F6F7F7;
            width: 270px;
            height: 120px;
            margin: 20px 0 0 20px;
            position: relative;

            .dialog-content {
                .msg {
                    font-size: 20px;
                    font-weight: bold;
                }
            }

            .title {
                width: 100%;

                .title-msg {
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 22px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    display: block;
                    max-width: 100%;
                }
            }

            .code {
                margin-top: 20px;
            }

            .time {
                margin-top: auto;
                display: flex;
                align-items: center;

                .time-msg {
                    font-size: 16px;
                    color: #666666;
                }

                .operation {
                    position: relative;
                    margin-left: auto;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 10px;
                    cursor: pointer;

                    .img {
                        width: 14px;
                        height: 14px;
                    }

                    &:hover {
                        background: #E5E5E5;
                    }

                    &:active {
                        background: #CECECE;
                    }
                }

                .operation-do {
                    background: #FFFFFF;
                    box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.3);
                    position: absolute;
                    border-radius: 8px;
                    padding: 10px 0;
                    width: 60px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    left: 180px;
                    top: 90px;

                    .con {
                        display: flex;
                        height: 90%;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                        width: 100%;

                        &:hover {
                            background: #E5E5E5;
                        }

                        .msg {
                            font-size: 16px;
                            color: red;
                        }
                    }
                }
            }
        }
    }
}
</style>
