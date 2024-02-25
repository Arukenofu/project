<script setup lang="ts">

const register = ref<{username: string, email: string, password: string}>({
  username: '',
  email: '',
  password: ''
})

const error = ref<string>('');

const submit = async () => {
  if (register.value.username?.length < 4) {
    alert('Длина имени не меньше 4')
    return;
  }
  if (register.value.email?.length < 5) {
    alert('Длина почты не меньше 5')
    return;
  }
  if (register.value.password?.length < 5) {
    alert('Длина пароля не меньше 6')
    return;
  }

  const {data} = await useFetch('/api/register', {
    method: 'POST',
    body: {
      username: register.value.username,
      email: register.value.email,
      password: register.value.password
    }
  });

  console.log(data.value);

  if (!data.value) {
    alert('Неправильно!');
    return;
  }

  const router = useRouter();

  await router.push('/login')

}
</script>

<template>
  <div class="container">
    <h1>Регистрация</h1>

    <form @submit.prevent="submit()">
      <label for="username">
        Username
      </label>
      <input type="text" v-model="register.username">

      <label for="email">
        Email
      </label>
      <input type="text" v-model="register.email">

      <label for="password">
        Password
      </label>
      <input type="password" v-model="register.password">

      <button type="submit">
        Отправить
      </button>

      <div style="text-align: center; color: #ff4a4a; margin-top: 21px;">
        {{error}}
      </div>

      <nuxt-link style="text-align: center" to="/login">
        Логин
      </nuxt-link>
    </form>
  </div>
</template>

<style scoped lang="scss">
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #0c0c0c;
  height: 550px;
  width: 800px;
  padding: 27px 33px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  h1 {
    text-align: center;
    margin-bottom: 21px;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 0 auto;

    label {
      font-size: 1.3rem;
    }

    input {
      outline: none;
      border: none;
      margin-bottom: 21px;
      color: #151515;
      padding: 9px 4px;
      font-size: 1rem;
    }

    button {
      padding: 6px 0;
      color: #151515;
      cursor: pointer;
    }
  }
}
</style>