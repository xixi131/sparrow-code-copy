<script setup>


const copyUrl = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        ElMessage({
            message: '链接已复制到您的剪贴板',
            type: 'success',
            plain: true,
            customClass: 'my-message'  // 添加这一行
        })
        ElNotification({
            message: '此时您可以分享链接给他人',
            type: 'success',
            duration: 4000,
        });
    }).catch(err => {
        console.error('Error occurred:', err);
    });
}


</script>

<template>
    <div class="container">

        <div class="btn-list">
            <el-button :plain="true" @click="copyUrl" class="button">分享</el-button>
        </div>
    </div>
</template>

<style scoped lang="scss">

.container {
    margin-top: 10px;
    width: 100%;

    .btn-list {
        display: flex;
        justify-content: flex-end;

        .button {
            height: 40px;
            width: 80px;
            cursor: pointer;
            border-radius: 8px;
            background-color: #1A73E8;
            color: #FFFFFF;
            border: #D3E3FD;
            font-size: 16px;
        }

        .button:hover {
            background-color: #4C8DF6;
        }

        .button:active {
            background-color: #1652D4;
        }

        .active {
            margin-right: 10px;
        }

    }

}

</style>