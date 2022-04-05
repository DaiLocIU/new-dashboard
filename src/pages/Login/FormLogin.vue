<template>
  <q-form
    class="q-pa-sm q-pb-md"
    @submit="onSubmit"
  >
    <q-input
      filled
      type="email"
      v-model="email"
      label="Email"
      class="q-mt-md"
      lazy-rules
      :rules="rulesEmail"
    ></q-input>
    <q-input
      filled
      type="password"
      v-model="password"
      label="Mật khẩu"
      class="q-mt-md"
      lazy-rules
      :rules="[ val => val && val.trim().length > 0 || 'Vui lòng nhập mật khẩu']"
    ></q-input>
    <div class="w-full flex justify-between align-items">
      <q-btn label="Đăng ký" to="/pages/register" outline color="primary"></q-btn>
      <q-btn
        label="Đăng nhập"
        :disable="isDisabledButtonSubmit"
        type="Submit"
        color="primary">
      </q-btn>
    </div>
  </q-form>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'FormLogin',
  setup() {
    const $q = useQuasar();

    const name = ref(null);
    const phone = ref(null);
    const email = ref(null);
    const password = ref(null);
    const isTermsConditionAccepted = ref(false);

    // validate form
    function isValidEmail(valueEmail) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(valueEmail).toLowerCase());
    }
    // disabled button submit
    const isDisabledButtonSubmit = computed(() => !(
      (email.value && email.value.trim().length > 0 && isValidEmail(email.value.trim()))
        && (password.value && password.value.trim().length > 0)));

    const store = useStore();
    const router = useRouter();

    const onSubmit = async () => {
      try {
        const payload = {
          email: email.value,
          password: password.value,
        };
        await store.dispatch('auth/login', payload);
        $q.notify({
          message: 'Đăng nhập thành công',
          position: 'top',
        });
        await router.push({
          name: 'IndexPage',
        });
      } catch (e) {
        $q.notify({
          message: e.message,
          position: 'top',
        });
      }
    };

    return {
      name,
      phone,
      email,
      password,
      isTermsConditionAccepted,
      onSubmit,
      rulesPhone: [(val) => (val && val.trim().length > 0 && isValidPhone(val.trim())) || 'Vui lòng nhập Số điện thoại đúng định dạng'],
      rulesEmail: [(val) => (val && val.trim().length > 0 && isValidEmail(val.trim())) || 'Vui lòng nhập Email đúng định dạng'],
      isDisabledButtonSubmit,
    };
  },
});
</script>

<style scoped>

</style>
