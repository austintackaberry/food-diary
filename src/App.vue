<template>
  <div id="app">
    <router-view v-if="this.load"/>
  </div>
</template>

<script>
export default {
  data() {
    return { load: false };
  },
  created() {
    const router = this.$router;
    const firebase = this.$store.state.firebase;
    function getUser() {
      return new Promise(resolve => {
        if (firebase.auth().currentUser) {
          resolve(firebase.auth().currentUser);
        } else {
          const unsubscribe = firebase
            .auth()
            .onAuthStateChanged(function(user) {
              unsubscribe();
              if (user) {
                resolve(user);
              } else {
                resolve(false);
              }
            });
        }
      });
    }
    return getUser().then(user => {
      if (user) {
        user.username = user.email.split("@gmail.com")[0];
        router.push({
          name: "user",
          params: { username: user.username, user }
        });
      }
      this.load = true;
    });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
