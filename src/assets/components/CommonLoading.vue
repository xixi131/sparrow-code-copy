<!-- LoadingSpinner.vue -->
<template>
    <div class="loading-spinner" v-if="isLoading"></div>
</template>

<script>
export default {
    name: 'LoadingSpinner',
    props: {
        isLoading: {
            type: Boolean,
            required: true
        }
    }
}
</script>

<style scoped lang="scss">
.loading-spinner {
    position: relative;
    width: 30px;
    height: 30px;
    margin: 10px auto;
}

.loading-spinner::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30px; /* 黑色线条的长度 */
    height: 4px; /* 黑色线条的厚度 */
    background: black;
    border-radius: 2px; /* 圆弧头 */
    animation: spin 1.3s linear infinite;
    transform-origin: 0% 50%; /* 旋转中心点 */
}

@keyframes spin {
    0% { transform: rotate(0deg) translateX(-50%); }
    100% { transform: rotate(360deg) translateX(-50%); }
}
</style>
