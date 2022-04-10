<template>
  <q-layout view="lHh Lpr lFf" class="main-layout bg-white">
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
      class="my-sidebar bg-grey-2"
      :breakpoint="1200"
    >
      <q-list class="fit">
        <div class="shadow-bottom" v-if="showShadowBottom"></div>
        <perfect-scrollbar
          class="scroll-area"
          @ps-scroll-y="psSectionScroll" @scroll="psSectionScroll"
          ref="menuPs"
        >
          <my-sidebar
            v-model="active"
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
                  <q-icon name="icon-circle-check-box"></q-icon>
                </template>
                Instagram
              </sidebar-item>
              <sidebar-item id="twitter">
                <template #icon>
                  <q-icon name="icon-circle-check-box"></q-icon>
                </template>
                Twitter
              </sidebar-item>
              <sidebar-item id="Facebook">
                <template #icon>
                  <q-icon name="icon-circle-check-box"></q-icon>
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
                  <q-icon name="icon-circle-check-box"></q-icon>
                </template>
                Github
              </sidebar-item>
              <sidebar-item id="codepen">
                <template #icon>
                  <q-icon name="icon-circle-check-box"></q-icon>
                </template>
                Codepen
              </sidebar-item>
              <sidebar-item id="discord">
                <template #icon>
                  <q-icon name="icon-circle-check-box"></q-icon>
                </template>
                Discord
              </sidebar-item>
              <sidebar-item id="Javascript">
                <template #icon>
                  <q-icon name="icon-circle-check-box"></q-icon>
                </template>
                Javascript
              </sidebar-item>
              <sidebar-item id="git">
                <template #icon>
                  <q-icon name="icon-circle-check-box"></q-icon>
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
          </my-sidebar>

        </perfect-scrollbar>
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
    const leftDrawerOpen = ref(false);
    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }
    const windowWidth = computed(() => store.state.layout.windowWidth);
    const showShadowBottom = ref(false);
    const active = ref('home');
    return {
      windowWidth,
      leftDrawerOpen,
      toggleLeftDrawer,
      showShadowBottom,
      active,
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
  .q-drawer {
    width: 260px !important;
  }
  .q-page-container {
    padding-top: 0 !important;
  }
  .my-sidebar {
    .shadow-bottom{
      position: absolute;
      z-index: 2;
      height: 60px;
      width: 100%;
      pointer-events: none;
      margin-top: -1.3rem;
      filter: blur(5px);
      background: linear-gradient(
          rgb(255, 255, 255) 41%, rgba(255, 255, 255, 0.11) 95%, rgba(255, 255, 255, 0) 100%
      );
    }
    .ps>.ps__rail-x {
      display: none !important;
    }

    .scroll-area {
      position: relative;
      margin: auto;
      width: 100%;
      height: calc(var(--vh, 1vh) * 100 - 69px);

      &:not(.ps) {
        overflow-y: auto;
      }

      > .sidebar-group{
        padding: 0 15px;
      }

      > .sidebar--item{
        padding: 0 15px;
      }
    }
  }
}
</style>
