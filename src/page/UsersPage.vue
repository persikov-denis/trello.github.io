<template>
  <div>
    <Header />
    <h4 class="users-page__heading">Участники</h4>

    <div class="users-page">
      <div class="users-page__common">
        <div class="users-page__users">
          <div class="users-page__btn-add-common">
            <button @click="openNewUsers" class="users-page__btn-add">
              <img src="../assets/img/plus.png" alt="" />
            </button>
          </div>

          <div class="users-page__users-block">
            <div
              class="users-page__users-user"
              v-for="(user, indexUser) in ALL_USERS"
              :key="indexUser"
            >
              <img :src="user.icon" class="users__icon" alt="" />
              <p class="users__name">{{ user.name }}</p>
              <p class="users__name">{{ user.surname }}</p>

              <button @click="editUser(user)" class="users-page__edit-btn">
                <img src="../assets/img/edit.png" alt="" />
              </button>

              <button @click="removeUser(user)" class="users-page__remove">
                <img src="../assets/img/remove-3.png" alt="" />
              </button>
            </div>
          </div>
        </div>

        <div v-if="$store.state.hiddenNewUsers" class="users-page__new-users">
          <button @click="closeNewUsers" class="users-page__new-users-close">
            <img src="../assets/img/remove.png" alt="" />
          </button>
          <div class="users-page__new-users-input">
            <input v-model="name" type="text" placeholder="Ввидите ваше имя" />
            <input
              v-model="surname"
              type="text"
              placeholder="Ввидите вашу фамилию"
            />
          </div>

          <div class="users-page__new-users-icon-common">
            <div
              v-for="(icon, index) in icons"
              :key="index"
              @click="addNewUser(icon)"
              class="users-page__new-users-icon"
            >
              <img :src="icon.icon" alt="" />
            </div>
            <button @click="createUser" class="users-page__new-users-create">
              Создать
            </button>
          </div>
        </div>
      </div>
      <UsersEdit v-for="(user, index) in userEdit" :key="index" :user="user" />
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import UsersEdit from "../page/UsersPageEdit";
import { mapGetters } from "vuex";
export default {
  name: "Users",

  components: {
    Header,
    UsersEdit,
  },

  data() {
    return {
      name: "",
      surname: "",
      img: "",
      userEdit: [],

      icons: [
        { icon: require("../assets/img/1.png") },
        { icon: require("../assets/img/2.png") },
        { icon: require("../assets/img/3.png") },
        { icon: require("../assets/img/4.png") },
        { icon: require("../assets/img/5.png") },
        { icon: require("../assets/img/6.png") },
        { icon: require("../assets/img/7.png") },
        { icon: require("../assets/img/8.png") },
      ],
    };
  },

  computed: {
    ...mapGetters(["ALL_USERS", "ALL_COLUMNS"]),
  },

  methods: {
    editUser(user) {
      this.userEdit.push({
        icon: user.icon,
        name: user.name,
        surname: user.surname,
      });
      user.isActive = true;
      console.log(user);
    },

    removeUser(userId) {
      let index = this.ALL_USERS.findIndex((user) => user.id === userId.id);
      this.ALL_USERS.splice(index, 1);
    },

    addNewUser(icon) {
      if (this.name !== "" && this.surname !== "") {
        this.img = icon.icon;
      }
    },

    createUser() {
      if (this.name !== "" && this.surname !== "" && this.img !== "") {
        this.ALL_USERS.push({
          icon: this.img,
          name: this.name,
          surname: this.surname,
          id: Math.random(),
        });
      }
      this.name = "";
      this.surname = "";
    },

    openNewUsers() {
      this.$store.state.hiddenNewUsers = !this.$store.state.hiddenNewUsers;
    },

    closeNewUsers() {
      this.$store.state.hiddenNewUsers = false;
    },
  },
};
</script>

<style>
.users-page {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.users-page__edit-btn {
  cursor: pointer;
  border: none;
  top: 1px;
  left: 0px;
  background: none;
  position: absolute;
  display: none;
}

.users-page__edit-btn img {
  width: 18px;
}

.users-page__remove {
  cursor: pointer;
  border: none;
  background: none;
  position: absolute;
  top: 0;
  right: 0;
  display: none;
}

.users-page__remove img {
  width: 23px;
}

.users-page__new-users-create {
  cursor: pointer;
  height: 28px;
  width: 85px;
  box-shadow: 0px 0px 5px black;
  border-radius: 5px;
  margin-top: 5px;
  border: none;
  margin-bottom: 8px;
  font-size: 14px;
}

.users-page__new-users-create:hover {
  transition: 0.5s;
  background-color: #fff;
}

.users-page__new-users-close {
  background: none;
  border: none;
  position: absolute;
  top: 11px;
  right: 7px;
  cursor: pointer;
}

.users-page__new-users-close img {
  width: 19px;
}

.users-page__new-users-mark {
  position: absolute;
  top: 11px;
  left: 16px;
  width: 17px;
}

.users-page__new-users-icon {
  margin: 5px;
  cursor: pointer;
  position: relative;
}

.users-page__btn-add-common {
  display: flex;
  justify-content: flex-end;
}

.users-page__new-users-icon-common {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 23px;
}

.users-page__new-users-input {
  margin-top: 35px;
}

.users-page__new-users {
  width: 300px;
  background-color: #ebecf0;
  padding: 13px;
  box-sizing: border-box;
  margin-left: 20px;
  border-radius: 5px;
  text-align: center;
  position: relative;
}

.users-page__new-users input {
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

.users-page__btn-add {
  background: none;
  display: flex;
  align-items: center;
  padding: 5px;
  border: none;
  box-shadow: 0px 0px 3px black;
  border-radius: 5px;
  cursor: pointer;
}

.users-page__common {
  display: flex;
  align-items: flex-start;
  margin-top: 40px;
}

.users-page__btn-add:hover {
  background-color: #fff;
  transition: 0.5s;
}

.users-page__btn-add img {
  width: 16px;
}

.users-page__heading {
  text-align: center;
}

.users__name {
  margin: 0;
}

.users-page__users-user {
  position: relative;
  cursor: pointer;
  margin: 7px;
}

.users-page__users-user:hover .users-page__remove,
.users-page__users-user:hover .users-page__edit-btn {
  display: block;
}

.users__close img {
  width: 21px;
}

.users-page__users {
  width: 300px;
  background-color: #ebecf0;
  padding: 13px;
  box-sizing: border-box;
  box-shadow: 0px 0px 5px black;
  border-radius: 5px;
  text-align: center;
  margin-left: 15px;
}

.users__input {
  height: 20px;
  width: 170px;
  margin-bottom: 10px;
}

label {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.users-page__users-block {
  display: flex;
  flex-wrap: wrap;
  padding-top: 20px;
}

.users__icon {
  width: 65px;
  border-radius: 50%;
  height: 65px;
  margin: 5px;
  cursor: pointer;
  object-fit: cover;
}

.styleHidden {
  display: none;
}
</style>
