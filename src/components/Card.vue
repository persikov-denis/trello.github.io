<template>
  <div class="card">
    <div class="card__tags-common">
      <div
        v-for="(label, indexlabel) in resolveTags(card.tagIds)"
        :key="indexlabel"
        class="card__tags"
        :style="{ background: label.backgroundColor }"
      >
        <div class="card__tags-btn-title">
          <span class="card__tags-title"> {{ label.name }} </span>
          <button
            v-if="hiddenRemove"
            @click="removeTag(label)"
            class="card__tags-remove"
          >
            <img src="../assets/img/remove.png" alt="" />
          </button>
        </div>
      </div>
    </div>

    <div class="card__common">
      <span class="card__title"> {{ card.title }} </span>
      <div class="card__item">
        <div>
          <div v-if="hiddenCardEdit" class="card__edit">
            <div class="card__tags-data-common">
              <textarea
                v-model="editCardText"
                maxlength="80"
                class="card__textarea"
              ></textarea>

              <div class="card__users-common">
                <div
                  :title="user.name + ' ' + user.surname"
                  v-for="(user, indexusers) in resolveUsers(card.userIds)"
                  :key="indexusers"
                >
                  <div class="card__users">
                    <img class="card__users-icon" :src="user.icon" alt="" />
                    <span class="card__user-name"> </span>
                    <button
                      @click="usersRemove(user.id)"
                      class="card__users-remove"
                    >
                      <img src="../assets/img/remove-3.png" alt="" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button @click="saveCard" class="card__save">Сохранить</button>

            <div class="card__edit-button">
              <button @click="openTags">Добавить метку</button>
              <button @click="openUsers">Добавить участника</button>
              <button @click="openPopup">Переместить в другую колонку</button>
            </div>
          </div>
        </div>

        <button @click="editCard" class="card__btn-edit">
          <img src="../assets/img/edit.png" alt="" />
        </button>
        <button @click="removeCard" class="card__btn-remove">
          <img src="../assets/img/remove.png" alt="" />
        </button>
      </div>
    </div>

    <div class="card__users-common">
      <div
        :title="user.name"
        v-for="(user, indexusers) in resolveUsers(card.userIds)"
        :key="indexusers"
      >
        <div class="card__users">
          <img class="card__users-icon" :src="user.icon" alt="" />
          <span class="card__user-name"> </span>
          <button @click="usersRemove(user.id)" class="card__users-remove">
            <img src="../assets/img/remove-3.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "Card",
  props: ["card", "indexCard"],

  computed: {
    ...mapGetters(["ALL_TAGS", "ALL_USERS"]),
  },

  data() {
    return {
      hidden: false,
      hiddenCardEdit: false,
      editCardText: this.card.title,
      hiddenRemove: false,
    };
  },

  methods: {
    ...mapActions(["REMOVE_TAGS", "USERS_REMOVE"]),

    usersRemove(userId) {
      this.USERS_REMOVE(userId);
    },

    resolveUsers(usersIdis) {
      let result = [];
      usersIdis.forEach((id) => {
        let user = this.ALL_USERS.find((user) => user.id === id);
        result.push(user);
      });
      return result;
    },

    openUsers() {
      this.$store.state.hiddenUsers = true;
      this.card.isActive = true;
    },

    removeTag(label) {
      this.REMOVE_TAGS(label.id);
    },

    resolveTags(tagsIds) {
      let result = [];
      tagsIds.forEach((id) => {
        let tags = this.ALL_TAGS.find((tag) => tag.id === id);
        result.push(tags);
      });
      return result;
    },

    openTags() {
      this.card.isActive = true;
      this.$store.state.hiddenTags = true;
    },

    openPopup() {
      this.$store.state.hiddenPopupColumns = !this.$store.state
        .hiddenPopupColumns;
    },

    saveCard() {
      if (this.editCardText != "") {
        this.card.title = this.editCardText;
        this.hiddenCardEdit = false;
        this.hiddenRemove = false;
        this.card.isActive = false;

        this.$store.state.hiddenTags = false;
        this.$store.state.hiddenUsers = false;
      }
    },

    editCard() {
      this.hiddenCardEdit = !this.hiddenCardEdit;
      this.card.isActive = true;
      this.hiddenRemove = true;
    },

    removeCard() {
      this.$emit("removeCard", this.card.id);
    },
  },
};
</script>

<style>
.card__characters {
  position: absolute;
  top: 90px;
  right: 7px;
  font-size: 12px;
  color: #757575;
}

.card__users-icon {
  width: 40px;
  border-radius: 50%;
  height: 40px;
  cursor: pointer;
  object-fit: cover;
  display: block;
  margin: auto;
}

.card__tags-remove {
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  padding-left: 3px;
}

.card__user-name {
  font-size: 14px;
}

.card__tags-remove img {
  width: 12px;
}

.card__users-remove {
  border: none;
  background: none;
  cursor: pointer;
  position: absolute;
  top: 0px;
  left: 17px;
  display: none;
}

.card__users-remove img {
  width: 14px;
}

.card__users {
  position: relative;
  margin: 1px 5px;
  text-align: center;
  display: inline-block;
}

.card__users:hover .card__users-remove {
  display: block;
}

.card__users-common {
  margin: 5px 0;
}

.card {
  background-color: #fff;
  box-shadow: 0 1px 0 rgb(9 30 66 / 25%);
  border-radius: 3px;
}

.card__tags-btn-title {
  display: flex;
  margin-top: 4px;
}

.card__tags-title {
  color: #fff;
  font-size: 13px;
  margin-bottom: 3px;
}

.card__tags-data-common {
  background: #fff;
  border-radius: 5px;
}

.card__tags-btn-edit img {
  width: 19px;
  margin-left: 7px;
}

.card__tags-common {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  margin-bottom: 2px;
}

.card__btn-edit,
.card__tags-btn-edit,
.card__btn-remove {
  border: none;
  padding: 0;
  cursor: pointer;
  background: none;
}

.card__tags-btn-edit {
  margin-bottom: 8px;
}

.card__btn-edit img,
.card__btn-remove img {
  width: 16px;
  margin-left: 16px;
}

.card__tags {
  border-radius: 5px;
  float: left;
  margin-left: 5px;
  margin-top: 6px;
  padding: 2px 5px;
}

.card__common {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 0 5px;
  border-radius: 3px;
  position: relative;
}

.card__edit-button {
  position: absolute;
  right: -235px;
}

.card__edit-button button {
  background: rgba(0, 0, 0, 0.6);
  border-radius: 3px;
  clear: both;
  color: #e6e6e6;
  display: block;
  float: left;
  margin: 0 0 4px 8px;
  padding: 6px 12px 6px 8px;
  text-decoration: none;
  transition: transform 85ms ease-in;
}

.card__edit-button button:hover {
  cursor: pointer;
  background: rgba(0, 0, 0, 0.9);
  transition: 0.5s;
}

.card:hover .card__btn-edit {
  display: block;
}

.card__btn-edit {
  position: absolute;
  right: 35px;
  top: 5px;
  background: #fff;
  display: none;
}

.card__btn-remove {
  position: absolute;
  top: 5px;
  right: 5px;
  background: #fff;
  display: none;
}

.card__edit {
  position: absolute;
  top: 0px;
  right: -2px;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  z-index: 1;
}

.card:hover .card__btn-remove {
  display: block;
}

.card__title {
  overflow-wrap: anywhere;
  padding: 5px 0;
  text-align: left;
  line-height: 1.3;
}

.card__save {
  width: 110px;
  height: 32px;
  background-color: #5aac44;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 4px;
}

.card__textarea {
  width: 225px;
  font-size: 16px;
  padding-left: 5px;
  color: #2c3e50;
  resize: none;
  overflow: hidden;
  line-height: 1.3;
  height: 100px;
  border-radius: 5px;
  padding-top: 5px;
  outline: none;
  border: none;
  font-family: "Roboto", sans-serif;
}
</style>
