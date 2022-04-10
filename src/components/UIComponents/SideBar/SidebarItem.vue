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
import { defineComponent } from 'vue';

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
  mounted() {
    window[`sidebarItem_${this.id}`] = this;
  },
  computed: {
    active() {
      if (this.$parent.getValue) return this.id === this.$parent.getValue();
      if (this.$parent.$parent.getValue) return this.id === this.$parent.$parent.getValue();
      return false;
    },
  },
  methods: {
    handleClick() {
      if (this.id) {
        if (this.$parent.handleClickItem) {
          this.$parent.handleClickItem(this.id);
        } else {
          // first parent is transition
          this.$parent.$parent.handleClickItem(this.id);
        }
      }
      if (this.to) {
        this.$router.push(this.to);
      } else if (this.href) {
        window.open(this.href, this.target);
      }
    },
  },
});
</script>
<style lang="scss">
@import "./SidebarItem.scss";
</style>
