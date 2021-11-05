<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",

  computed: {
    ...mapGetters(["ALL_USERS"]),
  },

  beforeMount() {
    let currentUserId = +localStorage.getItem("currentUserId");
    this.ALL_USERS.forEach((user) => {
      if (user.id === currentUserId) {
        user.isRegistered = true;
      }
    });
  },
};
</script>
