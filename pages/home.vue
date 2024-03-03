<script setup lang="ts">
const username = useCookie('username');

const deleteCookie = () => {
  localStorage.clear();

  const router = useRouter();

  const email = useCookie('email');
  const password = useCookie('password');

  username.value = null;
  email.value = null;
  password.value = null;

  router.push('/login');
}

</script>

<template>
  Привет {{username}}!

  <button @click="deleteCookie">
    Удалить все данные
  </button>
</template>

<style scoped lang="scss">
button {
  color: #151515;
  border: none;

}
</style>