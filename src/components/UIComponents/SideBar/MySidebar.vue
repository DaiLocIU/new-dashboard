<template>
  <transition
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @enter-cancelled="onEnterCancelled"
    @before-leave="onBeforeLeave"
    @leave="onLeave"
    @after-leave="onAfterLeave"
    @leave-cancelled="onLeaveCancelled"
    name="sidebar-fade"
  >
    <div
      v-show="modelValue"
      ref="sidebarbackground"
      class="content-sidebar">
      <div
        @click="closeSidebar"
        v-if="!hiddenBackground"
        class="my-sidebar--background"></div>
      <div
        ref="sidebarContainer"
        :class="[
          `my-sidebar-color`,
          `my-sidebar-reduceNotRebound`,
          {
            'my-sidebar-parent': parent !== 'body',
          }
        ]"
        class="my-sidebar">
        <header
          v-if="this.$slots.header"
          class="my-sidebar--header"
        >
          <slot name="header"></slot>
        </header>

        <div class="my-sidebar--items">
          <slot></slot>
        </div>

        <footer
          v-if="this.$slots.footer"
          class="my-sidebar--footer"
        >
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MySidebar',
  props: {
    modelValue: {
      required: true,
    },
    defaultIndex: {
      default: null,
      type: [String, Number],
    },
    color: {
      default: 'primary',
      type: String,
    },
    parent: {
      default: null,
      type: [String, Object],
    },

    clickNotClose: {
      default: false,
      type: Boolean,
    },
    hiddenBackground: {
      default: false,
      type: Boolean,
    },
  },

  mounted() {
    this.insertBody();
  },
  methods: {
    onBeforeEnter(el) {
      console.log('onBeforeEnter', el, Date.now());
    },

    // called one frame after the element is inserted.
    // use this to start the animation.
    onEnter(el, done) {
      console.log('onEnter', el, Date.now());
      // call the done callback to indicate transition end
      // optional if used in combination with CSS
      done();
    },

    // called when the enter transition has finished.
    onAfterEnter(el) {
      console.log('onAfterEnter', el, Date.now());
    },
    onEnterCancelled(el) {
      console.log('onEnterCancelled', el, Date.now());
    },

    // called before the leave hook.
    // Most of the time, you shoud just use the leave hook.
    onBeforeLeave(el) {
      console.log('onBeforeLeave', el, Date.now());
    },

    // called when the leave transition starts.
    // use this to start the leaving animation.
    onLeave(el, done) {
      console.log('onLeave', el, Date.now());
      // call the done callback to indicate transition end
      // optional if used in combination with CSS
      done();
    },

    // called when the leave transition has finished and the
    // element has been removed from the DOM.
    onAfterLeave(el) {
      console.log('onAfterLeave', el, Date.now());
    },

    onLeaveCancelled(el) {
      console.log('leaveCancelled', el, Date.now());
    },

    // only available with v-show transitions

    addEventClick() {
      console.log('addEventClick');
      this.$nextTick(() => {
        const parentx = typeof this.parent === 'string'
          ? document.querySelector(this.parent) : this.parent;

        const element = parentx || window;
        if (this.value) {
          setTimeout(() => {
            element.addEventListener('click', this.closeSidebar);
          }, 300);
        }
      });
    },
    closeSidebar(evt) {
      console.log('closeSideBar', evt);
      const parent = evt.target.closest('.vs-sidebar');
      console.log('parent', parent);
      if (!parent) {
        this.$emit('update:modelValue', false);
        const parentx = typeof this.parent === 'string'
          ? document.querySelector(this.parent) : this.parent;
        const element = parentx || window;
        element.removeEventListener('click', this.closeSidebar);
      }
    },
    insertBody() {
      if (this.parent) {
        const elx = this.$refs.sidebarbackground;
        const parentx = typeof this.parent === 'string'
          ? document.querySelector(this.parent) : this.parent;
        parentx.insertBefore(elx, parentx.firstChild);
      }
    },
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        if (!this.clickNotClose) this.addEventClick();
      },
    },
  },
});
</script>

<style lang="scss">
@import "./MySidebar.scss";
</style>
