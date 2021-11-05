<template>
  <header class="header">
    <div class="header__container">
      <div class="header__common">
        <div class="header__btns">
          <router-link :to="{ name: 'wrapper' }">
            <button class="header__btn-home">
              <img src="../assets/img/home.jpg" alt="" />
            </button>
          </router-link>

          <router-link :to="{ name: 'tags-page' }">
            <button class="header__btn">Метки</button>
          </router-link>

          <router-link :to="{ name: 'users-page' }">
            <button class="header__btn">Участники</button>
          </router-link>
        </div>

        <div
          v-for="(user, index) in resolveUsers()"
          :key="index"
          :title="user.name + '' + user.surname"
          class="header__users"
        >
          <div>
            <img class="header__icon" :src="user.icon" alt="" />
          </div>
          <button @click="out" class="header__btn-out">Выйти</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Header",

  computed: {
    ...mapGetters(["ALL_USERS"]),
  },

  methods: {
    resolveUsers() {
      return this.ALL_USERS.filter((user) => user.isRegistered === true);
    },

    out() {
      this.ALL_USERS.forEach((user) => {
        user.isRegistered = false;
      });
      localStorage.removeItem("currentUserId");
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style>
.header__container {
  max-width: 1335px;
  margin: auto;
}

.header__icon {
  width: 40px;
  border-radius: 50%;
  height: 40px;
  margin: 4px 5px 0px 0px;

  cursor: pointer;
  object-fit: cover;
}

.header {
  background: #3e505a;
}

.header__btn-out {
  background: rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  font-size: 12px;
  color: #e6e6e6;
  padding: 6px;
  text-decoration: none;
  transition: transform 85ms ease-in;
  cursor: pointer;
}

.header__common {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 5px;
}

.header__btns {
  display: flex;
}

.header__users {
  display: flex;
  align-items: center;
}

.header__btn {
  background: rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  color: #e6e6e6;
  padding: 10px 8px 10px 8px;
  text-decoration: none;
  transition: transform 85ms ease-in;
  cursor: pointer;
}

.header__btn:hover,
.header__btn-home:hover,
.header__btn-out:hover {
  background: rgba(0, 0, 0, 0.9);
  transition: 0.5s;
}

.header__btn-home {
  background: rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 47px;
  height: 39px;
}

.header__btn-home img {
  border-radius: 50%;
  width: 28px;
}
</style>
