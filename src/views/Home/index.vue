<script setup>
import Select from './components/Select.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import Tag from "@/views/Users/components/Tag.vue";
import { useSnippetStore } from "@/stores/snippet.js";
import { useUserStore } from "@/stores/user.js";
import CommonLoading from "@/assets/components/CommonLoading.vue";

const loading = ref(false);

const userStore = useUserStore();

const snippetStore = useSnippetStore();

const router = useRouter();

const titleData = ref('热门');

const setTitleData = async (data) => {
    loading.value = true;

    // 重置 snippetsInfo 到所有的代码片段
    const allSnippets = await snippetStore.getSnippetsInfo();
    snippetStore.setSnippetsInfo(allSnippets);

    // 根据选中的标签获取不同的代码片段
    switch (data) {
        case '热门':
            // 获取热门的代码片段
            snippetStore.setSnippetsInfo(snippetStore.fetchSnippetsInfo());
            break;
        case '同校':
            // 获取同校的代码片段
            snippetStore.setSnippetsInfo(snippetStore.snippetsInfo.filter(item => item.school === userStore.userInfo.school));
            break;
        case '本周':
            // 获取本周的代码片段
            const startOfWeek = new Date();
            startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
            snippetStore.setSnippetsInfo(snippetStore.snippetsInfo.filter(item => new Date(item.createdAt) >= startOfWeek));
            break;
        case '本月':
            // 获取本月的代码片段
            const startOfMonth = new Date();
            startOfMonth.setDate(1);
            snippetStore.setSnippetsInfo(snippetStore.snippetsInfo.filter(item => new Date(item.createdAt) >= startOfMonth));
            break;
        default:
            break;
    }
    setTimeout(() => {
        loading.value = false;
        titleData.value = data;
    }, 600);

}

const tags = ref(['java', 'python', 'php']);

const flagSettings = ref(false);

onMounted(async () => {
    await snippetStore.fetchSnippetsInfo();
    console.log('snippetStore', snippetStore.snippetsInfo);
});

const toSnippet = (index) => {
    router.push({
        name: 'snippet',
        params: { snippetId: snippetStore.snippetsInfo[index].snippetId },
        query: {
            title: snippetStore.snippetsInfo[index].title,
            description: snippetStore.snippetsInfo[index].description,
            codeContent: snippetStore.snippetsInfo[index].codeContent,
            codeLanguage: snippetStore.snippetsInfo[index].codeLanguage,
        }
    });
};

defineExpose({
    setTitleData
});

</script>

<template>

    <div class="app">
        <div class="home-container">
            <div class="home-content">
                <div class="home-title">
                    <div class="title-msg">
                        <span class="msg">{{ titleData }}</span>
                    </div>
                    <div class="title-tips">
                        <span class="tips-msg">您可以通过不同选项过滤代码块</span>
                    </div>
                </div>
                <CommonLoading :isLoading="loading"/>
                <div class="home-code" v-show="!loading">
                    <div class="code-list">
                        <div class="code-item" v-for="(item, index) in snippetStore.snippetsInfo" :key="index">
                            <div class="item-container">
                                <div class="title">
                                    <span class="title-msg" @click="toSnippet(index)">{{ item.title }}</span>
                                </div>
                                <div class="tag">
                                    <Tag :flagSettings="flagSettings" :tags="tags"/>
                                </div>
                                <div class="time-user">
                                    <div class="time-container">
                                        <span class="time-msg">{{ item.createdAt }}</span>
                                    </div>
                                    <div class="user-container">
                                        <img class="img" :src="item.avatar" alt="avatar"/>
                                        <span class="user-msg">{{ item.nickname }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="home-select">
                <Select :setTitleData="setTitleData"/>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.app {
    width: 100%;

    .home-container {
        display: flex;

        .home-content {
            //background: #ECEFF7;
            width: 80%;
            height: 100%;
            margin-right: 10px;

            .home-code {
                .code-list {
                    .code-item {
                        margin-top: 20px;
                        border-radius: 10px;
                        border: 1px solid #DEE3E8;
                        box-shadow: 1px 1px 2px 2px #F6F7F7;
                        display: flex;
                        justify-content: flex-end;
                        padding: 16px 0;

                        .item-container {

                            // TODO: 可以扩展点赞、收藏等功能
                            width: 90%;
                            height: 100%;

                            .title {

                                padding: 10px 0;

                                .title-msg {

                                    font-size: 28px;

                                    &:hover {
                                        cursor: pointer;
                                    }
                                }
                            }

                            .tag {

                            }

                            .time-user {

                                display: flex;
                                padding: 10px 0;

                                .time-container {

                                    display: flex;
                                    align-items: center;

                                    .time-msg {
                                        font-size: 16px;
                                        color: #666666;
                                    }
                                }

                                .user-container {
                                    flex: 1;

                                    display: flex;
                                    justify-content: flex-end;
                                    align-items: center;

                                    .img {
                                        width: 30px;
                                        height: 30px;
                                        border-radius: 6px;
                                        margin-right: 10px;
                                    }

                                    .user-msg {
                                        font-size: 16px;
                                        margin-right: 20px;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            .home-title {

                border-bottom: 1px solid #DCDFE6;

                .title-msg {
                    padding: 20px;

                    .msg {
                        font-size: 32px;
                        font-weight: bold;
                    }

                }

                .title-tips {
                    display: flex;
                    justify-content: flex-end;

                    .tips-msg {
                        padding: 20px;
                        font-size: 28px;
                    }
                }
            }
        }

        .home-select {
            flex: 1;
        }
    }
}
</style>