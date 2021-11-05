<template>
  <div v-if="this.$store.state.hiddenUsers" class="users">
    <button @click="closeUsers" class="users__close">
      <img src="../assets/img/remove.png" alt="" />
    </button>
    <h4>Участники</h4>

    <div class="users__block">
      <div
        class="users__user"
        v-for="(user, indexUser) in ALL_USERS"
        :key="indexUser"
        @click="addUser(user)"
      >
        <img :src="user.icon" class="users__icon" alt="" />
        <p class="users__name">{{ user.name }}</p>
        <p class="users__name">{{ user.surname }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Users",

  data() {
    return {};
  },
  computed: {
    ...mapGetters(["ALL_USERS", "ALL_COLUMNS", "ALL_CARDS"]),
  },

  methods: {
    addUser(user) {
      this.ALL_CARDS.forEach((card) => {
        if (card.isActive === true) {
          card.userIds.push(user.id);
        }
      });
    },

    closeUsers() {
      if (this.$store.state.hiddenUsers === true) {
        this.$store.state.hiddenUsers = false;
      }
    },
  },
};
</script>

<style>
.users__name {
  margin: 0;
  font-size: 15px;
}

.users__user {
  cursor: pointer;
  margin: 7px;
}

.users__close {
  border: none;
  background: none;
  position: absolute;
  top: 15px;
  right: 10px;
  cursor: pointer;
}

.users__close img {
  width: 21px;
}

.users {
  width: 300px;
  background-color: #ebecf0;
  padding: 13px;
  position: absolute;
  box-sizing: border-box;
  border-radius: 5px;
  left: 252px;
  text-align: center;
  z-index: 10;
}

.users h4 {
  margin: 20px 0;
}

.users__input {
  height: 20px;
  width: 170px;
  margin-bottom: 10px;
}

.users__btn-add {
  width: 90px;
  height: 30px;
  background-color: #5aac44;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 4px;
}

label {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.users__block {
  display: flex;
  flex-wrap: wrap;
  padding-top: 10px;
}

.users__icon {
  width: 65px;
  border-radius: 50%;
  height: 65px;
  margin: 5px;
  cursor: pointer;
  object-fit: cover;
}
</style>
