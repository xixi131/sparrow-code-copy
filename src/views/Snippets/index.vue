<script setup>
import { useRoute } from 'vue-router';
import Title from "@/views/Snippets/components/Title.vue";
import CodeShow from "@/views/Snippets/components/CodeShow.vue";
import Bio from "@/views/Snippets/components/Bio.vue";
import Comment from "@/views/Snippets/components/Comment.vue";

const route = useRoute();

</script>

<template>
    <div class="app">
        <div class="title-container">
            <Title :title="route.query.title"/>
        </div>
        <div class="bio-container">
            <Bio :description="route.query.description"/>
        </div>
        <div class="editor-container">
            <CodeShow :codeContent="route.query.codeContent" :codeLanguage="route.query.codeLanguage"/>
        </div>
        <div class="comment-container">
            <Comment :snippetId="route.params.snippetId"/>
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>