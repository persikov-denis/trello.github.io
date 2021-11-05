<template>
  <div v-if="hiddenUser" class="users-page-edit">
    <img :src="user.icon" class="users__icon" alt="" />
    <input v-model="userEditName" type="text" />
    <input v-model="userEditSurname" type="text" />
    <button @click="closeUser" class="users-page-edit__close">
      <img src="../assets/img/remove.png" alt="" />
    </button>
    <button @click="userSave" class="users-page-edit__create">Сохранить</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["user"],

  computed: {
    ...mapGetters(["ALL_USERS"]),
  },

  data() {
    return {
      userEditName: this.user.name,
      userEditSurname: this.user.surname,
      hiddenUser: true,
    };
  },

  methods: {
    userSave() {
      this.ALL_USERS.forEach((user) => {
        if (
          user.isActive === true &&
          this.userEditName !== "" &&
          this.userEditSurname !== ""
        ) {
          user.name = this.userEditName;
          user.surname = this.userEditSurname;
        }
      });
    },

    closeUser() {
      this.hiddenUser = false;
      this.ALL_USERS.forEach((user) => {
        if (user.isActive === true) {
          user.isActive = false;
        }
      });
    },
  },
};
</script>

<style>
.users-page-edit__close {
  border: none;
  background: none;
  cursor: pointer;
  position: absolute;
  top: 6px;
  right: 4px;
}

.users-page-edit__close img {
  width: 20px;
}

.users-page-edit__create {
  cursor: pointer;
  height: 28px;
  width: 85px;
  box-shadow: 0px 0px 5px black;
  border-radius: 5px;
  margin-top: 9px;
  border: none;
  margin-bottom: 3px;
  font-size: 14px;
}

.users-page-edit {
  width: 300px;
  background-color: #ebecf0;
  padding: 13px;
  box-sizing: border-box;
  margin-left: 15px;
  border-radius: 5px;
  text-align: center;
  position: relative;
  margin-top: 40px;
  margin-bottom: 3px;
  box-shadow: 0px 0px 5px black;
}

.users-page-edit input {
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
</style>
