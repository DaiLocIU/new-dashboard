<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore();
    const updateWindowWidth = (value) => store.dispatch('layout/updateWindowWidth', value);
    const handleWindowResize = () => {
      updateWindowWidth(window.innerWidth);
      // Set --vh property
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    return {
      updateWindowWidth,
      handleWindowResize,
    };
  },
  mounted() {
    this.updateWindowWidth(window.innerWidth);
    const vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  },
  async created() {
    window.addEventListener('resize', this.handleWindowResize);
  },
  unmounted() {
    window.removeEventListener('resize', this.handleWindowResize);
  },
});
</script>
