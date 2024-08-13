import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCodeReleaseStore = defineStore('codeRelease', () => {

    const codeReleaseData = ref({
        title: '',
        code: {
            codeContent: '',
            language: '',
        },
        codeDescription: '',
    })

    const setCodeReleaseDataByTitle = (data) => {
        codeReleaseData.value.title = data
    }

    const setCodeReleaseDataByCodeData = (data) => {
        codeReleaseData.value.code.codeContent = data.codeContent;
        codeReleaseData.value.code.language = data.codeLanguage;
    }

    const setCodeReleaseDataByCodeDescription = (data) => {
        codeReleaseData.value.codeDescription = data
    }

    return {
        codeReleaseData,
        setCodeReleaseDataByTitle,
        setCodeReleaseDataByCodeData,
        setCodeReleaseDataByCodeDescription,
    }

})
