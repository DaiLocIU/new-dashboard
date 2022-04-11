<template>
  <button
    class="sidebar__item"
    :class="[{
      'active': active,
      'hasIcon': !!$slots.icon
    }]"
    @click="handleClick"
  >
    <div class="sidebar__item__icon" v-if="$slots.icon">
      <slot name="icon"></slot>
    </div>
    <div class="sidebar__item__text">
      <slot></slot>
    </div>
    <div class="sidebar__item__text-tooltip">
      <slot></slot>
    </div>
    <div class="sidebar__item__arrow">
      <slot v-if="arrow" name="arrow">
        <q-icon name="icon-chevron-down"></q-icon>
      </slot>
    </div>
  </button>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'SidebarItem',
  props: {
    to: {
      type: String,
    },
    href: {
      type: String,
    },
    target: {
      type: String,
      default: '_blank',
    },
    id: {
      type: String,
    },
    arrow: {
      type: Boolean,
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const currentSidebarActive = computed(() => store.state.sidebar.currentActive);
    const active = computed(() => props.id === currentSidebarActive.value);
    const setCurrentSidebarActive = (value) => store.dispatch('sidebar/updateCurrentActive', value);
    const handleClick = () => {
      if (props.id) {
        setCurrentSidebarActive(props.id);
      }
      if (props.to) {
        router.push(props.to);
      } else if (props.href) {
        window.open(props.href, props.target);
      }
    };
    return {
      active,
      handleClick,
    };
  },
});
</script>
<style lang="scss">
@import "./SidebarItem.scss";
</style>
