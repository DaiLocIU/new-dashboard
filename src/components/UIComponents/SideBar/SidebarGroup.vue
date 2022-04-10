<template>
  <div
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
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SidebarGroup',
  props: {
    open: {
      type: Boolean,
    },
  },
  data() {
    return {
      group: true,
      openState: false,
    };
  },
  mounted() {
    if (this.$el.querySelector('.active') || this.open) {
      this.openState = true;
    }
  },
  methods: {
    handleClickItem(id) {
      this.$parent.handleClickItem(id);
    },

    getValue() {
      return this.$parent.getValue();
    },

    beforeEnter(el) {
      el.style.height = 0;
    },

    enter(el, done) {
      const h = el.scrollHeight;
      el.style.height = `${h - 1}px`;

      done();
    },

    leave(el) {
      el.style.minHeight = '0px';
      el.style.height = '0px';
    },

  },
  watch: {
    open: {
      handler(newVal) {
        this.$nextTick(() => {
          const h = this.$refs.content.scrollHeight;
          const parent = this.$parent;
          if (parent.group) {
            if (newVal) {
              parent.$refs.content.style.height = `${parent.$refs.content.scrollHeight + h - 1}px`;
            } else {
              parent.$refs.content.style.height = `${parent.$refs.content.scrollHeight - h + 1}px`;
            }
          }
        });
      },
    },
  },
});
</script>
<style lang="scss">
@import "./SidebarGroup.scss";
</style>
