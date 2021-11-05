<template>
  <div v-if="$store.state.hiddenPopupColumns" class="popup-columns">
    <button @click="closePopup" class="popup-columns__close">
      <img src="../assets/img/remove.png" alt="" />
    </button>
    <div class="popup-columns__title-common">
      <p
        class="popup-columns__title"
        v-for="(column, index) in ALL_COLUMNS"
        :key="index"
        @click="moveCard(column)"
      >
        {{ column.title }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Popup-Columns",

  computed: {
    ...mapGetters(["ALL_COLUMNS", "ALL_CARDS"]),
  },

  methods: {
    moveCard(column) {
      this.ALL_CARDS.forEach((card) => {
        if (card.isActive === true) {
          card.columnId = column.id;
        }
      });
    },

    closePopup() {
      this.$store.state.hiddenPopupColumns = false;
      this.ALL_CARDS.forEach((card) => {
        if (card.isActive === true) {
          card.isActive = false;
        }
      });
    },
  },
};
</script>

<style>
.popup-columns {
  width: 210px;
  background-color: #ebecf0;
  position: absolute;
  left: 250px;
  top: 70px;
  border-radius: 5px;
  z-index: 10;
}

.popup-columns__title {
  margin: 10px;
  cursor: pointer;
}

.popup-columns__title-common {
  margin-top: 27px;
}

.popup-columns__close {
  background: none;
  border: none;
  position: absolute;
  right: 3px;
  top: 7px;
  cursor: pointer;
}

.popup-columns__close img {
  width: 20px;
}
</style>
