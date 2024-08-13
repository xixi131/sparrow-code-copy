<script setup>
import { HomeFilled, UserFilled, UploadFilled, Platform, Comment, Share } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { useCodeStore } from "@/stores/code.js";
import { ref, watch, onMounted } from 'vue';

const route = useRoute();
const router = useRouter();
const codeStore = useCodeStore();

const activeIndex = ref('1');
const menuItemsOne = ref([
    { index: '1', icon: HomeFilled, label: '家' },
    { index: '2', icon: UserFilled, label: '用户' },
    { index: '5', icon: UploadFilled, label: '发布' },
]);

const menuItemsTow = ref([
    { index: '3', icon: Share, label: '分享' },
    // { index: '4', icon: Platform, label: '展示' },
]);

const updateMenuItems = (newRoute) => {
    if (newRoute.path.startsWith('/snippet')) {
        if (!menuItemsOne.value.find(item => item.index === '6')) {
            menuItemsOne.value.push({ index: '6', icon: Comment, label: '代码块' });
        }
    }else {
        menuItemsOne.value = menuItemsOne.value.filter(item => item.index !== '6');
    }
}

const updateMenuItemsTow = (newRoute) => {
    if (newRoute.path.startsWith('/show')) {
        if (!menuItemsTow.value.find(item => item.index === '4')) {
            menuItemsTow.value.push({ index: '4', icon: Platform, label: '展示' });
        }
    }
}

watch(route, (newRoute) => {
    if (newRoute.path.startsWith('/show')) {
        activeIndex.value = '4';
    }else if (newRoute.path.startsWith('/release')) {
        activeIndex.value = '5';
    }else if (newRoute.path.startsWith('/snippet')) {
        activeIndex.value = '6';
    }else {
        switch (newRoute.path) {
            case '/':
            case '/home':
                activeIndex.value = '1';
                break;
            case '/users':
                activeIndex.value = '2';
                break;
            case '/share':
                activeIndex.value = '3';
                break;
            case '/release':
                activeIndex.value = '5';
                break;
            // 其他路由...
        }
    }
    updateMenuItems(newRoute);
    updateMenuItemsTow(newRoute);
});

onMounted(() => {
    if (route.path.startsWith('/show')) {
        activeIndex.value = '4';
    }else if (route.path.startsWith('/snippet')) {
        activeIndex.value = '6';
    }else {
        switch (route.path) {
            case '/':
            case '/home':
                activeIndex.value = '1';
                break;
            case '/users':
                activeIndex.value = '2';
                break;
            case '/share':
                activeIndex.value = '3';
                break;
            case '/release':
                activeIndex.value = '5';
                break;
            // 其他路由...
        }
    }
    updateMenuItems(route);
    updateMenuItemsTow(route);
});

const ifUniqueLink = () => {
    console.log(codeStore.codeShareData.uniqueLink);
    if (codeStore.codeShareData.uniqueLink) {
        router.push(`/show/${ codeStore.codeShareData.uniqueLink }`);
    }else {
        router.push('/show');
    }
}

const handleClick = (index) => {
    const routes = ['/home', '/users', '/share', '/show', '/release', '/snippet'];
    if (index === '6') {
        return;
    }
    router.push(routes[index - 1]);
    activeIndex.value = index.toString();
    if (index === '4') {
        ifUniqueLink();
    }
}

</script>

<template>
    <div id="app" class="app">
        <div class="navigation-container">
            <div class="menuItem-con-one">
                <div
                    v-for="item in menuItemsOne"
                    :key="item.index"
                    :class="{ 'navigation-item': true, 'is-active': activeIndex === item.index }"
                    @click="handleClick(item.index)"
                >
                    <el-icon :size="18">
                        <component :is="item.icon"/>
                    </el-icon>
                    <span>{{ item.label }}</span>
                </div>
            </div>

            <div class="menuItem-con-tow menuItem-con-one">
                <div
                    v-for="item in menuItemsTow"
                    :key="item.index"
                    :class="{ 'navigation-item': true, 'is-active': activeIndex === item.index }"
                    @click="handleClick(item.index)"
                >
                    <el-icon :size="18">
                        <component :is="item.icon"/>
                    </el-icon>
                    <span>{{ item.label }}</span>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped lang="scss">
.app {
    width: 100%;
    height: 100%;

    .navigation-container {
        //border-right: 1px solid #DCDFE6;
        margin-top: 40px;
        width: 200px;
        min-height: 100vh;

        .menuItem-con-one {
            margin-bottom: 20px;

            .navigation-item:hover {
                background-color: #F9FAFA;
                border-radius: 12px 0 0 12px;
                cursor: pointer;
            }

            .navigation-item.is-active {
                background-color: #F1F2F3;
                border-radius: 12px 0 0 12px;
                Font-Weight: bold;
            }

            .navigation-item {
                display: flex;
                align-items: center;
                padding: 10px;
                height: 22px;

            }

            .el-icon {
                margin-right: 10px;
            }
        }

    }
}

</style>
