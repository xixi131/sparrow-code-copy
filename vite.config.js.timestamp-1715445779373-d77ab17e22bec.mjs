// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///D:/SchoolProject/front/code-share/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/SchoolProject/front/code-share/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///D:/SchoolProject/front/code-share/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/SchoolProject/front/code-share/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///D:/SchoolProject/front/code-share/node_modules/unplugin-vue-components/dist/resolvers.js";
var __vite_injected_original_import_meta_url = "file:///D:/SchoolProject/front/code-share/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    // 配置插件
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  server: {
    port: 3e3,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  },
  // 强制预构建插件包
  optimizeDeps: {
    include: [
      `monaco-editor/esm/vs/language/json/json.worker`,
      `monaco-editor/esm/vs/language/css/css.worker`,
      `monaco-editor/esm/vs/language/html/html.worker`,
      `monaco-editor/esm/vs/language/typescript/ts.worker`,
      `monaco-editor/esm/vs/editor/editor.worker`
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxTY2hvb2xQcm9qZWN0XFxcXGZyb250XFxcXGNvZGUtc2hhcmVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFNjaG9vbFByb2plY3RcXFxcZnJvbnRcXFxcY29kZS1zaGFyZVxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovU2Nob29sUHJvamVjdC9mcm9udC9jb2RlLXNoYXJlL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5cbi8vIFx1NUYxNVx1NTE2NVx1NjNEMlx1NEVGNlxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuXG4gICAgcGx1Z2luczogW1xuICAgICAgICB2dWUoKSxcbiAgICAgICAgLy8gXHU5MTREXHU3RjZFXHU2M0QyXHU0RUY2XG4gICAgICAgIEF1dG9JbXBvcnQoe1xuICAgICAgICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcbiAgICAgICAgfSksXG4gICAgICAgIENvbXBvbmVudHMoe1xuICAgICAgICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcbiAgICAgICAgfSksXG4gICAgXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxuICAgICAgICB9XG4gICAgfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgICAgcG9ydDogMzAwMCxcbiAgICAgICAgcHJveHk6IHtcbiAgICAgICAgICAgICcvYXBpJzoge1xuICAgICAgICAgICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MCcsXG4gICAgICAgICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAgICAgICAgIHJld3JpdGU6IHBhdGggPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8vIFx1NUYzQVx1NTIzNlx1OTg4NFx1Njc4NFx1NUVGQVx1NjNEMlx1NEVGNlx1NTMwNVxuICAgIG9wdGltaXplRGVwczoge1xuICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAgICBgbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvanNvbi9qc29uLndvcmtlcmAsXG4gICAgICAgICAgICBgbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvY3NzL2Nzcy53b3JrZXJgLFxuICAgICAgICAgICAgYG1vbmFjby1lZGl0b3IvZXNtL3ZzL2xhbmd1YWdlL2h0bWwvaHRtbC53b3JrZXJgLFxuICAgICAgICAgICAgYG1vbmFjby1lZGl0b3IvZXNtL3ZzL2xhbmd1YWdlL3R5cGVzY3JpcHQvdHMud29ya2VyYCxcbiAgICAgICAgICAgIGBtb25hY28tZWRpdG9yL2VzbS92cy9lZGl0b3IvZWRpdG9yLndvcmtlcmBcbiAgICAgICAgXSxcbiAgICB9LFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlIsU0FBUyxlQUFlLFdBQVc7QUFDaFUsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBR2hCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsMkJBQTJCO0FBUDZJLElBQU0sMkNBQTJDO0FBU2xPLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBRXhCLFNBQVM7QUFBQSxJQUNMLElBQUk7QUFBQTtBQUFBLElBRUosV0FBVztBQUFBLE1BQ1AsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsSUFDckMsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1AsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsSUFDckMsQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNMLE9BQU87QUFBQSxNQUNILEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDeEQ7QUFBQSxFQUNKO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDSixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDSCxRQUFRO0FBQUEsUUFDSixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxTQUFTLFVBQVEsS0FBSyxRQUFRLFVBQVUsRUFBRTtBQUFBLE1BQzlDO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFBQTtBQUFBLEVBRUEsY0FBYztBQUFBLElBQ1YsU0FBUztBQUFBLE1BQ0w7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
