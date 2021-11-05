<template>
  <div class="add-column__common">
    <div @click="showCard" :class="{ hiddenStyle: hidden }" class="add-column">
      <img src="../assets/img/plus.png" alt="" />
      <p>Колонка</p>
    </div>

    <div v-if="hidden" class="add-column__click">
      <input
        @keyup.enter="addColumn"
        v-model="columTitle"
        class="add-column__input"
        placeholder="Ввести заголовок списка"
      />
      <div>
        <div class="add-column__button-img">
          <button @click="addColumn" class="add-column__button-add">
            Добавить колонку
          </button>
          <img
            @click="closeCard"
            class="add-column__close"
            src="../assets/img/plus.png"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AddColumn",

  data() {
    return {
      hidden: false,
      columTitle: "",
    };
  },

  methods: {
    ...mapActions(["ADD_COLUMN"]),

    addColumn() {
      this.ADD_COLUMN(this.columTitle);
      this.columTitle = "";
    },

    showCard() {
      this.hidden = true;
    },

    closeCard() {
      this.hidden = false;
    },
  },
};
</script>

<style>
.add-column {
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 40px;
  width: 105px;
  background-color: #ebecf0;
  box-shadow: 0px 0px 5px black;
  border-radius: 5px;
}

.add-column img {
  width: 16px;
  margin-left: 9px;
}

.add-column p {
  font-size: 14px;
  color: #343131cc;
  margin-left: 5px;
}

.add-column__button-img {
  display: flex;
  align-items: center;
}

.add-column__button-img img {
  width: 23px;
  margin-left: 8px;
  cursor: pointer;
}

.add-column:hover {
  background-color: #ebecf0cf;
  transition: 0.5s;
}

.hiddenStyle {
  display: none;
}

.add-column__click {
  display: flex;
  flex-direction: column;
  background-color: #ebecf0;
  padding: 4px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px black;
}

.add-column__input {
  width: 170px;
  border-radius: 5px;
  font-size: 13.5px;
  padding-left: 4px;
  height: 38px;
  margin-bottom: 3px;
  box-sizing: border-box;
}

.add-column__button-add {
  width: 130px;
  height: 33px;
  background-color: #5aac44;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.add-column__button-add:hover {
  background-color: rgba(0, 128, 0, 0.822);
  transition: 0.5s;
}
</style>
