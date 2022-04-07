<template>
  <q-layout view="lHh Lpr lFf" class="bg-white">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="windowWidth < 1200"
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          {{ BASE_URL }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2"
      :breakpoint="1200"
    >
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable target="_blank" rel="noopener" href="https://quasar.dev">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Docs</q-item-label>
            <q-item-label caption>https://quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable target="_blank" rel="noopener" href="https://github.quasar.dev">
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>GitHub</q-item-label>
            <q-item-label caption>github.com/quasarframework</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable target="_blank" rel="noopener" href="http://chat.quasar.dev">
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Discord Chat Channel</q-item-label>
            <q-item-label caption>https://chat.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable target="_blank" rel="noopener" href="https://forum.quasar.dev">
          <q-item-section avatar>
            <q-icon name="record_voice_over" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Forum</q-item-label>
            <q-item-label caption>https://forum.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable target="_blank" rel="noopener" href="https://twitter.quasar.dev">
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Twitter</q-item-label>
            <q-item-label caption>@quasarframework</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable target="_blank" rel="noopener" href="https://facebook.quasar.dev">
          <q-item-section avatar>
            <q-icon name="public" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Facebook</q-item-label>
            <q-item-label caption>@QuasarFramework</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {
  defineComponent, ref, computed,
} from 'vue';

import { useStore } from 'vuex';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const store = useStore();
    const leftDrawerOpen = ref(false);
    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }
    const windowWidth = computed(() => store.state.layout.windowWidth);
    return {
      windowWidth,
      leftDrawerOpen,
      toggleLeftDrawer,
    };
  },
  data() {
    return {
      BASE_URL: this.$util.getEnv(VUE_APP_BASE_URL),
    };
  },

});
</script>
<style lang="scss">
.main-layout {
  .q-header {
    position: relative;
    width: 100%;
  }
  .q-page-container {
    padding-top: 0 !important;
  }
  #content-area {
    &.content-area-lg {
      margin-left: 260px;
    }
    &.content-area-full {
      margin-left: 0;
    }
    height: 100%;
    transition: margin-left 0.5s;
  }
}
</style>
