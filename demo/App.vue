<script lang="ts" setup>
  import { ref } from 'vue';
  import { NDialogProvider, NMessageProvider } from 'naive-ui';
  // import { WebUrlParser } from '@packages';

  function handleUrlChange(url: string) {
    console.log('handle-url-change', url);
  }

  const url = ref(
    'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=RCPS%20%E6%89%A3%E6%AC%BE%E5%A4%B1%E8%B4%A5&oq=R%2526lt%253BPS%2520%25E6%2589%25A3%25E6%25AC%25BE%25E5%25A4%25B1%25E8%25B4%25A5&rsv_pq=d4223eb500042e34&rsv_t=5f18730ZPdGIXTA%2F4J4jAOvkZOZixrXz6GYB6tksQeI2mp9CIaVcPRrYkfw&rqlang=cn&rsv_enter=0&rsv_dl=tb&rsv_sug3=1&rsv_sug1=1&rsv_sug7=100&rsv_btype=t&rsv_sug4=840&rsv_sug=1'
  );

</script>

<template>
  <n-dialog-provider>
    <n-message-provider>
      <div class="container">
        <web-url-parser
          :url="url"
          isShowTabs
          @url:update="handleUrlChange"
        />

        <!-- <web-url-parser v-model:url="url" /> -->
      </div>
    </n-message-provider>
  </n-dialog-provider>
</template>
