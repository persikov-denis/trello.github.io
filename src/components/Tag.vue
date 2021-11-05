<template>
  <div class="tag">
    <div
      @click="addLabel"
      class="tag__main"
      v-bind:style="{ background: label.backgroundColor }"
    >
      <span class="tag__title">{{ label.name }} </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["label"],
  name: "Label",

  data() {
    return {
      hiddenInput: false,
      is: false,
    };
  },

  computed: {
    ...mapGetters(["ALL_CARDS"]),
  },

  methods: {
    addLabel() {
      this.ALL_CARDS.forEach((card) => {
        if (card.isActive === true) {
          if (card.tagIds.length) {
            let isp = false;
            card.tagIds.forEach((id) => {
              if (this.label.id === id) {
                isp = true;
              }
            });

            if (!isp) {
              card.tagIds.push(this.label.id);
            }
          } else {
            card.tagIds.push(this.label.id);
          }
        }
      });
    },
  },
};
</script>

<style>
.tag {
  display: flex;
  align-items: center;
  position: relative;
}

.tag__main {
  margin: 0 8px 8px 8px;
  border-radius: 5px;
  width: 240px;
  height: 30px;
  position: relative;
  cursor: pointer;
}

.tag__title {
  position: absolute;
  top: 7px;
  left: 11px;
  color: #fff;
  font-size: 16px;
}
</style>
