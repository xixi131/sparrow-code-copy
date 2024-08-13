<script setup>
import { ref, computed, watch} from 'vue';
import { useUserStore } from "@/stores/user.js";
import Tag from "@/views/Users/components/Tag.vue";

const userStore = useUserStore();

const props = defineProps({
    logo: {
        type: Boolean,
        required: true
    },
    getInputValue: {
        type: Function
    },
    nickname: {
        type: String
    },

});

const avatarSizeOne = ref({
    imgWidth: '40px',
    imgHeight: '40px',
    placeholder: '评论...',
    usernameFontSize: '18px'
});

const avatarSizeTwo = ref({
    imgWidth: '26px',
    imgHeight: '26px',
    placeholder: '回复...',
    usernameFontSize: '14px'
});

if (props.logo) {
    avatarSizeOne.value = avatarSizeTwo.value;
}

const inputValue = ref('');

const buttonClass = computed(() => {
    return inputValue.value && inputValue.value.trim() !== '' ? 'button same' : 'button-disabled same';
});

watch(inputValue, (newValue) => {
    props.getInputValue(newValue);
});

const flagSettings = ref(true);

const tags = ref([]);

const deleteTag = (index) => {
    tags.value.splice(index, 1);
    console.log(tags.value);
}

const pushTags = (tag) => {
    // 将tag前面拼接上@符号
    if (tags.value.length > 0){
        return;
    }
    const tagged = '@' + tag;
    tags.value.push(tagged);
}

const getTags = () => {
    return tags.value;
}

const clearInput = () => {
    inputValue.value = '';
}

defineExpose({
    pushTags, getTags, clearInput
});

</script>

<template>

    <div class="app">
        <div class="avatar-username">
            <img :src="userStore.userInfo.avatar"
                 alt="avatar" class="img"
                 :style="{width: avatarSizeOne.imgWidth,height: avatarSizeOne.imgHeight}"
            />
            <div class="username">
                <span class="username-msg" :style="{fontSize: avatarSizeOne.usernameFontSize}">{{ props.nickname }}</span>
            </div>
        </div>

        <div class="input-container">
            <div v-if="tags.length > 0">
                <Tag :flag-settings="flagSettings" :tags="tags" @delete="deleteTag"/>
            </div>
            <input type="text" class="input-style"
                   :placeholder="avatarSizeOne.placeholder"
                   logo
                   v-model="inputValue"
            />
        </div>

        <div class="submit-container">
            <button class="cancel same" v-if="props.logo" @click="$emit('cancel')">取消</button>
            <button :class="buttonClass" :disabled="!inputValue.trim()" @click="$emit('publish')">发布</button>
        </div>
    </div>

</template>

<style scoped lang="scss">

.app {
    margin-top: 5px;
    .avatar-username {
        display: flex;
        align-items: center;

        .img {
            border-radius: 50%;
            background: #1B75D0;
            margin-right: 10px;
        }

        .username {

            .username-msg {

                font-weight: 600;
            }
        }
    }

    .input-container {
        margin-top: 10px;

        .input-style {
            font-size: 16px;
            padding-bottom: 5px;
            border: none;
            outline: none;
            width: 100%;
            box-sizing: border-box;
            box-shadow: inset 0 -1px 0 0 #909090;
            transition: box-shadow 0.3s;

            &:focus {
                box-shadow: inset 0 -2px 0 0 black;
            }
        }

    }

    .submit-container {
        margin-top: 8px;
        display: flex;
        justify-content: flex-end;

        .cancel {
            border: 1px solid #909090;
            padding: 10px 16px;
            background: #FFFFFF;
            border-radius: 20px;
            font-size: 14px;

            &:hover {
                cursor: pointer;
                background: #F9FAFA;
            }

            &:active {
                background: #F1F2F3;
            }
        }

        .button {
            border-radius: 20px;
            padding: 10px 16px;
            color: white;
            border: none;
            font-size: 14px;
            cursor: pointer;
        }

        .same {
            margin-left: 10px;
        }

        .button-disabled {
            border-radius: 20px;
            padding: 10px 16px;
            color: #909090;
            border: none;
            font-size: 14px;
            background: #F2F2F2;
        }
    }
}

</style>