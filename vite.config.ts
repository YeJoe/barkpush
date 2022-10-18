import { defineConfig ,loadEnv  } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'; // 新增
import { viteMockServe } from 'vite-plugin-mock'// 新增

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    viteMockServe({
    supportTs:true,
    logger:false,
    mockPath: "./src/mock/", // 解析刚刚user.ts的位置
    localEnabled: true // 是否开启开发环境
  })
],
base:'./',

  resolve: { // 新增
    //设置别名
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: { // 新增
    port: 3000, //启动端口
    hmr: {
      host: '127.0.0.1',
      port: 3000,
    },
    // 设置 https 代理
    proxy: {
      '/api': {
        target: '你的域名/push', // 后端 api 地址
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ''),
      },
    },
  },
});



