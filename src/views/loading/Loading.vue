<script setup>
const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
    color: {
        type: String,
        default: '#FFFFFF'
    }
})

</script>

<template>
    <div :class="props.show ? 'loading-container' : ''">
        <div class="loading-spinner" :style="{borderLeftColor: props.color}"></div>
    </div>
</template>


<style scoped lang="scss">
.loading-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 1000;
}

.loading-spinner {
    border: 3px solid rgba(255, 255, 255, 0.1);

    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 1.2s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
