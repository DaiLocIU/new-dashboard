<template>
  <q-form
    class="q-pa-sm q-pb-md"
    @submit="onSubmit"
  >
    <q-input
      filled
      v-model="name"
      label="Họ và tên"
      lazy-rules
      :rules="[ val => val && val.trim().length > 0 || 'Vui lòng nhập Họ và tên']"
    ></q-input>

    <q-input
      filled
      type="tel"
      v-model="phone"
      label="Số điện thoại"
      class="q-mt-md"
      lazy-rules
      :rules="rulesPhone"
    ></q-input>
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
    <q-checkbox
      v-model="isTermsConditionAccepted"
      label="Tôi đã đồng ý và đọc các điều khoản sử dụng của Woay"
      class="q-my-md"
    />
    <div class="w-full flex justify-between align-items">
      <q-btn label="Đăng nhập" to="/pages/login" outline color="primary"></q-btn>
      <q-btn
        label="Đăng ký"
        :disable="isDisabledButtonSubmit"
        type="Submit"
        color="primary">
      </q-btn>
    </div>
  </q-form>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'FormRegister',
  setup() {
    const $q = useQuasar();

    const name = ref(null);
    const phone = ref(null);
    const email = ref(null);
    const password = ref(null);
    const isTermsConditionAccepted = ref(false);

    // validate form
    function isValidPhone(p) {
      const newP = p.startsWith('0') ? p.replace('0', '+84') : p;
      return /^\+(?:[0-9]●?){10,11}[0-9]$/.test(newP);
    }
    function isValidEmail(valueEmail) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(valueEmail).toLowerCase());
    }
    // disabled button submit
    const isDisabledButtonSubmit = computed(() => !((name.value && name.value.trim().length > 0)
        && (phone.value && phone.value.trim().length > 0 && isValidPhone(phone.value.trim()))
        && (email.value && email.value.trim().length > 0 && isValidEmail(email.value.trim()))
        && (password.value && password.value.trim().length > 0)
        && isTermsConditionAccepted.value));

    const store = useStore();

    const onSubmit = async () => {
      try {
        const phonePayload = phone.value.startsWith('0')
          ? phone.value.replace('0', '+84')
          : phone.value;
        const payload = {
          name: name.value,
          phone: phonePayload,
          email: email.value,
          password: password.value,
        };
        await store.dispatch('auth/register', payload);
        $q.notify({
          message: 'Vui lòng kiểm tra email để tiếp tục',
          position: 'top',
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
