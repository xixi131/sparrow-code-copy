import { ref } from 'vue'
import { defineStore } from 'pinia'
import request from "@/utils/request.js";

export const useSnippetStore = defineStore('snippet', () => {

    const snippetsInfo = ref([]);

    const setSnippetsInfo = (snippets) => {
        snippetsInfo.value = snippets;
    }

    const fetchSnippetsInfo = async () => {
        try {
            const response = await request.get('/snippets/snippet-info');
            snippetsInfo.value = response.data.data;
        } catch (error) {
            console.error(error);
        }
    }
    const getSnippetsInfo = async () => {
        try {
            const response = await request.get('/snippets/snippet-info');
            return response.data.data;
        } catch (error) {
            console.error(error);
        }
    }

    return {
        snippetsInfo,
        fetchSnippetsInfo,
        setSnippetsInfo,
        getSnippetsInfo
    }

})
