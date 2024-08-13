<script setup>
import Tag from './components/Tag.vue';
import { ref } from 'vue';
import { useUserStore } from '@/stores/user.js';
import Settings from './components/Settings.vue';
import MyUpload from "@/views/Users/components/MyUpload.vue";

const userStore = useUserStore();

const flagUserData = ref(true);
const flagSettings = ref(false);

if (localStorage.getItem("ThirdPartyCallback")) {
    userStore.setUserInfo(JSON.parse(localStorage.getItem("userInfo")));

}

const openSettings = () => {
    // if (localStorage.getItem("ThirdPartyCallback")) {
    //     ElMessage.warning('您是第三方登录用户，无法修改个人信息');
    //     return;
    // }
    flagUserData.value = false;
    flagSettings.value = true;
};

const closeSettings = () => {
    flagUserData.value = true;
    flagSettings.value = false;
}

</script>

<template>
    <div id="user" class="user-container">
        <div class="user-top">
            <div class="avatar-container">
                <img :src="userStore.userInfo.avatar" class="img" alt="avatar"/>
            </div>
            <div class="username-container">
                <span class="username">{{ userStore.userInfo.nickname }}</span>
                <div class="location-container">
                    <el-icon :size="18" color="#666666">
                        <LocationInformation/>
                    </el-icon>
                    <span class="location-msg">{{ userStore.userInfo.address }}</span>
                </div>
                <div class="location-container">
                    <img src="./imgs/email.png" class="img">
                    <span class="location-msg">{{ userStore.userInfo.email }}</span>
                </div>
            </div>
            <div class="gender-container">
                <img src="./imgs/man.png" class="img" v-if="userStore.userInfo.gender === '1'" alt="男"/>
                <img src="./imgs/female.png" class="img" v-else alt="女"/>
            </div>
        </div>
        <div class="user-settings">
            <div class="setting" @click="openSettings">
                <el-icon :size="22">
                    <Setting/>
                </el-icon>
                <span class="setting-msg">Settings</span>
            </div>
        </div>
        <div class="setting-title" v-if="flagSettings">
            <span class="set-title-msg">编辑您的个人信息</span>
        </div>
        <div v-if="flagUserData">
            <div class="user-content">
                <div class="border tag">
                    <div class="icon">
                        <img src="./imgs/标签.png" class="img" alt="tag"/>
                    </div>
                    <div class="person-title">
                        <span class="title">标签</span>
                    </div>
                    <div class="person-content">
                        <div class="tag-container">
                            <Tag :tags="userStore.userInfo.tags || []" :flagSettings="flagSettings"/>
                        </div>
                    </div>
                </div>
                <div class="border school">
                    <div class="icon">
                        <img src="./imgs/学校%20(1).png" class="active" alt="学校"/>
                    </div>
                    <div class="person-title">
                        <span class="title">学校</span>
                    </div>
                    <div class="person-content">
                        <span class="school-msg">{{ userStore.userInfo.school }}</span>
                    </div>
                </div>
                <div class="border hobby">
                    <div class="icon">
                        <img src="./imgs/爱好%20(1).png" class="img" alt="爱好"/>
                    </div>
                    <div class="person-title">
                        <span class="title">爱好</span>
                    </div>
                    <div class="person-content">
                        <div class="hobby-container">
                            <span class="hobby-msg">{{ userStore.userInfo.hobby }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="user-profile" v-if="userStore.userInfo.bio">
                <div class="profile-content">
                    <v-md-editor :model-value="userStore.userInfo.bio ? userStore.userInfo.bio : ''"
                                 mode="preview"
                    ></v-md-editor>
                </div>
            </div>
        </div>

        <div class="setting-container" v-if="flagSettings">
            <Settings :closeSettings="closeSettings"/>
        </div>

        <div class="my-upload-container" v-if="flagUserData">
            <MyUpload/>
        </div>

    </div>
</template>

<style scoped lang="scss">
.user-container {

    width: 100%;

    .user-top {
        display: flex;
        align-items: center;

        .avatar-container {
            .img {
                width: 150px;
                height: 150px;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
            }
        }

        .username-container {
            //background: red;
            margin-left: 14px;

            .username {
                font-size: 36px;
                //font-weight: bold;
            }

            .location-container {
                display: flex;
                align-items: center;
                margin: 8px 0 2px 0;

                .location-msg {
                    color: #666666;
                    margin-left: 4px;
                }

                .img {
                    width: 18px;
                    height: 18px;
                }
            }
        }

        .gender-container {
            //background: red;
            height: 60px;
            margin-left: 10px;

            img {
                width: 24px;
                height: 24px;
            }
        }
    }

    .user-settings {
        margin-top: 8px;

        .setting {
            display: flex;
            align-items: center;
            border: 1px solid #BABFC5;
            width: 150px;
            height: 36px;
            border-radius: 6px;
            cursor: pointer;
            justify-content: center;

            .setting-msg {
                margin-left: 10px;
            }

            &:hover {
                background: #F9FAFA;
            }

            &:active {
                background: #F1F2F3;
            }
        }
    }

    .setting-title {
        //background: red;
        margin-top: 10px;
        padding: 0 0 10px 0;
        border-bottom: 1px solid #BABFC5;

        .set-title-msg {
            font-size: 28px;
            font-weight: bold;
        }
    }

    .user-content {
        //padding: 20px;
        margin-top: 14px;
        display: flex;
        justify-content: space-between;

        .border {
            width: 300px;
            height: 360px;
            border-radius: 8px;
            //border: 1px solid #DEE3E8;
            transition: transform 0.3s ease;
            display: flex;
            flex-direction: column;

            .icon {
                width: 100%;
                height: 120px;
                //background: #4C8DF6;
                display: flex;
                justify-content: center;
                align-items: center;

                .img {
                    width: 66px;
                    height: 66px;
                }

                .active {
                    width: 80px;
                    height: 80px;
                }
            }

            .person-title {
                width: 100%;
                height: 50px;
                //background: #3B4045;
                display: flex;
                justify-content: center;
                align-items: center;

                .title {
                    color: #000000;
                    font-size: 30px;
                    text-align: center;
                    line-height: 60px;
                    font-weight: bold;
                }

            }

            .person-content {
                flex: 1;
                //background: #6962D0;
            }

            &:hover {
                transform: translateY(-8px);
                box-shadow: 1px 1px 2px 2px #F6F7F7;
                cursor: pointer;
            }
        }

        .school {

            .person-content {
                display: flex;
                justify-content: center;
                align-items: center;

                .school-msg {
                    font-size: 20px;
                    font-weight: bold;
                }
            }
        }

        .tag {
            .person-content {
                padding: 14px;

                .tag-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-wrap: wrap;
                }
            }
        }

        .hobby {
            .person-content {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 14px;

                .hobby-container {
                    height: 165px;
                    font-size: 20px;
                    font-weight: bold;
                }
            }
        }
    }

    .user-profile {
        margin-top: 20px;

        .profile-content {
            padding: 10px;
            border-radius: 8px;
        }
    }

    .setting-container {
        margin-top: 20px;
        padding: 20px;
        border: 1px solid #BABFC5;
        border-radius: 8px;
    }

    .my-upload-container {
        margin-left: 20px;

        .active {
            display: flex;
            margin-left: 20px;
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
    }
}
</style>