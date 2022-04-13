<template>
  <div :style="cssVar" class="fit my-flex-layout flex">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent, computed, onMounted } from 'vue';

export default defineComponent({
  name: 'FlexLayout',
  props: {
    gutterInline: {
      type: Number,
    },
    gutterBlock: {
      type: Number,
    },
    defaultCol: {
      type: Number,
    },
    breakAt: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    onMounted(() => {
      const selectors = '.flex-item-test';
      const flexItem = document.querySelectorAll(selectors);
      for (let i = 0; i < flexItem.length; i += 1) {
        if ((i + 1) % props.defaultCol === 0) {
          flexItem[i].classList.add('last-col');
        }
        if (flexItem.length - (i + 1) <= props.defaultCol) {
          flexItem[i].classList.add('last-row');
        }
      }
    });

    const cssVar = computed(() => ({
      '--gutter-inline': `${props.gutterInline}px`,
      '--gutter-block': `${props.gutterBlock}px`,
      '--default-col': props.defaultCol,
    }));
    return {
      cssVar,
    };
  },

});
</script>

<style lang="scss">
.my-flex-layout {
  width: 80%;
  .flex-item-test {
    width: calc(
      (
        100% / var(--default-col)
      ) - (
        calc(calc(var(--default-col) - 1) * (var(--gutter-inline))) / var(--default-col)
      )
    );
    margin-right: var(--gutter-inline);
    margin-bottom: var(--gutter-block);
    height: 100px;
    background: #00bfa5;
    &.last-col {
      margin-right: 0;
    }
    &.last-row {
      margin-bottom: 0;
    }
  }
}
</style>
