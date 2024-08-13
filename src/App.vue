<script setup>
import { useUserStore } from "@/stores/user.js";
import CommonDialog from "@/assets/components/CommonDialog.vue";
import { ref, watch } from "vue";
import { useRouter } from 'vue-router';

const userStore = useUserStore();

const router = useRouter();

watch(() => userStore.dialogVisible, () => {
    openDialog();
});

const buttonMsg = '取消';

const childComponentRef = ref(null);

const openDialog = () => {
    childComponentRef.value.openDialog();
};

const onConfirm = () => {
    childComponentRef.value.closeDialog();
    router.push('/login');
};

const notConfirm = () => {
    childComponentRef.value.closeDialog();
};

</script>

<template>
    <div class="container">
        <CommonDialog @confirmA="onConfirm"
                      ref="childComponentRef"
                      :buttonMsg="buttonMsg"
                      :confirm-show="true"
                      @confirmB="notConfirm"
        >
            <div style="font-weight: bold; font-size: 18px">您的登录已过期！请重新登录</div>
        </CommonDialog>
        <router-view/>
    </div>
</template>

<style scoped lang="scss">


</style>
