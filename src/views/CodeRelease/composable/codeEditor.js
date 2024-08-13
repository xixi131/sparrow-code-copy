import * as monaco from 'monaco-editor';

export const fontSizes = [12, 14, 16, 18, 20, 22, 24, 26, 28, 30];
export const Themes = ['Visual Studio', 'Visual Studio Dark', 'High Contrast Dark'];
export const languages = [
    'javascript',
    'typescript',
    'css',
    'html',
    'scss',
    'json',
    'xml',
    'php',
    'c',
    'c++',
    'cpp',
    'csharp',
    'python',
    'java',
    'ruby',
    'go',
    'rust',
    'swift',
    'shell',
    'sql',
    'kotlin',
    'perl',
    'r',
    'vue',
    'yaml',
    'markdown',
    'dockerfile',
    'groovy',
    'lua',
    'powershell',
    'pug',
    'r',
    'razor',
    'sbat',
    'scheme',
    'solidity',
    'st',
    'swift',
    'vb',
    'xml',
    'xsl',
];

function debounce(func, wait) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

export function createEditor(editorRef, language, theme, selectedFontSize, getEditorData) {
    self.MonacoEnvironment = {
        getWorker: function (workerId, label) {
            const getWorkerModule = (moduleUrl, label) => {
                return new Worker(new URL(moduleUrl, import.meta.url), {
                    name: label,
                    type: 'module'
                });
            };

            switch (label) {
                case 'json':
                    return getWorkerModule('../../../../node_modules/monaco-editor/esm/vs/language/json/json.worker.js', label);
                case 'css':
                case 'scss':
                case 'less':
                    return getWorkerModule('../../../../node_modules/monaco-editor/esm/vs/language/css/css.worker.js', label);
                case 'html':
                case 'handlebars':
                case 'razor':
                    return getWorkerModule('../../../../node_modules/monaco-editor/esm/vs/language/html/html.worker.js', label);
                case 'typescript':
                case 'javascript':
                    return getWorkerModule('../../../../node_modules/monaco-editor/esm/vs/language/typescript/ts.worker.js', label);
                default:
                    return getWorkerModule('../../../../node_modules/monaco-editor/esm/vs/editor/editor.worker.js', label);
            }
        }
    };

    const editor = monaco.editor.create(editorRef, {
        value: '',
        language: language,
        theme: theme,
        colorDecorators: true, // 颜色装饰器
        paths: {
            vs: '../../node_modules/monaco-editor/min/vs'
        },
        fontSize: parseInt(selectedFontSize),
        minimap: { enabled: false },
        lineNumbersMinChars: 3,
    });

    const debouncedGetEditorData = debounce(getEditorData, 300);

    editor.getModel().onDidChangeContent(() => {
        debouncedGetEditorData(editor.getValue());
    });

    return editor;
}