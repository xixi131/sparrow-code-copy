<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['delete']);

defineProps({
    tags: {
        type: Array,
        required: true
    },
    flagSettings: {
        type: Boolean,
        required: true
    }
});

</script>

<template>
    <div class="tag" v-for="(tag, index) in tags" :key="index">
        <div class="tag-container">
            <div class="msg-container">
                <span class="msg">{{ tag }}</span>
            </div>
            <div class="delete-container" v-if="flagSettings">
                <span class="delete" @click="$emit('delete', index)">×</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.tag {
    display: inline-block;
    //display: flex;
    align-items: center;
    padding: 3px 5px;
    margin: 0 5px 5px 0;
    background-color: #EDF5FD;
    border-radius: 4px;
    font-size: 14px;
    color: #1A73E8;

    .tag-container {
        display: flex;
        align-items: center;
        //background: #6962D0;
        max-height: 18px;

        .msg-container {
            .msg {
                //background: #6962D0;
                font-size: 14px;
            }
        }

        .delete-container {
            margin-left: 5px;

            .delete {
                &:hover {
                    cursor: pointer;
                }
            }
        }
    }


}
</style>