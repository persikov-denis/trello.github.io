<template>
  <div v-if="HIDDEN_TAGS" class="tags">
    <div>
      <h4>Метки</h4>
      <button @click="closeTags" class="tags__close">
        <img src="../assets/img/remove.png" alt="remove" />
      </button>
    </div>
    <Tag v-for="(label, index) in ALL_TAGS" :key="index" :label="label" />
  </div>
</template>

<script>
import Tag from "./Tag";
import { mapGetters } from "vuex";
export default {
  name: "Tags",
  computed: {
    ...mapGetters(["ALL_TAGS", "HIDDEN_TAGS", "ALL_COLUMNS", "ALL_CARDS"]),
  },

  components: {
    Tag,
  },

  methods: {
    closeTags() {
      if (this.$store.state.hiddenTags === true) {
        this.$store.state.hiddenTags = false;
      }

      this.ALL_CARDS.forEach((card) => {
        card.isActive = false;
      });
    },
  },
};
</script>

<style>
.tags {
  width: 258px;
  background-color: #ebecf0;
  position: absolute;
  left: 253px;
  border-radius: 5px;
  z-index: 10;
}

.tags h4 {
  margin-bottom: 15px;
  text-align: center;
}

.tags__close {
  position: absolute;
  top: 12px;
  right: 9px;
  background: none;
  border: none;
  cursor: pointer;
}

.tags__close img {
  width: 21px;
}
</style>
