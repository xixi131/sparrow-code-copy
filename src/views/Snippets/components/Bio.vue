<script setup>
const props = defineProps(['description']);
</script>

<template>
    <div class="bio">
        <div class="bio-container">
            <v-md-editor :model-value="props.description ? props.description : ''"
                         mode="preview"
            ></v-md-editor>
        </div>
    </div>
</template>

<style scoped lang="scss">
.bio {
    .bio-container {
        margin: 20px 0 0 0;

    }
}
</style>