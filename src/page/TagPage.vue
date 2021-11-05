<template>
  <div class="tag-page">
    <div
      class="tag-page__tag"
      v-bind:style="{
        background: label.backgroundColor,
      }"
    >
      <span class="tag-page__title">{{ label.name }}</span>
      <input
        class="tag-page__input"
        type="text"
        v-if="hiddenInput"
        v-model="editName"
        @keyup.enter="editLabelName"
      />
    </div>

    <div class="tag-page__btn">
      <button @click="hiddenInput = !hiddenInput" class="tag-page__btn-edit">
        <img src="../assets/img/edit-2.png" alt="" />
      </button>

      <button @click="removeLabel" class="tag-page__btn-remove">
        <img src="../assets/img/remove-2.png" alt="" />
      </button>

      <button @click="editLabelName" class="tag-page__btn-save">
        <img src="../assets/img/save.png" alt="" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  props: ["label", "indexLabel"],
  name: "Label",

  data() {
    return {
      hiddenInput: false,
      editName: this.label.name,
    };
  },

  computed: {
    ...mapGetters(["ALL_COLUMNS", "ALL_TAGS"]),
  },

  methods: {
    ...mapActions(["DELETE_TAGS"]),

    removeLabel() {
      this.DELETE_TAGS(this.indexLabel);
    },

    editLabelName() {
      this.label.name = this.editName;
      this.hiddenInput = false;
      // localStorage.setItem('editTags', JSON.stringify(this.$store.state.tags))
    },
  },
};
</script>

<style>
.tag-page {
  display: flex;
  align-items: center;
  position: relative;
}

.tag-page__btn {
  display: flex;
  align-items: baseline;
}

.tag-page__btn-remove,
.tag-page__btn-save {
  background: none;
  border: none;
  cursor: pointer;
}

.tag-page__btn-remove img,
.tag-page__btn-save img {
  width: 18px;
}

.tag-page__btn-edit {
  margin-left: 8px;
  margin-bottom: 11px;
  background: none;
  border: none;
  cursor: pointer;
}

.tag-page__btn-edit img {
  width: 18px;
}

.tag-page__tag {
  border-radius: 5px;
  width: 240px;
  height: 34px;
  position: relative;
  margin-bottom: 10px;
  cursor: pointer;
}

.tag-page__input {
  position: absolute;
  left: 0;
  top: 0px;
  height: 32px;
  border: none;
  text-indent: 9px;
  width: 236px;
  border-radius: 5px;
  outline: none;
  font-size: 16px;
}

.tag-page__title {
  position: absolute;
  top: 7px;
  left: 11px;
  color: #fff;
  font-size: 16px;
}
</style>
