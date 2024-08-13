import * as monaco from 'monaco-editor';

export const fontSizes = [12, 14, 16, 18, 20, 22, 24, 26, 28, 30];
export const Themes = ['Visual Studio', 'Visual Studio Dark', 'High Contrast Dark'];


export function createEditor(editorRef, language, theme, selectedFontSize) {
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

    return monaco.editor.create(editorRef, {
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
        readOnly: true,
    });
}