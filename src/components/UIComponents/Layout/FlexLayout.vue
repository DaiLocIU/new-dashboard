<template>
  <div :style="cssVar" class="fit my-flex-layout flex">
    <slot></slot>
  </div>
</template>

<script>
import {
  defineComponent, computed, onMounted, ref, watch, onDeactivated,
} from 'vue';
import { MatchMediaBreakpoint } from 'src/helpers/breakPointMatchMedia';

export default defineComponent({
  name: 'FlexLayout',
  props: {
    gutterInline: {
      type: Number,
    },
    gutterBlock: {
      type: Number,
    },
    breakAt: {
      type: [],
      default: () => [],
    },
  },
  setup(props) {
    const col = ref(null);
    const matchMediaBreakpoint = new MatchMediaBreakpoint({
      breakpoints: props.breakAt,
      onBreakpointChange: (breakpoint) => {
        col.value = breakpoint;
      },
    });
    col.value = matchMediaBreakpoint.value;
    const currentCol = computed(() => col.value);
    const addAndRemoveClassItem = () => {
      const selectors = '.flex-item-test';
      const flexItem = document.querySelectorAll(selectors);
      for (let i = 0; i < flexItem.length; i += 1) {
        if ((i + 1) % currentCol.value === 0) {
          flexItem[i].classList.add('last-col');
        } else {
          flexItem[i].classList.remove('last-col');
        }
        if (flexItem.length - (i + 1) <= currentCol.value) {
          flexItem[i].classList.add('last-row');
        } else {
          flexItem[i].classList.remove('last-row');
        }
      }
    };

    watch(currentCol, () => {
      addAndRemoveClassItem();
    }, { immediate: true });
    onMounted(() => {
      addAndRemoveClassItem();
    });
    onDeactivated(() => {
      matchMediaBreakpoint.destroy();
    });

    const cssVar = computed(() => ({
      '--gutter-inline': `${props.gutterInline}px`,
      '--gutter-block': `${props.gutterBlock}px`,
      '--current-col': currentCol.value,
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
        100% / var(--current-col)
      ) - (
        calc(calc(var(--current-col) - 1) * (var(--gutter-inline))) / var(--current-col)
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
