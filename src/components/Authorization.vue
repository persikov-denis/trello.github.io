<template>
  <div class="authorization">
    <h1>Авторизация</h1>
    <form>
      <input
        v-model="login"
        placeholder="Логин"
        autocomplete="on"
        type="text"
      />
      <input
        v-model.number="password"
        placeholder="Пароль"
        autocomplete="on"
        type="password"
      />
    </form>
    <p v-if="error" class="authorization__error">Неверный логин или пароль</p>
    <div class="authorization__btns">
      <button @click="onLogin">Вход</button>
      <button @click="openRegistration">Регитсрация</button>
    </div>

    <div v-if="hiddenRegistration" class="registration">
      <h1>Регистрация</h1>
      <form>
        <input v-model="name" type="text" placeholder="Имя" autocomplete="on" />
        <input
          v-model="surname"
          type="text"
          placeholder="Фамилия"
          autocomplete="on"
        />
        <input
          v-model="createLogin"
          placeholder="Логин"
          type="text"
          autocomplete="on"
        />
        <input
          v-model.number="createPassword"
          placeholder="Пароль"
          type="password"
        />
      </form>

      <div class="authorization__btns">
        <button @click="registration">Зарегистрироваться</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { UserApi } from "../api/user";
export default {
  name: "Authorization",

  computed: {
    ...mapGetters(["ALL_USERS"]),
  },

  data() {
    return {
      name: "",
      surname: "",
      login: "",
      password: "",
      error: false,
      createLogin: "",
      createPassword: "",
      hiddenRegistration: false,
    };
  },

  methods: {
    ...mapActions(["REGISTRATION"]),

    onLogin() {
      let loginBody = {
        login: this.login,
        password: this.password,
      };

      UserApi.login(loginBody);
      // .then((user) => {})
      // .catch((error) => {});
      // this.ALL_USERS.forEach((user) => {
      //   if (user.login === this.login && user.password === this.password) {
      //     localStorage.setItem("currentUserId", user.id);
      //     this.$router.push({ path: "/wrapper" });
      //     user.isRegistered = true;
      //   } else {
      //     this.error = true;
      //   }
      // });
    },

    registration() {
      this.REGISTRATION({
        name: this.name,
        surname: this.surname,
        login: this.createLogin,
        password: this.createPassword,
      });
      this.name = "";
      this.surname = "";
      this.createLogin = "";
      this.createPassword = "";
    },

    openRegistration() {
      this.hiddenRegistration = !this.hiddenRegistration;
    },
  },
};
</script>

<style>
.authorization__btns {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.authorization h1 {
  text-align: center;
  font-size: 30px;
}

.authorization input {
  height: 27px;
  width: 220px;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 0px 5px black;
  outline: none;
  font-size: 14px;
  text-indent: 7px;
  display: block;
  margin: 10px auto;
}

.authorization button {
  background-color: #5aac44;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 9px 8px;
  margin: 0 2px;
}

.authorization button:hover {
  background-color: #2fa111;
}

.authorization__error {
  text-align: center;
  color: red;
}
</style>
