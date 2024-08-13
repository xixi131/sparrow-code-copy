import { ref } from 'vue'
import { defineStore } from 'pinia'
import request from "@/utils/request";


export const useUserStore = defineStore('userStore', () => {

    let userInfo = ref({});

    let dialogVisible = ref(false);

    const setUserInfo = (data) => {

        console.log(data)
        userInfo.value = {
            ...data
        };

        if (localStorage.getItem("ThirdPartyCallback")){
            localStorage.setItem("userInfo", JSON.stringify(data));
        }

    }

    const setDialogVisible = () => {
        dialogVisible.value = !dialogVisible.value;
    }

    const getUserInfo = () => {
        return request.get('/users/info').then(res => {
            if (res.data.code !== 200006) {
                userInfo.value = {};
            }else {
                console.log(res.data.data);
                userInfo.value = res.data.data;
                sessionStorage.setItem('avatar', JSON.stringify(res.data.data.avatar));
            }
            return res;
        }).catch(err => {
            console.log(err);
            throw err;
        });
    }

    return {
        userInfo,
        dialogVisible,
        setUserInfo,
        getUserInfo,
        setDialogVisible
    }
});
