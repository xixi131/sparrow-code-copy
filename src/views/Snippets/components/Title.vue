<script setup>

const props = defineProps(['title']);

</script>

<template>
    <div class="app">
        <div class="title-container">
            <span class="title-msg">{{ props.title }}</span>
        </div>
    </div>
</template>

<style scoped lang="scss">

.app {
    .title-container {
        //background: #6962D0;
        padding: 20px;
        border-bottom: 1px solid #DCDFE6;
        .title-msg {

            font-size: 28px;
        }
    }
}

</style>