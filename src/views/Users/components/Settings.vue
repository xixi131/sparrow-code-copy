<script setup>
import { ref, reactive, watchEffect, onMounted, computed } from 'vue';
import Tag from './Tag.vue';
import { useUserStore } from "@/stores/user.js";
import request from '@/utils/request.js';
import { useRouter } from "vue-router";
import CommonDialog from "@/assets/components/CommonDialog.vue";
import Loading from "@/views/loading/Loading.vue";
import { logoutHandle } from "@/assets/composable/logout.js";

const userStore = useUserStore();

const router = useRouter();

const onlyRead = localStorage.getItem("ThirdPartyCallback");

const flagSettings = ref(true);

const editedUserInfo = reactive({
    id: userStore.userInfo.id,
    nickname: userStore.userInfo.nickname,
    school: userStore.userInfo.school,
    hobby: userStore.userInfo.hobby,
    address: userStore.userInfo.address,
    gender: userStore.userInfo.gender,
    tags: userStore.userInfo.tags ? [...userStore.userInfo.tags] : [],
    bio: userStore.userInfo.bio || '',
    email: userStore.userInfo.email,
});

const tagData = ref('');

const pushTag = () => {
    editedUserInfo.tags.push(tagData.value);
    tagData.value = '';
};

const buttonClass = computed(() => {
    return tagData.value && tagData.value.trim() !== '' ? 'button' : 'button-disabled';
});

const three = ref([
    {
        name: '昵称',
        key: 'nickname',
    },
    {
        name: '学校',
        key: 'school',
    },
    {
        name: '爱好',
        key: 'hobby',
    },
    {
        name: '地址',
        key: 'address',
    },
    {
        name: '邮箱',
        key: 'email',
    }
])

const props = defineProps({
    closeSettings: {
        type: Function,
        required: true
    }
})

const close = () => {
    props.closeSettings();
};

const imageUrl = ref('')

// 你的后端接口 URL
const uploadAction = '/api/users/upload'

const handleAvatarSuccess = (response, file) => {
    // 在这里处理上传成功后的逻辑
    // 例如，你可以将图片的 URL 保存到 imageUrl 中
    imageUrl.value = URL.createObjectURL(file.raw)
    userStore.getUserInfo();
}

const beforeAvatarUpload = (file) => {
    // 在这里处理上传前的逻辑
    // 例如，你可以检查文件的类型和大小
    const isJPG = file.type === 'image/jpeg'
    const isPNG = file.type === 'image/png'
    const isLt2M = file.size / 1024 / 1024 < 2

    if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!')
    }
    if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
    }
    return (isJPG || isPNG) && isLt2M
}

const updateGender = () => {
    if (editedUserInfo.gender === '1') {
        editedUserInfo.gender = '0';
    }else {
        editedUserInfo.gender = '1';
    }
};


const updateUserInfo = () => {
    request.post('/users/update', {
        ...editedUserInfo,
        tags: editedUserInfo.tags.join(','),
    }).then(res => {
        if (res.data.code === 200008) {
            userStore.setUserInfo(res.data.data);
            close();
        }
    }).catch(
        err => {
            console.log(err);
        }
    )
}

const deleteTag = (index) => {
    editedUserInfo.tags.splice(index, 1);
}

const isLoading = ref(false);

const buttonMsg = '取消';

const childComponentRef = ref(null);

const openDialog = () => {
    childComponentRef.value.openDialog();
};

const onConfirm = () => {
    const response = logoutHandle();
    childComponentRef.value.runLoading();

    console.log(response);
    response.then(res => {
        if (res.data.code === 200026) {
            setTimeout(() => {
                childComponentRef.value.closeDialog();
                router.push('/login');
                close();
            }, 3000);
        }
    }).catch(err => {
        console.log(err);
    });

};

const notConfirm = () => {
    childComponentRef.value.closeDialog();
};

const logout = () => {
    openDialog();
}


</script>

<template>
    <CommonDialog @confirmA="onConfirm"
                  ref="childComponentRef"
                  :buttonMsg="buttonMsg"
                  :confirm-show="true"
                  @confirmB="notConfirm"
    >
        <Loading :show="false" v-if="isLoading" :color="'#000000'"/>
        <div style=" display: flex; flex-direction: column;align-items: center;justify-content: center;">
            <div style="display: flex;align-items: center;justify-content: center;">
                <img src="@/components/imgs/logo.png" alt="logo"
                     style="width: 30px;height: 36px"
                >
                <span style="font-weight: bold; font-size: 20px;margin-left: 10px">退出登录</span>
            </div>
            <span style="  font-size: 20px;color: red;margin-top: 20px">此操作不可撤销，您是否继续</span>
        </div>
    </CommonDialog>
    <div class="settings-container">
        <div class="avatar-container">
            <el-upload
                class="avatar-uploader"
                :action="uploadAction"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                name="avatar"
            >
                <img :src="userStore.userInfo.avatar" class="avatar" alt="avatar"/>
            </el-upload>

            <div class="gender-container">
                <div class="img-con" @click="updateGender">
                    <img class="img" src="../imgs/man.png" v-if="editedUserInfo.gender === '1'"/>
                    <img class="img" src="../imgs/female.png" v-else/>
                </div>
            </div>
        </div>

        <div class="school-container" v-for="(item, index) in three" :key="index">
            <span class="msg">{{ item.name }}</span>
            <input class="input"
                   v-model="editedUserInfo[item.key]"
                   :readonly="item.key === 'email' && onlyRead === 'true'"/>
        </div>

        <div class="tag-container">
            <span class="msg">标签</span>
            <input class="input" v-model="tagData" @keydown.enter="pushTag"/>
            <button :class="buttonClass" @click="pushTag" :disabled="!tagData.trim()">+</button>
        </div>

        <div class="tag-show" v-if="editedUserInfo.tags.length">
            <Tag :tags="editedUserInfo.tags" @delete="deleteTag" :flagSettings="flagSettings"/>
        </div>

        <div class="md-container">
            <span class="msg">个人简介</span>
            <div class="br"></div>
            <v-md-editor v-model="editedUserInfo.bio" height="400px" class="md"></v-md-editor>
        </div>

        <div class="button-container">
            <button class="button" @click="updateUserInfo">保存</button>
            <button class="button active" @click="close">取消</button>
            <button class="button logout" @click="logout">退出登录</button>
        </div>

    </div>
</template>

<style scoped lang="scss">

.setting-container {

    .avatar-container {
        display: flex;

        .avatar-uploader {
            margin-left: 20px;
            position: relative;

            &:hover::after {
                pointer-events: none;
                content: "";
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                border-radius: 8px;
                cursor: pointer;
                background-image: url("../imgs/编辑2.png");
                background-size: 50px 50px;
                background-repeat: no-repeat;
                background-position: center;
            }

            .avatar {
                width: 120px;
                height: 120px;
                border-radius: 8px;
            }

        }

        .gender-container {
            display: flex;
            align-items: center;
            margin-left: 20px;

            .img-con {
                padding: 7px 6px 6px 6px;

                &:hover {
                    cursor: pointer;
                    border-radius: 8px;
                    background: #F1F2F3;
                }

                .img {
                    width: 24px;
                    height: 24px;
                }
            }

        }
    }


    .school-container {
        margin-bottom: 20px;

        .msg {
            font-size: 18px;
            margin-left: 20px;
            font-weight: bold;
        }

        .input {
            width: 300px;
            height: 36px;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 0 10px;
            font-size: 16px;
            margin-top: 10px;
            margin-left: 20px;
        }
    }

    .tag-container {
        display: flex;
        align-items: center;

        .msg {
            font-size: 18px;
            margin: 0 20px 0 20px;
            font-weight: bold;
        }

        .input {
            width: 300px;
            height: 36px;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 0 10px;
            font-size: 16px;
        }

        .button {
            margin-left: 20px;
            width: 40px;
            height: 36px;
            border-radius: 8px;
            font-size: 26px;
        }

        .button-disabled {
            background: #F2F2F2;
            margin-left: 20px;
            border: none;
            width: 40px;
            height: 36px;
            border-radius: 8px;
            font-size: 26px;
        }
    }

    .tag-show {
        margin: 20px 0 0 76px;
        padding: 20px;
        border: 1px solid #BABFC5;
        width: 280px;
        border-radius: 8px;
    }

    .md-container {
        margin: 20px 0 20px 20px;

        .msg {
            font-size: 18px;
            margin: 0 20px 20px 0;
            font-weight: bold;
        }

        .br {
            height: 10px;
        }


        .md {
            margin: 20px 0 0 20px;
        }

    }

    .button-container {
        .button {
            width: 80px;
            height: 40px;
            border-radius: 8px;
            font-size: 16px;
            margin-left: 20px;
        }

        .active {
            border: 1px solid #92C2F2;
            background-color: #EDF5FD;
            color: #0C0D0E;

            &:hover {
                background-color: #D3E3FD;
            }

            &:active {
                background-color: #EDF5FD;
            }
        }

        .logout {
            border: 1px solid #FF6699;
            background-color: #FFFFFF;
            color: #FF6699;

            &:hover {
                background-color: #FFECF1;
            }

            &:active {
                background-color: #FFFFFF;
            }
        }
    }

}
</style>