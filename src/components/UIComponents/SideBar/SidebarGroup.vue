<template>
  <div
    ref="root"
    class="sidebar__group"
    :class="{'open': this.openState}"
  >
    <div
      class="sidebar__group__header"
      @click="openState = !openState"
    >
      <slot name="header"></slot>
    </div>
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <div
        class="sidebar__group__content"
        ref="content"
        v-show="openState"
      >
        <slot>
          <sidebar-item
            v-for="(link, indexChildren) in children"
            :key="link.routeName + '_' + indexChildren"
            :id="link.routeName"
          >
            <template #icon>
              <q-icon :name="link.icon"></q-icon>
            </template>
            {{ link.name }}
          </sidebar-item>
        </slot>
      </div>
    </transition>
  </div>
</template>

<script>
import {
  defineComponent, getCurrentInstance, ref, onMounted, watch, nextTick,
} from 'vue';
import SidebarItem from 'components/UIComponents/SideBar/SidebarItem.vue';

export default defineComponent({
  name: 'SidebarGroup',
  props: {
    open: {
      type: Boolean,
    },
    children: {
      type: Array,
    },
  },
  components: {
    SidebarItem,
  },
  setup(props) {
    const instance = getCurrentInstance();
    const openState = ref(false);
    const root = ref(null);
    onMounted(() => {
      if (root.value.querySelector('.active') || props.open) {
        openState.value = true;
      }
    });

    const content = ref(null);

    watch(open, async (newVal) => {
      await nextTick();
      const h = content.value.scrollHeight;
      const { parent } = instance;
      if (parent.group) {
        if (newVal) {
          parent.$refs.content.style.height = `${parent.$refs.content.scrollHeight + h - 1}px`;
        } else {
          parent.$refs.content.style.height = `${parent.$refs.content.scrollHeight - h + 1}px`;
        }
      }
    });

    const beforeEnter = (el) => {
      el.style.height = 0;
    };
    const enter = (el, done) => {
      const h = el.scrollHeight;
      el.style.height = `${h - 1}px`;
      done();
    };

    const leave = (el) => {
      el.style.minHeight = '0px';
      el.style.height = '0px';
    };
    return {
      openState,
      beforeEnter,
      enter,
      leave,
      root,
      content,
    };
  },
});
</script>
<style lang="scss">
@import "./SidebarGroup.scss";
</style>
