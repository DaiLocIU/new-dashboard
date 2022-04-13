<template>
  <div v-if="hiddenBackground" class="sidebar-background"></div>
  <div
    class="sidebar-content"
    :class="[{
      'open': open
    }]"
  >
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent, watch } from 'vue';

export default defineComponent({
  name: 'MySidebar',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    hiddenBackground: {
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const clickCloseSidebar = (evt) => {
      if (!evt.target.closest('.sidebar-content')) {
        emit('update:open', false);
      }
    };
    watch(() => props.hiddenBackground, (newValue) => {
      if (newValue) {
        setTimeout(() => {
          window.addEventListener('click', clickCloseSidebar);
        }, 200);
      } else {
        window.removeEventListener('click', clickCloseSidebar);
      }
    });
  },
  mounted() {
    window.MySidebar = this;
  },
});
</script>

<style lang="scss">
@import "Sidebar";
</style>
