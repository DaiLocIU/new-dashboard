<template>
  <router-view />
</template>

<script>
import { defineComponent, watch } from 'vue';
import { useStore } from 'vuex';
import useWindowSize from 'src/hooks/useWindowSize';

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore();
    const [width, height] = useWindowSize();
    const updateWindowWidth = (value) => store.dispatch('layout/updateWindowWidth', value);
    watch([width, height], () => {
      updateWindowWidth(width.value);
      document.documentElement.style.setProperty('--vh', `${height.value * 0.01}px`);
    }, { immediate: true });
  },

});
</script>
