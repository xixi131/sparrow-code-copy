import { ref } from 'vue'
import { defineStore } from 'pinia'
import request from "@/utils/request.js";

export const useSearchHistoryStore = defineStore('searchHistoryStore', () => {

    const searchHistory = ref([]);

    const setSearchHistory = (history) => {
        searchHistory.value = history;
    }

    const fetchSearchHistory = async () => {
        if (searchHistory.value.length === 5) {
            return;
        }
        try {
            const response = await request.get('/snippets/search-history');
            searchHistory.value = response.data.data;
        } catch (error) {
            console.error(error);
        }
    }

    return {
        searchHistory,
        fetchSearchHistory,
        setSearchHistory,
    }

})
