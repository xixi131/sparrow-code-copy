<script setup>
import { ref } from 'vue';
import Loading from "@/views/loading/Loading.vue";

const isLoading = ref(false);
const showDialog = ref(false);
const width = '360px';
const height = '200px';

defineProps({
    confirmShow: {
        type: Boolean,
        required: true
    },
    buttonMsg: {
        type: String,
        required: true
    }
});

const closeDialog = () => {
    showDialog.value = false;
};

const openDialog = () => {
    showDialog.value = true;
};

const runLoading = () => {
    isLoading.value = true;
};

defineExpose({ openDialog, closeDialog, runLoading });

</script>


<template>
    <div v-if="showDialog">
        <div class="dialog-overlay"></div>
        <div class="dialog" :style="{width: width, height: height}">
            <slot></slot>
            <div class="controller-con">
                <div class="confirm-con" v-if="confirmShow" @click="$emit('confirmA')">
                    <span class="confirm-msg">
                        <Loading :show="false" :color="'#000000'" v-if="isLoading"/>
                        <span v-else>确认</span>
                    </span>
                </div>
                <button @click="$emit('confirmB')" class="button">{{ buttonMsg }}</button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
}

.dialog {
    background-color: #FFFFFF;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    padding: 20px;
    border: 1px solid #E5ECF6;
    border-radius: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    animation-name: scalein;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    z-index: 1000;

    .controller-con {
        position: absolute;
        bottom: 20px;
        right: 20px;
        display: flex;
        align-items: center;
        //background-color: #4C8DF6;
        justify-content: flex-end;

        .confirm-con {
            margin-right: 20px;
            width: 70px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;

            .confirm-msg {
                color: #214283;
            }

            &:hover {
                cursor: pointer;
                background-color: #F1F2F3;
                border-radius: 20px;
            }
        }

        .button {
            border-radius: 8px;
            width: 70px;
            height: 40px;
            font-size: 15px;
        }
    }

}

@keyframes scalein {
    from {
        transform: translate(-50%, -50%) scale(0);
    }

    to {
        transform: translate(-50%, -50%) scale(1);
    }
}
</style>