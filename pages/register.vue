<script setup lang="ts">

interface register {
  username: string,
  email: string,
  password: string
}

const register = ref<register>({
  username: '',
  email: '',
  password: ''
});

const db = useSupabaseClient();

const submit = async (username: string, email: string, password: string) => {

  // @ts-ignore
  const {error} = await db.from('users').insert([
    {
      username: username,
      email: email,
      password: password
    }
  ]);

  if (error) {

    register.value = {
      username: '',
      email: '',
      password: ''
    }

    return alert(error.message);
  }

  const router = useRouter();

  router.push('/login');
}

</script>

<template>
  <div class="container">
    <h1>Регистрация</h1>

    <form @submit.prevent="submit(register.username, register.email, register.password)">
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
        {{}}
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