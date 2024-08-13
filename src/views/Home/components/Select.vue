<script setup>
import { ref,watchEffect } from 'vue';
import { HomeFilled, Platform, Share, UploadFilled, UserFilled } from "@element-plus/icons-vue";

const selectItems = [
    { index: '1', icon: HomeFilled, label: '热门' },
    { index: '2', icon: UserFilled, label: '同校' },
    { index: '3', icon: Share, label: '本周' },
    { index: '4', icon: Platform, label: '本月' },
];

const activeIndex = ref('1');

const handleClick = (index) => {
    // 处理点击事件
    activeIndex.value = index;
    props.setTitleData(selectItems[index-1].label);
};

const initActiveIndex = () => {
    // 初始化 activeIndex
    activeIndex.value = '1';
};

const props = defineProps({
    setTitleData: Function
});

defineExpose({
    initActiveIndex
});


</script>

<template>

    <div class="select-container">
        <div class="select">
            <div
                v-for="item in selectItems"
                :key="item.index"
                class="select-item"
                :class="{ 'active': item.index === activeIndex }"
                @click="handleClick(item.index)"
            >
                <span>{{ item.label }}</span>
                <el-icon :size="18" class="icon">
                    <component :is="item.icon"/>
                </el-icon>
                <div class="vertical-line"></div>
            </div>
        </div>
    </div>

</template>

<style scoped lang="scss">
.select-container {
    .select {

        .select-item {
            cursor: pointer;
            border-radius: 6px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            font-size: 16px;

            .vertical-line {
                height: 56%;
                border-left: 2px solid transparent;
                margin-left: 10px;
                border-radius: 200px;
            }

            &:hover {
                background-color: #F5FCFF;
            }

            &.active {
                background-color: #ECF5FF;
                font-weight: bold;
                color: #1B75D0;

                .vertical-line {
                    border-color: #1B74E8;
                }
            }

            .icon {
                margin-left: 10px;
            }
        }
    }
}
</style>