<template>
  <div
    class="columns"
    @drop="onDrop($event)"
    @dragover.prevent
    @dragenter.prevent
  >
    <div class="columns__card">
      <div class="columns__headline-buuton">
        <div class="columns__headline-block">
          <b class="columns__headline-fatty"
            ><p
              @click="openInput"
              :class="{ hiddenStyle: hiddenInput }"
              class="columns__headline"
            >
              {{ column.title }}
            </p></b
          >
        </div>
        <input
          v-if="hiddenInput"
          @keyup.enter="editColumnTitle"
          v-model="editTitle"
          :class="{ borderStyle: border }"
          class="columns__input"
          type="text"
          placeholder="Ввести название колонки"
        />
        <button @click="removeColumn" class="columns__btn-remove">
          <img src="../assets/img/remove.png" alt="" />
        </button>
      </div>

      <Card
        v-for="(card, indexCard) in resolveCards()"
        @dragstart="dragStart($event, card)"
        draggable="true"
        :key="indexCard"
        :card="card"
        :indexCard="indexCard"
        @removeCard="removeCard"
      />

      <div
        @click="openCard"
        :class="{ hiddenStyle: hiddenCard }"
        class="columns__add-card"
      >
        <img src="../assets/img/plus.png" alt="" />
        <p>Добавить карточку</p>
      </div>

      <div v-if="hiddenCard" class="columns__add-card-click">
        <textarea
          class="columns__textarea"
          v-model="cardText"
          maxlength="80"
          placeholder="Вести заголовок для этой карточки"
        ></textarea>
        <div class="columns__add-card-button-img-common">
          <div class="columns__add-card-button-img">
            <button @click="addNewCard" class="columns__add-card-button-add">
              Добавить карточку
            </button>
            <img
              @click="closeCard"
              class="columns__remove"
              src="../assets/img/remove.png"
              alt=""
            />
          </div>

          <button class="columns__add-card-button-parameters">
            <img src="../assets/img/button.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "./Card";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  name: "Columns",
  props: ["column"],

  components: {
    Card,
  },
  computed: {
    ...mapGetters(["ALL_CARDS", "ALL_USERS"]),
  },
  data() {
    return {
      hiddenInput: false,
      hiddenCard: false,
      border: false,
      editTitle: this.column.title,
      cardText: "",
    };
  },

  methods: {
    ...mapActions(["REMOVE_COLUMN", "REMOVE_CARD", "ADD_CARD"]),

    // dragStart(event, card) {
    //   event.dataTransfer.dropEffect = "move";
    //   event.dataTransfer.effectAllowed = "move";
    //   event.dataTransfer.setData("cardId", card.id);
    // },
    // DragEvent

    // onDrop(event) {
    //   let cardId = event.dataTransfer.getData("cardId");
    //   return this.ALL_CARDS.filter((card) => {
    //     if (card.id === cardId) {
    //       card.columnId = this.column.id;
    //     }
    //   });
    // },

    resolveCards() {
      let res = this.ALL_CARDS.filter(
        (card) => card.columnId === this.column.id
      );

      return res.filter((card) => {
        let isActive =
          this.$store.state.filter.tagIds.length === 0 &&
          this.$store.state.filter.userIds.length === 0;

        if (
          !card.title
            .toUpperCase()
            .includes(this.$store.state.filter.search.toUpperCase())
        ) {
          isActive = false;
        }

        this.$store.state.filter.tagIds.forEach((tagId) => {
          if (isActive === true) return;

          card.tagIds.forEach((cardTagId) => {
            if (isActive === true) return;

            if (cardTagId === tagId) {
              isActive = true;
            } else {
              isActive = false;
            }
          });
        });

        this.$store.state.filter.userIds.forEach((userId) => {
          card.userIds.forEach((cardUserIds) => {
            if (cardUserIds === userId) {
              isActive = true;
            } else {
              isActive = false;
            }
          });
        });

        return isActive;
      });
    },

    addNewCard() {
      this.ADD_CARD({ columnId: this.column.id, cardText: this.cardText });
      this.cardText = "";
    },

    removeCard(cardId) {
      this.REMOVE_CARD(cardId);
    },

    removeColumn() {
      this.REMOVE_COLUMN(this.column.id);
    },

    editColumnTitle() {
      if (this.editTitle != "") {
        this.column.title = this.editTitle;
        this.hiddenInput = false;
      }
      if (this.editTitle === "") {
        this.border = true;
      }
    },

    openInput() {
      this.hiddenInput = true;
    },

    openCard() {
      this.hiddenCard = true;
    },

    closeCard() {
      this.hiddenCard = false;
    },
  },
};
</script>

<style>
.columns__characters {
  position: absolute;
  top: 53px;
  right: 4px;
  font-size: 12px;
  color: #757575;
}

.columns {
  box-shadow: 0px 0px 5px black;
  border-radius: 5px;
  margin-right: 13px;
  margin-bottom: 13px;
}

.columns__card {
  width: 270px;
  padding: 8px 20px;
  background-color: #ebecf0;
  box-sizing: border-box;
  border-radius: 5px;
}

.columns__input {
  height: 21px;
  font-size: 15px;
  width: 170px;
  margin-top: 11px;
  margin-right: 35px;
  margin-bottom: 11px;
  font-weight: 600;
  outline: none;
  color: #2c3e50;
  border: 1px solid;
  border-radius: 5px;
}

.columns__input::placeholder {
  font-size: 13px;
  font-weight: 100;
}

.columns__headline {
  cursor: pointer;
  font-size: 15px;
  word-break: break-all;
  margin-left: 4px;
}

.columns__headline-block {
  display: flex;
  align-items: center;
}

.columns__headline-buuton {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.columns__btn-remove {
  width: 27px;
  margin-top: -14px;
  margin-right: -9px;
  height: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
}

.columns__btn-remove:hover {
  background-color: rgba(27, 8, 8, 0.158);
  transition: 0.5s;
  border-radius: 6px;
}

.columns__img {
  width: 27px;
  height: 27px;
}

.columns__btn-remove img {
  width: 21px;
}

.columns__add-card {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 5px;
}

.columns__add-card:hover {
  background-color: rgba(27, 8, 8, 0.158);
  transition: 0.5s;
  border-radius: 6px;
}

.columns__add-card img {
  width: 16px;
  margin-left: 9px;
}

.columns__add-card p {
  font-size: 14px;
  color: #343131cc;
  margin-left: 5px;
}

.columns__add-card-click textarea {
  width: 230px;
  height: 70px;
  resize: none;
  overflow: hidden;
  outline: none;
  border: none;
  border-radius: 3px;
  box-sizing: border-box;
  padding-left: 5px;
  padding-top: 5px;
}

.columns__add-card-button-img-common {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0px;
}

.columns__add-card-button-img {
  display: flex;
  align-items: center;
}

.columns__add-card-button-img img {
  width: 25px;
  margin-left: 8px;
  cursor: pointer;
}

.columns__add-card-button-add {
  width: 150px;
  height: 35px;
  background-color: #5aac44;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.columns__add-card-button-add:hover {
  background-color: rgba(0, 128, 0, 0.822);
  transition: 0.5s;
}

.columns__add-card-button-parameters {
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.columns__add-card-button-parameters:hover {
  background-color: rgba(27, 8, 8, 0.158);
  transition: 0.5s;
  border-radius: 5px;
}

.columns__list {
  background-color: #fff;
}

.columns__add-card-click {
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  position: relative;
}

.hiddenStyle {
  display: none;
}

.borderStyle {
  border: 3px solid red;
}
</style>
