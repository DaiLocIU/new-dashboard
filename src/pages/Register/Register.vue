<template>
  <div id="register-page" class="h-screen row w-full items-center justify-center">
    <div class="col-sm-6 col-md-6 col-lg-9 col-xl-7 sm:m-0 m-4">
      <my-card>
        <template v-slot:no-body>
          <div class="full-page-bg-color">
            <div class="row q-gutter-none">
              <div class="flex col-sm-0 col-md-0 col-lg-6 q-mx-auto self-center">
                <img
                  src="src/assets/img/pages/register.jpg"
                  alt="register"
                  class="q-mx-auto"
                >
              </div>
              <div class="col col-sm-12 col-md-12 col-lg-6 q-mx-auto self-center d-theme-dark-bg">
                <div class="px-8 pt-8 register-tabs-container">
                  <div class="my-card__title mb-4">
                    <h4 class="mb-4">Create Account</h4>
                    <p>Fill the below form to create a new account.</p>
                  </div>

                  <!--                <register-jwt></register-jwt>-->

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
import MyCard from '../../components/UIComponents/Card/MyCard.vue';

export default defineComponent({
  name: 'RegisterPage',
  components: {
    MyCard,
  },
});
</script>

<style scoped lang="scss">
#register-page {
 .d-theme-dark-bg {
   min-height: 517px;
 }
}
</style>
