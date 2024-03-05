<script setup lang="ts">

interface login {
  email: string;
  password: string;
}

const login = ref<login>({
  email: '',
  password: ''
})

const db = useSupabaseClient();

const submit = async(email: string, password: string) => {
  // @ts-ignore
  const {data, error} = await db.from('users').select('*').match({
    email: email,
    password: password
  })

  if (data?.length) {

    const emailCookie = useCookie('email', {
      expires: new Date(new Date().getTime() + 15 * 60000)
    })!

    emailCookie.value = data[0].email;

    const loginCookie = useCookie('password', {
      expires: new Date(new Date().getTime() + 15 * 60000)
    })

    loginCookie.value = data[0].username;

    const passwordCookie = useCookie('username', {
      expires: new Date(new Date().getTime() + 15 * 60000)
    })

    passwordCookie.value = data[0].password;

    const router = useRouter();

    await router.push('/home')

  } else {
    alert('Неправильные данные')
  }
}

</script>

<template>
  <div class="container">
    <h1>Вход в аккаунт</h1>

    <form @submit.prevent="submit(login.email, login.password)">
      <label for="email">
        Email
      </label>
      <input type="text" v-model="login.email">

      <label for="password">
        Password
      </label>
      <input type="password" v-model="login.password">

      <button type="submit">
        Отправить
      </button>

      <div style="text-align: center; color: #ff4a4a; margin-top: 21px;">
        {{}}
      </div>

      <nuxt-link style="text-align: center" to="/register">
        Регистрация
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