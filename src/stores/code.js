import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCodeStore = defineStore('code', () => {

    const codeContent = ref('');

    const codeData = ref({
        codeContent: '',
        uniqueLink: ''
    });

    const codeShareData = ref({
        codeContent: '',
        creationTime: '',
        creatorName: '',
        uniqueLink: '',
        language: ''
    });

    const setCodeData = (data) => {
        console.log('codeData', data);
        codeData.value = {
            ...data
        };
    }

    const setCode = (val) => {
        codeContent.value = val;
    }

    const setCodeShareData = (data) => {
        codeShareData.value = {
            ...data
        };
    }

    return {
        codeContent,
        codeData,
        codeShareData,
        setCode,
        setCodeData,
        setCodeShareData
    }

})
