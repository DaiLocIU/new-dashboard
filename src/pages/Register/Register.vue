<template>
  <div id="register-page" class="h-screen bg-img row w-full items-center justify-center">
    <div class="col-sm-6 col-md-6 col-lg-9 col-xl-7 sm:m-0 m-4">
      <my-card>
        <template v-slot:no-body>
          <div class="full-page-bg-color">
            <div class="row q-gutter-none">
              <div v-if="$q.screen.gt.md" class="flex col-lg-6 q-mx-auto self-center">
                <img
                  src="src/assets/img/pages/register.jpg"
                  alt="register"
                  class="q-mx-auto"
                >
              </div>
              <div class="col col-sm-12 col-md-12 col-lg-6 q-mx-auto self-center bg-white">
                <div class="q-px-lg q-pt-lg register-tabs-container">
                  <div class="my-card__title mb-4">
                    <h4 class="q-mt-none q-mb-sm">Đăng Ký</h4>
                    <form-register></form-register>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </my-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import FormRegister from 'pages/Register/FormRegister.vue';
import MyCard from 'components/UIComponents/Card/MyCard.vue';

export default defineComponent({
  name: 'RegisterPage',
  components: {
    MyCard,
    FormRegister,
  },
});
</script>

<style scoped lang="scss">
#register-page {
 .bg-white {
   min-height: 517px;
 }
}
</style>
