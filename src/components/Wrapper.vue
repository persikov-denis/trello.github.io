<template>
  <div>
    <Header />

    <div class="root">
      <div class="container">
        <div class="wrapper__search">
          <input
            class="wrapper__search-inp"
            v-model="searchValue"
            type="text"
            placeholder="Название карточки"
            @keyup.enter="searchCard"
          />
          <button class="wrapper__search-btn" @click="searchCard">Поиск</button>
        </div>

        <div class="wrapper__users">
          <div
            @click="filterUser(user)"
            :title="user.name + ' ' + user.surname"
            v-for="(user, indexusers) in ALL_USERS"
            :key="indexusers"
          >
            <div class="card__users">
              <img class="card__users-icon" :src="user.icon" alt="" />
              <span class="card__user-name"> </span>
            </div>
          </div>
        </div>

        <div class="wrapper__tags">
          <div
            @click="filterTags(tag)"
            v-for="(tag, index) in ALL_TAGS"
            :key="index"
            class="wrapper__tag"
            v-bind:style="{
              background: tag.backgroundColor,
            }"
          >
            <span class="wrapper__tag-name">{{ tag.name }} </span>
          </div>
        </div>

        <div class="wrapper__common-columns">
          <div class="wrapper__common">
            <Columns
              v-for="(column, indexColumn) in ALL_COLUMNS"
              :key="indexColumn"
              :column="column"
            />
          </div>

          <AddColumn />
          <Tags />
          <Users />
          <PopupColumns />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./Header";
import Columns from "./Columns";
import AddColumn from "./AddColumn";
import Tags from "./Tags";
import Users from "./Users";
import PopupColumns from "./PopupColumns";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "Wrapper",

  data() {
    return {
      searchValue: "",
    };
  },

  methods: {
    ...mapActions(["SEARCH"]),

    filterTags(tag) {
      this.$store.state.filter.tagIds.push(tag.id);
    },

    filterUser(user) {
      this.$store.state.filter.userIds.push(user.id);
    },

    searchCard() {
      this.SEARCH(this.searchValue);
    },
  },

  computed: {
    ...mapGetters(["ALL_COLUMNS", "ALL_USERS", "ALL_CARDS", "ALL_TAGS"]),
  },

  components: {
    Columns,
    AddColumn,
    Tags,
    Users,
    Header,
    PopupColumns,
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
}

.wrapper__tags {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 25px;
}

.wrapper__tag {
  border-radius: 5px;
  float: left;
  margin-left: 5px;
  margin-top: 6px;
  padding: 2px 5px;
  cursor: pointer;
}

.wrapper__common {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
}

.container {
  margin: auto;
  max-width: 1310px;
}

.wrapper__users {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.wrapper__search {
  display: flex;
  justify-content: flex-end;
  padding-top: 55px;
  padding-bottom: 35px;
}

.wrapper__search-btn {
  width: 74px;
  height: 28px;
  background-color: #5aac44;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 2px;
}

.wrapper__search-btn:hover {
  background-color: #5aac44d9;
  transition: 0.5s;
}

.wrapper__search-inp {
  height: 25px;
  border: none;
  text-indent: 9px;
  width: 165px;
  border-radius: 5px;
  outline: none;
  font-size: 14px;
  letter-spacing: 0.3px;
}

.wrapper__search-inp::placeholder {
  font-size: 12px;
}

.wrapper__common-columns {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.root {
  background-image: url(../assets/img/bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  font-family: "Roboto", sans-serif;
  color: #2c3e50;
  min-height: 800px;
}
</style>
