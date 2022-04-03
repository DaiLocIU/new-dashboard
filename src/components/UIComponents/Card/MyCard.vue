<template>
  <q-card class="my-card" ref="card">
    <div class="my-card__collapsible-content vs-con-loading__container" ref="content">
      <div class="card__header" v-if="this.$slots.header">
        <slot name="header"></slot>
      </div>
      <slot name="card__header"></slot>
      <!-- content with no body(no padding) -->
      <slot name="no-body"></slot>

      <!-- content inside body(with padding) -->
      <div class="card__body" v-if="this.$slots.default">
        <slot></slot>
      </div>

      <!-- content with no body(no padding) -->
      <slot name="no-body-bottom"></slot>

      <div class="card__footer" v-if="this.$slots.footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
});
</script>
<style lang="scss">
@import "./MyCard.scss";
</style>
