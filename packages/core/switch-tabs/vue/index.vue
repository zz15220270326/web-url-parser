<script lang="ts" setup>
  import { NTabs, NTabPane } from 'naive-ui';

  import { compProps, compCls } from '@packages/configs';

  const cls = compCls.SwitchTabs;
  
  const props = defineProps(compProps.SwitchTabs);
</script>

<template>
  <n-tabs
    :class="cls.Container"
    :default-value="activeName"
  >
    <n-tab-pane
      v-for="(item, index) of props.list"
      :key="`${index} - ${item.name}`"
      :name="item.name ?? 'name'"
      :tab="item.tab"
    >
      <slot :name="item.name" :tab="item.tab">
        {{ item.tab }}
      </slot> 
    </n-tab-pane>
  </n-tabs>
</template>
