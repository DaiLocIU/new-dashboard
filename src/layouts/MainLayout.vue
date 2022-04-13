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
          <div class="group-sidebar"
            v-for="(group, indexGroup) in sidebar"
            :key="indexGroup"
          >
            <component
              v-for="(link, index) in group.items"
              :is="sidebarType(link)"
              :id="link.routeName"
              :key="link.routeName + '_' + index"
              :children="link.children || []"
            >
                <template #icon>
                  <q-icon :name="link.icon"></q-icon>
                </template>
                <span v-if="sidebarType(link) === 'sidebar-item'">{{ link.name }}</span>
                <template v-if="link.children" #header>
                  <sidebar-item arrow>
                    <template #icon>
                      <q-icon :name="link.icon"></q-icon>
                    </template>
                    {{ link.name }}
                  </sidebar-item>
                </template>
            </component>
          </div>
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
import MySidebar from 'components/UIComponents/SideBar/Sidebar.vue';
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
    const initSidebar = () => store.dispatch('sidebar/initSidebar');
    initSidebar();
    const setCurrentSidebarActive = (value) => store.dispatch('sidebar/updateCurrentActive', value);
    setCurrentSidebarActive('Home');

    const sidebar = computed(() => store.state.sidebar.sidebar);
    const sidebarType = (link) => (link.children && link.children.length ? 'sidebar-group' : 'sidebar-item');

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
      sidebar,
      sidebarType,
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
