<script lang="ts" setup>
  import {  } from 'vue';
  import { NModal } from 'naive-ui';

  import { compCls, compProps, compEmits } from '@packages/configs';

  const cls = compCls.PreviewUrlModal;

  const props = defineProps(compProps.PreviewUrlModal);

  const emit = defineEmits(compEmits.PreviewUrlModal);

  function handleClose() {
    emit('update:modelValue', false);
  }

</script>

<template>
  <n-modal
    :show="props.modelValue"
    title="预览 query 参数"
    :class="cls.Container"
    :z-index="900"
    style="width: 960px; text-align: center;"
    preset="confirm"
    :mask-closable="false"
    @close="handleClose"
    @mask-click="handleClose"
  >
    <template v-if="!!props.url">
      <iframe
        :class="cls.PreviewFrame"
        title="预览 url"
        :src="props.url"
        width="800"
        height="600"
        allow="read;write;microphone;camera;midi;encrypted-media;display-capture;"
        allowfullscreen="true"
        referrerpolicy="no-referer"
        frameborder="0"
      ></iframe>
    </template>
  </n-modal>
</template>
