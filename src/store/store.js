import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { User } from "../models/users";
import { Tags } from "../models/tags";
import { Card } from "../models/card";
import { Columns } from "../models/columns";

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    filter: {
      search: "",
      userIds: [],
      tagIds: [],
    },

    hiddenTags: false,
    hiddenUsers: false,
    hiddenNewTags: false,
    hiddenNewUsers: false,
    hiddenPopupColumns: false,

    columns: [
      new Columns({
        title: "Все задачи",
        id: 1,
      }),
      new Columns({
        title: "В процессе",
        id: 2,
      }),
      new Columns({
        title: "Тестирование",
        id: 3,
      }),
      new Columns({
        title: "Готова",
        id: 4,
      }),
    ],

    cards: [
      new Card({
        title: "Поднять front-end проект",
        columnId: 1,
      }),
      new Card({
        title: "Данные перевести на классы",
        columnId: 1,
        tagIds: [2, 4],
      }),
      new Card({
        title: "Данные записывать в локалстордж",
        columnId: 1,
      }),
      new Card({
        title: "Создать страницу управление тегами",
        columnId: 1,
        tagIds: [1, 4],
      }),

      new Card({
        title: "Поднять front-end проект",
        columnId: 2,
      }),

      new Card({
        title: "Данные перевести на классы",
        columnId: 2,
      }),
      new Card({
        title: "Данные записывать в локалстордж",
        columnId: 2,
        tagIds: [2, 3, 4],
      }),
      new Card({
        title: "Создать страницу управление тегами",
        columnId: 2,
      }),

      new Card({
        title: "Создать поиск по карточки",
        columnId: 3,
        tagIds: [1, 3],
      }),

      new Card({
        title: "Создать фильтр по карточки",
        columnId: 3,
      }),

      new Card({
        title: "Поднять front проект",
        columnId: 4,
      }),
      new Card({
        title: "Поднять back проект",
        columnId: 4,
        tagIds: [2, 4],
      }),
      new Card({
        title: "Создать роли для пользователя",
        columnId: 4,
        tagIds: [1],
      }),
    ],

    tags: [
      new Tags({
        backgroundColor: "#519839",
        name: "front-end",
        id: 1,
      }),
      new Tags({
        backgroundColor: "#f2d600",
        name: "back-end",
        id: 2,
      }),
      new Tags({
        backgroundColor: "#ff9f1a",
        name: "designer",
        id: 3,
      }),
      new Tags({
        backgroundColor: "#eb5a46",
        name: "hr-менеджер",
        id: 4,
      }),

      JSON.parse(localStorage.getItem("newtags")),
    ],

    users: [
      new User({
        icon: require("../assets/img/img-3.jpg"),
        name: "Елизавета",
        surname: "Персикова",
        login: "Liza",
        password: 333,
      }),

      new User({
        icon: require("../assets/img/img-2.jpg"),
        name: "Игорь",
        surname: "Персиков",
        login: "Igor",
        password: 222,
      }),

      new User({
        icon: require("../assets/img/img-1.jpg"),
        name: "Денис",
        surname: "Персиков",
        login: "Denis",
        password: 111,
      }),
    ],
  },

  getters: {
    ALL_CARDS(state) {
      return state.cards;
    },

    ALL_COLUMNS(state) {
      return state.columns;
    },

    ALL_TAGS(state) {
      return state.tags;
    },

    ALL_USERS(state) {
      return state.users;
    },

    HIDDEN_TAGS(state) {
      return state.hiddenTags;
    },

    HIDDEN_USERS(state) {
      return state.hiddenUsers;
    },
  },

  actions: {
    REGISTRATION({ commit }, { name, surname, login, password }) {
      commit("REGISTRATION", { name, surname, login, password });
    },

    SEARCH({ commit }, searchValue) {
      commit("SEARCH_CARD", searchValue);
      return axios(
        "https://jsonplaceholder.typicode.com/todos/1"
      ).then((data) => console.log(data));
    },

    DELETE_TAGS({ commit }, indexLabel) {
      commit("DELETE_TAGS", indexLabel);
    },

    CREATE_LABEL({ commit }, { title, backgroundColor }) {
      commit("CREATE_LABEL", { title, backgroundColor });
    },

    USERS_REMOVE({ commit }, userId) {
      commit("USERS_REMOVE", userId);
    },

    REMOVE_TAGS({ commit }, labelId) {
      commit("REMOVE_TAGS", labelId);
    },

    ADD_CARD({ commit }, { columnId, cardText }) {
      commit("ADD_CARD", { columnId, cardText });
    },

    REMOVE_CARD({ commit }, cardId) {
      commit("REMOVE_CARD", cardId);
    },

    REMOVE_COLUMN({ commit }, columnId) {
      commit("REMOVE_COLUMN", columnId);
    },

    ADD_COLUMN({ commit }, columTitle) {
      commit("ADD_COLUMN", columTitle);
    },
  },

  mutations: {
    REGISTRATION(state, { name, surname, login, password }) {
      let newuser = new User({
        name: name,
        surname: surname,
        login: login,
        password: password,
      });
      if (name !== "" && surname !== "" && login !== "" && password !== "") {
        state.users.push(newuser);
      }
    },

    SEARCH_CARD(state, searchValue) {
      state.filter.search = searchValue;

      // state.cards.forEach((card) => {
      //   if (searchValue === "") {
      //     card.filteredBySearch = false;
      //     return;
      //   }

      //   if (!card.title.toUpperCase().includes(searchValue.toUpperCase())) {
      //     card.filteredBySearch = true;
      //   } else {
      //     card.filteredBySearch = false;
      //   }
      // });
    },

    DELETE_TAGS(state, indexLabel) {
      state.tags.splice(indexLabel, 1);
    },

    CREATE_LABEL(state, { title, backgroundColor }) {
      let newTags = new Tags({
        backgroundColor: backgroundColor,
        name: title,
      });

      if (title !== "") {
        state.tags.push(newTags);
        localStorage.setItem("newtags", JSON.stringify(newTags));
      }
    },

    USERS_REMOVE(state, userId) {
      state.cards.forEach((card) => {
        let index = card.userIds.findIndex((idUser) => idUser === userId);
        card.userIds.splice(index, 1);
      });
    },

    REMOVE_TAGS(state, labelId) {
      state.cards.forEach((card) => {
        if (card.isActive === true) {
          let ind = card.tagIds.findIndex((tagId) => tagId === labelId);
          card.tagIds.splice(ind, 1);
        }
      });
    },

    ADD_CARD(state, { columnId, cardText }) {
      let newCart = new Card({
        title: cardText,
        tags: [],
        users: [],
        columnId: columnId,
      });
      if (cardText != "") {
        state.cards.push(newCart);
      }
    },

    REMOVE_CARD(state, cardId) {
      let index = state.cards.findIndex((card) => card.id === cardId);
      state.cards.splice(index, 1);
    },

    REMOVE_COLUMN(state, columnId) {
      let index = state.columns.findIndex((column) => column.id === columnId);
      state.columns.splice(index, 1);
    },

    ADD_COLUMN(state, columTitle) {
      if (columTitle !== "") {
        let newColumn = new Columns({
          title: columTitle,
        });
        state.columns.push(newColumn);
      }
    },
  },
});

export default store;

// class Base {}

// class User extends Base {

//   get a() {}
//   set a(val) {}

//   fdf() {
//     this
//   }

//   sss = ''

//   static ss = 1

//   constructor() {
//     super()
//     this
//   }

//   ddd = () => {
//     this
//   }
// }
// сидеть на джини
