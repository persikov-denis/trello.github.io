<template>
  <div>
    <Header />
    <h4 class="tags-page__title">Метки</h4>

    <div class="tags-page__common">
      <div class="tags-page">
        <TagPage
          v-for="(label, indexLabel) in ALL_TAGS"
          :key="indexLabel"
          :label="label"
          :indexLabel="indexLabel"
        />

        <button @click="openNewTags" class="tags-page__create-btn">
          <img src="../assets/img/plus.png" alt="Добавить" />
        </button>
      </div>

      <div v-if="$store.state.hiddenNewTags" class="tags-page__new-tags">
        <button @click="closeNewTags" class="tags-page__close">
          <img src="../assets/img/remove.png" />
        </button>
        <input
          v-model="title"
          class="tags-page__new-tags-input"
          type="text"
          placeholder="Ввидите название метки"
        />
        <div class="tags-page__new-tags-bg-common">
          <div
            v-for="(color, index) in colors"
            :key="index"
            @click="selectBg(color)"
            class="tags-page__new-tags-bg"
            v-bind:style="{
              background: color,
            }"
          ></div>
        </div>
        <button @click="addNewLabel" class="tags-page__new-tags-btn">
          Создать
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import TagPage from "../page/TagPage";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  name: "Tags",
  computed: {
    ...mapGetters(["ALL_TAGS"]),
  },
  components: {
    TagPage,
    Header,
  },

  data() {
    return {
      title: "",
      backgroundColor: "",
      colors: [
        "#eb5a46",
        "#ff9f1a",
        "#519839",
        "#f2d600",
        "#FF0000",
        "#00FF00",
        "#FF1493",
        "#FF4500",
        "#008B8B",
        "#0000FF",
        "#000",
        "#DCDCDC",
      ],
    };
  },

  methods: {
    ...mapActions(["CREATE_LABEL"]),

    selectBg(color) {
      this.backgroundColor = color;
    },

    addNewLabel() {
      this.CREATE_LABEL({
        title: this.title,
        backgroundColor: this.backgroundColor,
      });
      this.backgroundColor = "";
      this.title = "";
    },

    openNewTags() {
      this.$store.state.hiddenNewTags = !this.$store.state.hiddenNewTags;
    },

    closeNewTags() {
      this.$store.state.hiddenNewTags = false;
    },
  },
};
</script>

<style>
.tags-page__close {
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 9px;
  right: 4px;
}

.tags-page__close img {
  width: 18px;
}

.tags-page__common {
  display: flex;
  align-items: flex-start;
  margin-top: 40px;
}

.tags-page__new-tags-btn {
  cursor: pointer;
  height: 28px;
  width: 85px;
  box-shadow: 0px 0px 5px black;
  border-radius: 5px;
  margin-top: 5px;
  margin-bottom: 12px;
  border: none;
  font-size: 14px;
}

.tags-page__new-tags-btn:hover {
  background-color: #fff;
  transition: 0.5s;
}

.tags-page__new-tags {
  width: 300px;
  text-align: center;
  border-radius: 5px;
  background-color: #ebecf0;
  box-shadow: 0px 0px 5px black;
  margin-left: 30px;
  position: relative;
}

.tags-page__new-tags-input {
  height: 24px;
  width: 220px;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 0px 5px black;
  outline: none;
  font-size: 14px;
  margin-top: 32px;
  text-indent: 7px;
}

.tags-page__new-tags-bg-common {
  display: flex;
  width: 260px;
  flex-wrap: wrap;
  padding: 5px 7px;
  border-radius: 5px;
  margin: auto;
  margin-top: 6px;
}

.tags-page__new-tags-bg {
  width: 55px;
  height: 30px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.tags-page__create-btn {
  background: none;
  display: flex;
  align-items: center;
  padding: 6px 6px 6px 8px;
  border: none;
  box-shadow: 0px 0px 3px black;
  border-radius: 5px;
  cursor: pointer;
}

.tags-page__create-btn:hover {
  background-color: #fff;
  transition: 0.5s;
}

.tags-page__create-btn img {
  width: 16px;
  margin-right: 2px;
}

.tags-page {
  width: 360px;
  background-color: #ebecf0;
  border-radius: 5px;
  padding: 25px 0px 10px 13px;
  box-sizing: border-box;
  box-shadow: 0px 0px 5px black;
  margin-left: 15px;
}

.tags-page__title {
  text-align: center;
  font-size: 18px;
}
</style>
