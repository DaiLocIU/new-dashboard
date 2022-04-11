<template>
  <q-layout view="lHh Lpr lFf" class="main-layout bg-white">
    <my-sidebar
        v-model:open="open"
        :hidden-background="open && windowWidth < 1200"
      >
        <div class="shadow-bottom" v-if="showShadowBottom"></div>
        <perfect-scrollbar
          class="scroll-area"
          @ps-scroll-y="psSectionScroll" @scroll="psSectionScroll"
          ref="menuPs"
        >
          <sidebar-item id="home">
          <template #icon>
            <q-icon name="icon-book-open"></q-icon>
          </template>
          Home
          </sidebar-item>
          <sidebar-item id="market">
            <template #icon>
              <q-icon name="icon-book-open"></q-icon>
            </template>
            Market Overview
          </sidebar-item>
          <sidebar-item id="Music">
            <template #icon>
              <q-icon name="icon-book-open"></q-icon>
            </template>
            Music
          </sidebar-item>
          <sidebar-group>
            <template #header>
              <sidebar-item arrow>
                <template #icon>
                  <q-icon name="icon-book-open"></q-icon>
                </template>
                Social media
              </sidebar-item>
            </template>

            <sidebar-item id="Instagram">
              <template #icon>
                <q-icon size="16px" name="icon-circle-check-box"></q-icon>
              </template>
              Instagram
            </sidebar-item>
            <sidebar-item id="twitter">
              <template #icon>
                <q-icon size="16px" name="icon-circle-check-box"></q-icon>
              </template>
              Twitter
            </sidebar-item>
            <sidebar-item id="Facebook">
              <template #icon>
                <q-icon size="16px" name="icon-circle-check-box"></q-icon>
              </template>
              Facebook
            </sidebar-item>
          </sidebar-group>
          <sidebar-group>
            <template #header>
              <sidebar-item arrow>
                <template #icon>
                  <q-icon name="icon-book-open"></q-icon>
                </template>
                Coding
              </sidebar-item>
            </template>

            <sidebar-item id="github">
              <template #icon>
                <q-icon size="16px" name="icon-circle-check-box"></q-icon>
              </template>
              Github
            </sidebar-item>
            <sidebar-item id="codepen">
              <template #icon>
                <q-icon size="16px" name="icon-circle-check-box"></q-icon>
              </template>
              Codepen
            </sidebar-item>
            <sidebar-item id="discord">
              <template #icon>
                <q-icon size="16px" name="icon-circle-check-box"></q-icon>
              </template>
              Discord
            </sidebar-item>
            <sidebar-item id="Javascript">
              <template #icon>
                <q-icon size="16px" name="icon-circle-check-box"></q-icon>
              </template>
              Javascript
            </sidebar-item>
            <sidebar-item id="git">
              <template #icon>
                <q-icon size="16px" name="icon-circle-check-box"></q-icon>
              </template>
              Git
            </sidebar-item>
          </sidebar-group>
          <sidebar-item id="donate">
            <template #icon>
              <q-icon name="icon-book-open"></q-icon>
            </template>
            Donate
          </sidebar-item>
          <sidebar-item id="drink">
            <template #icon>
              <q-icon name="icon-book-open"></q-icon>
            </template>
            Drink
          </sidebar-item>
          <sidebar-item id="shopping">
            <template #icon>
              <q-icon name="icon-book-open"></q-icon>
            </template>
            Shopping
          </sidebar-item>
          <sidebar-item id="chat">
            <template #icon>
              <q-icon name="icon-book-open"></q-icon>
            </template>
            Chat
          </sidebar-item>
        </perfect-scrollbar>
      </my-sidebar>
    <div class="content-area" :class="contentAreaClass">
      <div class="relative-position">
        <q-header elevated>
          <q-toolbar>
            <q-btn
              v-if="windowWidth < 1200"
              flat
              dense
              round
              @click="open = !open"
              aria-label="Menu"
              icon="menu"
            />

            <q-toolbar-title>
              {{ BASE_URL }}
            </q-toolbar-title>
          </q-toolbar>
        </q-header>
      </div>
      <q-page-container>
        <router-view />
      </q-page-container>
    </div>
  </q-layout>
</template>

<script>
import {
  defineComponent, ref, computed, watch,
} from 'vue';

import { useStore } from 'vuex';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import MySidebar from 'components/UIComponents/SideBar/MySidebar.vue';
import SidebarItem from 'components/UIComponents/SideBar/SidebarItem.vue';
import SidebarGroup from 'components/UIComponents/SideBar/SidebarGroup.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    MySidebar,
    SidebarItem,
    SidebarGroup,
    PerfectScrollbar,
  },
  setup() {
    const store = useStore();

    const setCurrentSidebarActive = (value) => store.dispatch('sidebar/updateCurrentActive', value);
    setCurrentSidebarActive('home');
    const windowWidth = computed(() => store.state.layout.windowWidth);
    const open = ref(false);
    watch(windowWidth, (newValue) => {
      open.value = newValue >= 1200;
    }, { immediate: true });
    const contentAreaClass = computed(() => {
      if (windowWidth.value < 1200) return 'content-area-full';
      return open.value ? 'content-area-lg' : 'content-area-full';
    });
    const showShadowBottom = ref(false);
    return {
      open,
      windowWidth,
      showShadowBottom,
      contentAreaClass,
    };
  },
  data() {
    return {
      BASE_URL: this.$util.getEnv(VUE_APP_BASE_URL),
    };
  },
  methods: {
    psSectionScroll() {
      const scrollEl = this.$refs.menuPs.$el || this.$refs.menuPs;
      this.showShadowBottom = scrollEl.scrollTop > 0;
    },
  },

});
</script>
<style src="vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css"/>
<style lang="scss">
.main-layout {
  .q-header {
    position: relative;
    width: 100%;
  }
  .content-area {
    &.content-area-full {
      margin-left: 0;
    }
    &.content-area-lg {
      margin-left: 260px;
    }
  }
  .q-page-container {
    padding-top: 0 !important;
  }
}
</style>
