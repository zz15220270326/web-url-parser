import '../packages/styles/index.scss';

import { createApp } from 'vue';
import App from './App.vue';

// 全局引入
// import WebUrlParser from '@packages';
// vueApp.use(WebUrlParser);

// 按需引入 (推荐)
import { WebUrlParser } from '@packages';

const vueApp = createApp(App);

vueApp.component('WebUrlParser', WebUrlParser);

vueApp.mount('#app');
