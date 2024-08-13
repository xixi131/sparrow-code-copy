<script setup>
import { ref, watch, onMounted } from "vue";
import request from "@/utils/request.js";
import { useSnippetStore } from "@/stores/snippet.js";
import { ElMessage } from "element-plus";
import { useSearchHistoryStore } from "@/stores/searchHistory.js";
import CommonLoading from "@/assets/components/CommonLoading.vue";
import Select from "@/views/Home/components/Select.vue";

const loading = ref(false);

const selectRef = ref(null);

const searchHistoryStore = useSearchHistoryStore();

const avatar = ref(JSON.parse(sessionStorage.getItem('avatar')));

if (localStorage.getItem("ThirdPartyCallback")) {
    avatar.value = JSON.parse(localStorage.getItem("userInfo")).avatar;
}

const snippetStore = useSnippetStore();

watch(avatar, (newVal) => {
    avatar.value = newVal;
});

const inputValue = ref('');

const showSearchHistory = ref(false);

const handleFocus = async () => {

    await searchHistoryStore.fetchSearchHistory();
    if (searchHistoryStore.searchHistory.length === 0) {
        return;
    }
    showSearchHistory.value = true;
};

const handleBlur =  () => {
    showSearchHistory.value = false;
};

const searchInput = ref(null);
const searchHistoryCon = ref(null);

const setSearchHistoryWidth = () => {
    if (searchInput.value && searchHistoryCon.value) {
        searchHistoryCon.value.style.width = `${ searchInput.value.offsetWidth }px`;
    }
}

onMounted(() => {
    setSearchHistoryWidth();
    window.addEventListener('resize', setSearchHistoryWidth);
});

const handleSearch = () => {
    if (!inputValue.value || inputValue.value.trim() === '') {
        ElMessage.warning('请输入搜索关键字');
        return;
    } 
    loading.value = true;
    // const keyword = inputValue.value;
    const keyword = encodeURIComponent(inputValue.value);
    console.log(keyword);
    request.get(`/snippets/search-snippet?keyword=${ keyword }`).then(res => {
        console.log(res);
        if (res.data.code !== 200021) {
            ElMessage.error('搜索失败');
            return;
        }
        showSearchHistory.value = false;
        snippetStore.setSnippetsInfo(res.data.data);
        searchHistoryStore.fetchSearchHistory();
        selectRef.value.initActiveIndex();
    }).catch(err => {
        console.log(err);
    }).finally(() => {
        setTimeout(() => {
            loading.value = false;
        }, 600);
    })
}

const searchHistory = (data) => {
    console.log('searchHistory called with:', data);
    inputValue.value = data;
    handleSearch();
};

const deleteSearchHistory = async (item) => {
    const res = await request.delete(`/snippets/delete-history/${ item.id }`);
    if (res.data.code !== 200023) {
        ElMessage.error('删除失败');
        return;
    }
    searchHistoryStore.setSearchHistory(searchHistoryStore.searchHistory.filter(history => history.id !== item.id));
}

</script>

<template>
    <Select ref="selectRef" v-show="false"/>
    <div class="app">
        <div class="common-con" v-show="loading"></div>
        <CommonLoading :isLoading="loading" class="common"/>
        <div class="el-menu-demo">
            <div class="logo-container" @click="$router.push('/home')">
                <img src="./imgs/logo.png" class="logo" alt="logo"/>
                <span class="logo-msg"><h2>麻雀分享</h2></span>
            </div>
            <div class="input-container">
                <input type="text" class="input-text" placeholder="搜索"
                       @focus="handleFocus"
                       @blur="handleBlur"
                       ref="searchInput"
                       @keyup.enter="handleSearch"
                       v-model="inputValue"
                />
                <div class="search-history-con" v-show="showSearchHistory" ref="searchHistoryCon">
                    <!-- 搜索记录 -->
                    <div class="history-list">
                        <div class="history-item" v-for="(item, index) in searchHistoryStore.searchHistory"
                             :key="index"
                             @mousedown.prevent="searchHistory(item.searchKeyword)"
                        >
                            <img src="./imgs/history.png" class="img" alt="history"/>
                            <span class="msg">{{ item.searchKeyword }}</span>
                            <div class="delete-con" @mousedown.prevent.stop="deleteSearchHistory(item)">
                                <img src="./imgs/删除2.png" class="delete" alt="删除"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="avatar-container" @click="$router.push('/users')">
                <img
                    :src="avatar == null ? 'https://code-share.oss-cn-guangzhou.aliyuncs.com/edef74cf-8339-4d27-8a82-09d1c858ce4d.png' : avatar"
                    class="avatar-img" alt="头像"/>
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
.app {
    width: 100%;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #DCDFE6;

    .common-con {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(128, 128, 128, 0.5); /* 半透明的黑色背景 */
        z-index: 998; /* 确保它位于其他内容之上，但在加载效果之下 */
    }

    .common {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 999;
    }

    .el-menu-demo {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 76%;
        max-width: 1214px;
        margin: 0 auto;
        height: 60px;

        .logo-container {
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 12px;
            cursor: pointer;
            width: 170px;
            height: 100%;

            .logo {
                width: 30px;
                height: 38px;
                margin-right: 3px;
            }

            .logo-msg {
                margin-left: 10px;
            }

        }

        .logo-container:hover {
            background: #F1F2F3;
        }

        .input-container {
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 70%;

            .input-text {
                //margin-top: 10px;
                height: 34px;
                width: 100%;
                border-radius: 20px;
                border: none;
                padding-left: 40px;
                font-size: 16px;
                background-image: url('./imgs/搜索.png');
                background-repeat: no-repeat;
                background-position: 10px center;
                background-size: 20px 20px;
                background-color: #F1F2F3;

                &:focus {
                    outline: 2px solid #0969DA;
                    background-color: #FFFFFF;
                    box-shadow: 0 0 5px 3px #E2E2E3;
                }
            }

            .search-history-con {
                position: absolute;
                border-radius: 16px;
                top: 60px;
                background: #FFFFFF;
                width: auto;
                box-shadow: 0 4px 5px 4px #E2E2E3;
                max-height: 296px;
                overflow: hidden;

                .history-list {
                    padding: 10px 0;

                    .history-item {
                        padding: 10px;
                        //border-bottom: 1px solid #DCDFE6;
                        display: flex;
                        align-items: center;
                        color: #555555;

                        .img {
                            width: 16px;
                            height: 14px;
                            margin-right: 20px;
                        }

                        .delete-con {
                            opacity: 0;
                            margin-left: auto;
                            width: 16px;
                            height: 16px;
                            padding: 5px;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;

                            .delete {
                                width: 14px;
                                height: 14px;
                            }

                            &:hover {
                                background: #DDDDDD;
                            }
                        }


                        &:hover {
                            background: #F2F2F2;

                            .delete-con {
                                opacity: 1; /* 设置为可见 */
                            }
                        }
                    }
                }
            }

        }

        .avatar-container {
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            width: 80px;
            border-radius: 12px;
            height: 100%;

            .avatar-img {
                border-radius: 100%;
                width: 34px;
                height: 34px;
            }

            &:hover {
                background: #F1F2F3;
            }
        }

    }
}
</style>