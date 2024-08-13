<script setup>
import { ref, reactive } from 'vue';
import Input from "@/views/Snippets/components/Input.vue";
import request from "@/utils/request.js";
import { useUserStore } from "@/stores/user.js";
import { timeSince } from "@/views/Snippets/composable/timeSince.js";
import CommonDialog from "@/assets/components/CommonDialog.vue";
import { timeSort } from "@/views/Snippets/composable/sort.js";
import CommonLoading from "@/assets/components/CommonLoading.vue";

const loading = ref(false);

const userStore = useUserStore();

const props = defineProps(['item', 'index', 'getInputValue', 'fetchComments', 'snippetId', "flag", "isReply", "commentId", "replies", "setReplies"]);

const inputRef = ref(null);

const avatarSizeOne = ref({
    size: '40px'
});

const avatarSizeTwo = ref({
    size: '26px'
});

if (!props.flag) {
    avatarSizeOne.value = avatarSizeTwo.value;
}

const state = reactive({
    replyShow: Array(props.item.repliesCount).fill(false)
});

const setState = (index) => {
    if (props.item.id == null) {
        inputRef.value.pushTags(props.replies[index].nickname);
    }
    state.replyShow[index] = true;
}

const onCancel = (index) => {
    state.replyShow[index] = false;
};

const inputValue = ref('');

const childComponentRef = ref(null);

const buttonMsg = '取消';

const onConfirm = (index) => {
    if (props.item.id == null) {
        request.delete(`/snippets/delete-replies/${ props.item.replyId }`).then(res => {
            if (res.data.code !== 200018) {
                ElMessage({
                    message: '删除失败，稍后请重试',
                    type: 'error',
                    plain: true,
                })
                return;
            }
            props.fetchComments();
            const index = props.replies.findIndex(reply => reply.replyId === props.item.replyId);
            if (index !== -1) {
                props.replies.splice(index, 1);
            }
            ElNotification({
                message: '删除回复成功',
                type: 'success',
                duration: 3000,
            });
        });
        childComponentRef.value.closeDialog();
        onCancel(index);
        return;
    }
    request.delete(`/snippets/${ props.item.id }`).then(res => {
        if (res.data.code !== 200013) {
            ElMessage({
                message: '删除失败，稍后请重试',
                type: 'error',
                plain: true,
            })
            return;
        }
        props.fetchComments();
        ElNotification({
            message: '删除评论成功',
            type: 'success',
            duration: 3000,
        });
    });
    childComponentRef.value.closeDialog();
    onCancel(index);
}

const notConfirm = () => {
    childComponentRef.value.closeDialog();
}

const deleteComment = () => {
    childComponentRef.value.openDialog();
}

const handleLike = () => {
    if (props.isReply) {
        request.post(`/snippets/reply-like/${ props.item.replyId }`).then(res => {
            if (res.data.code === 200019) {
                props.item.likes = res.data.data.likes;
                props.item.userLiked = res.data.data.userLiked;
            }
        }).catch(err => {
            ElMessage({
                message: '点赞失败，稍后请重试',
                type: 'error',
                plain: true,
            })
            console.log(err)
        });
    }else {
        request.post(`/snippets/like/${ props.item.id }`).then(res => {
            if (res.data.code === 200014) {
                props.item.likes = res.data.data.likes;
                props.item.userLiked = res.data.data.userLiked;
            }
        }).catch(err => {
            ElMessage({
                message: '点赞失败，稍后请重试',
                type: 'error',
                plain: true,
            })
            console.log(err)
        });
    }
}

const handleTread = () => {

    if (props.isReply) {
        request.post(`/snippets/reply-tread/${ props.item.replyId }`).then(res => {
            if (res.data.code === 200020) {
                props.item.userDisliked = res.data.data;
            }
        }).catch(err => {
            ElMessage({
                message: '点踩失败，稍后请重试',
                type: 'error',
                plain: true,
            })
            console.log(err)
        });
    }else {
        request.post(`/snippets/tread/${ props.item.id }`).then(res => {
            if (res.data.code === 200015) {
                props.item.userDisliked = res.data.data;
            }
        }).catch(err => {
            ElMessage({
                message: '点踩失败，稍后请重试',
                type: 'error',
                plain: true,
            })
            console.log(err)
        });
    }

}

const onReplies = async (index) => {
    let tempContent = '';
    if (props.item.id == null && inputRef.value.getTags().length > 0) {
        tempContent = '@' + props.replies[index].nickname + ' ' + inputValue.value;
    }else {
        tempContent = inputValue.value;
    }
    const data = {
        commentId: props.item.id == null ? props.commentId : props.item.id,
        content: tempContent
    }
    try {
        const res = await request.post('/snippets/add-replies', data);
        if (res.data.code !== 200016) {
            ElMessage({
                message: '评论失败，请重试',
                type: 'error',
                plain: true,
            })
            return;
        }
        props.fetchComments();
        if (props.item.id == null) {
            props.setReplies(res.data.data);
        }else {
            fetchReplies();
        }
        state.replyShow[index] = false;
        inputRef.value.clearInput();
        if (!showReplies.value) {
            showReplies.value = true;
        }
    } catch (err) {
        console.error(err);
        ElMessage({
            message: '评论失败，请重试',
            type: 'error',
            plain: true,
        })
    }
}

const getInputValue = (value) => {
    inputValue.value = value;
}

const showReplies = ref(false);

const replies = ref([]);

const setReplies = (newReplies) => {
    timeSort(newReplies);
    replies.value = newReplies;
}

const toggleReplies = () => {
    showReplies.value = !showReplies.value;
    if (showReplies.value && replies.value.length === 0) {
        fetchReplies();
        // timeSort(props.replies || []);
    }
}

const fetchReplies = () => {
    loading.value = true;
    request.get(`/snippets/select-replies/${ props.item.id != null ? props.item.id : props.commentId }`).then(res => {
        if (res.data.code !== 200017) {
            ElMessage({
                message: '获取回复失败，请重试',
                type: 'error',
                plain: true,
            });
            loading.value = false;
            return;
        }
        loading.value = false;
        replies.value = res.data.data;
        timeSort(replies.value);
        console.log(res);
    });
}

</script>

<template>
    <div class="comment-content">
        <div class="common">
            <CommonDialog
                ref="childComponentRef"
                :buttonMsg="buttonMsg"
                :confirm-show="true"
                @confirmA="onConfirm(index)"
                @confirmB="notConfirm"
            >
                <div class="content">
                    <span class="title">删除评论</span>
                    <span class="msg">您是否永久删除您的评论？</span>
                </div>
            </CommonDialog>
        </div>
        <div class="avatar">
            <img :src="item.avatar" alt="avatar" class="img"
                 :style="{ width: avatarSizeOne.size, height: avatarSizeOne.size }"/>
        </div>
        <div class="username-content">
            <div class="username">
                <span class="username-msg">{{ item.nickname }}</span>
                <span class="time-msg">{{ timeSince(item.createdAt) }}</span>
            </div>
            <div class="content">
                <span class="content-msg">{{ item.comment }}</span>
            </div>

            <div class="like-reply">
                <div class="like" @click="handleLike">
                    <div class="like-con" v-if="item.userLiked">
                        <img class="img" src="../images/点赞-up-块.png" alt="点赞"/>
                    </div>
                    <div class="like-con" v-else>
                        <img class="img" src="../images/点赞-up-线.png" alt="点赞"/>
                    </div>
                </div>
                <div class="like-number" v-show="item.likes > 0">
                    <span class="msg">{{ item.likes > 0 ? item.likes : '' }}</span>
                </div>
                <div class="like tread" @click="handleTread">
                    <div class="like-con" v-if="item.userDisliked">
                        <img class="img" src="../images/点赞-down-块.png" alt="不喜欢"/>
                    </div>
                    <div class="like-con" v-else>
                        <img class="img" src="../images/点赞-down-线.png" alt="不喜欢"/>
                    </div>
                </div>
                <div class="reply-con" @click="setState(index)">
                    <span class="reply">回复</span>
                </div>

                <div class="reply-con" v-if="userStore.userInfo.id === item.userId" @click="deleteComment">
                    <span class="reply" style="color: red">删除</span>
                </div>

                <div class="reply-con con" @click="toggleReplies" v-if="item.repliesCount > 0">
                    <div class="replyCount">
                        <span class="reply">{{ item.repliesCount }} 条回复</span>
                        <img src="../images/箭头%20上%20up.png" class="img" alt="箭头" v-if="showReplies"/>
                        <img src="../images/箭头%20下down.png" class="img" alt="箭头" v-else/>
                    </div>
                </div>
            </div>
            <div class="reply-input">

                <Input :logo="true"
                       v-show="state.replyShow[index]"
                       @cancel="onCancel(index)"
                       :getInputValue="getInputValue"
                       :nickname="userStore.userInfo.nickname"
                       @publish="onReplies(index)"
                       ref="inputRef"
                />
            </div>
            <div class="replies" v-if="showReplies">
                <CommonLoading :isLoading="loading"/>
                <Content
                    v-for="(reply, replyIndex) in replies"
                    :key="reply.replyId"
                    :item="reply"
                    :index="replyIndex"
                    :getInputValue="getInputValue"
                    :fetchComments="fetchComments"
                    :snippetId="props.snippetId"
                    :flag="false"
                    :isReply="true"
                    :commentId="props.item.id"
                    :replies="replies"
                    :setReplies="setReplies"
                />
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
.comment-content {
    margin: 0 0 10px 0;
    display: flex;

    .common {
        .content {
            display: flex;
            flex-direction: column;

            .title {
                font-size: 22px;
                font-weight: 600;
            }

            .msg {
                margin-top: 20px;
                font-size: 16px;
                color: #595959;
            }
        }
    }

    .avatar {

        .img {
            border-radius: 50%;

        }
    }

    .username-content {
        margin-left: 10px;
        width: 100%;

        .username {
            .username-msg {
                font-size: 14px;
                //color: #595959;
                font-weight: 550;
            }

            .time-msg {
                margin-left: 10px;
                font-size: 13px;
                color: #595959;
            }
        }

        .content {
            margin-top: 4px;

            .content-msg {
                font-size: 16px;
            }
        }

        .like-reply {
            display: flex;
            margin: 4px 0 0 -6px;

            .tread {
                margin-right: 10px;
            }

            .like {

                .like-con {

                    border-radius: 50%;
                    padding: 8px;
                    display: flex;
                    justify-content: center;
                    align-content: center;

                    .img {
                        width: 18px;
                        height: 18px;
                    }

                    &:hover {
                        cursor: pointer;
                        background: #E5E5E5;
                    }
                }

            }

            .like-number {
                margin-top: 8px;
                margin-right: 12px;

                .msg {
                    font-size: 14px;
                    color: #606060;
                }
            }

            .reply-con {
                padding: 5px 10px 5px 10px;
                border-radius: 18px;
                display: flex;
                justify-content: center;
                align-items: center;

                &:hover {
                    cursor: pointer;
                    background: #E5E5E5;
                }

                .reply {
                    font-size: 14px;
                }

                .replyCount {
                    display: flex;
                    align-items: center;
                    color: #7E53FC;

                    .img {
                        width: 18px;
                        height: 18px;
                        margin-left: 4px;
                    }

                    .reply {
                        font-size: 14px;
                    }

                    &:hover {
                        cursor: pointer;

                    }
                }
            }

            .con {
                &:hover {
                    background: #B9C0F8;
                }
            }
        }

    }
}
</style>