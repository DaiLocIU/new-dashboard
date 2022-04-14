<template>
  <q-page class="flex flex-center">
    <flex-layout
      :gutter-inline="15"
      :gutter-block="15"
      :break-at="[
      { value: 1, width: 0 },
      { value: 2, width: 768 },
      { value: 3, width: 1180 },
      { value: 4, width: 1440 },
      ]"
    >
      <div class="flex-item-test"></div>
      <div class="flex-item-test"></div>
      <div class="flex-item-test"></div>
      <div class="flex-item-test"></div>
      <div class="flex-item-test"></div>
      <div class="flex-item-test"></div>
      <div class="flex-item-test"></div>
      <div class="flex-item-test"></div>
      <div class="flex-item-test"></div>
      <div class="flex-item-test"></div>
      <div class="flex-item-test"></div>
    </flex-layout>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import FlexLayout from 'components/UIComponents/Layout/FlexLayout.vue';

export default defineComponent({
  name: 'IndexPage',
  components: {
    FlexLayout,
  },
});
</script>
<style lang="scss">
</style>
