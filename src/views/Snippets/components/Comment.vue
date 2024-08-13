<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import Input from "@/views/Snippets/components/Input.vue";
import request from "@/utils/request.js";
import { useUserStore } from "@/stores/user.js";
import { timeSort } from "@/views/Snippets/composable/sort.js";
import Content from "@/views/Snippets/components/Content.vue";
import CommonLoading from "@/assets/components/CommonLoading.vue";

const userStore = useUserStore();

let props = defineProps(['snippetId']);

let comments = ref([]);
let loading = ref(false);
let commentValue = ref('');

const inputRef = ref(null);

const fetchComments = () => {
    loading.value = true;
    request.get(`/snippets/${ props.snippetId }`).then(res => {
        if (res.data.code !== 200011) {
            loading.value = false;
            return;
        }
        comments.value = res.data.data;
        timeSort(comments.value);
        loading.value = false;
    });
}

fetchComments();


const showSortSelect = ref(false);

const toggleSortSelect = () => {
    showSortSelect.value = !showSortSelect.value;
};

const hideSortSelect = () => {
    showSortSelect.value = false;
};

onMounted(() => {
    window.addEventListener('click', hideSortSelect);
});

onBeforeUnmount(() => {
    window.removeEventListener('click', hideSortSelect);
});

const onPublish = () => {
    const data = {
        snippetId: props.snippetId,
        comment: commentValue.value
    }

    request.post(`/snippets/add-comment`, data).then(res => {
        if (res.data.code !== 200012) {
            ElMessage({
                message: '评论失败，请重试',
                type: 'error',
                plain: true,
            })
            return;
        }
        comments.value = res.data.data;
        timeSort(comments.value);
        inputRef.value.clearInput();
    });
}

const getInputValue = (value) => {
    commentValue.value = value;
};

const like = () => {
    comments.value.sort((a, b) => {
        return b.likes - a.likes;
    });
    showSortSelect.value = false;
};

const time = () => {
    timeSort(comments.value);
    showSortSelect.value = false;
};

</script>

<template>
    <div class="app">
        <div class="comment-title">
            <div class="title-msg">
                <span class="comment-num">{{ comments.length }}</span>
                <span class="comment-msg">评论</span>
            </div>
            <div class="sort-container" @click.stop="toggleSortSelect">
                <img src="../images/sort.png" alt="sort" class="img"/>
                <span class="sort-msg">排序规则</span>
            </div>
            <transition name="slide-fade">
                <div class="sort-select" v-if="showSortSelect">
                    <div class="select-one" @click="like">
                        <span>热度</span>
                    </div>
                    <div class="select-two" @click="time">
                        <span>时间</span>
                    </div>
                </div>
            </transition>
        </div>
        <div class="input-container">
            <Input :logo="false"
                   @publish="onPublish"
                   :getInputValue="getInputValue"
                   :nickname="userStore.userInfo.nickname"
                   ref="inputRef"
            />
        </div>
        <div class="content">
            <CommonLoading :isLoading="loading"/>
            <Content
                v-for="(item, index) in comments"
                :key="item.id"
                :item="item"
                :index="index"
                :getInputValue="getInputValue"
                :fetchComments="fetchComments"
                :snippetId="props.snippetId"
                :flag="true"
            />
        </div>
    </div>
</template>


<style scoped lang="scss">
.app {
    margin-top: 20px;

    .comment-title {
        display: flex;
        padding: 20px;
        align-items: center;

        .title-msg {
            display: flex;
            font-size: 22px;
            font-weight: 600;

            .comment-num {
                margin-right: 10px;
            }
        }

        .sort-container {

            margin-left: 20px;
            display: flex;
            align-items: center;
            padding: 10px;
            border-radius: 8px;

            .img {
                width: 26px;
                height: 26px;
            }

            .sort-msg {
                //margin-left: 10px;
                font-size: 16px;
                color: #595959;
            }

            &:hover {
                cursor: pointer;
                background: #F5F5F5;
            }
        }

        .sort-select {
            position: absolute;
            margin-left: 13%;
            box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.3);
            border-radius: 10px;
            padding: 10px 0;

            .select-one {
                padding: 10px 30px;

                &:hover {
                    cursor: pointer;
                    background: #E5E5E5;
                }
            }

            .select-two {
                padding: 10px 30px;

                &:hover {
                    cursor: pointer;
                    background: #E5E5E5;
                }
            }
        }

        .slide-fade-enter-active {
            transition: all .3s ease;
        }

        .slide-fade-leave-active {
            transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        }

        .slide-fade-enter, .slide-fade-leave-to {
            transform: translateY(-10px);
            opacity: 0;
        }
    }

    .input-container {
        margin-left: 20px;
    }

    .content {
        margin-left: 20px;

    }


}
</style>