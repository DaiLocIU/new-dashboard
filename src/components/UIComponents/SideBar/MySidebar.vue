<template>
  <div class="sidebar-content">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MySidebar',
  props: {
    modelValue: {
      required: true,
    },
  },
  methods: {
    getValue() {
      return this.modelValue;
    },
    handleClickItem(id) {
      console.log('updateActive', id);
      this.$emit('update:modelValue', id);
    },
  },
});
</script>

<style lang="scss">
@import "./MySidebar.scss";
</style>
