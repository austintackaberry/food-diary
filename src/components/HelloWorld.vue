<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button id="quickstart-sign-in" v-on:click="toggleSignIn" >Sign in with Google</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  methods: {
    toggleSignIn: function() {
      const firebase = this.$store.state.firebase;
      if (!firebase.auth().currentUser) {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/plus.login");
        firebase.auth().signInWithRedirect(provider);
      } else {
        firebase.auth().signOut();
      }
      document.getElementById("quickstart-sign-in").disabled = true;
    }
  },
  mounted() {
    const firebase = this.$store.state.firebase;
    const router = this.$router;
    firebase
      .auth()
      .getRedirectResult()
      .then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
        }
        // The signed-in user info.
        var user = result.user;
        router.push({
          name: "user",
          params: { username: user.email, user, token }
        });
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // [START_EXCLUDE]
        if (errorCode === "auth/account-exists-with-different-credential") {
          alert(
            "You have already signed up with a different auth provider for that email."
          );
          // If you are using multiple auth providers on your app you should handle linking
          // the user's accounts here.
        } else {
          console.error(error);
        }
        // [END_EXCLUDE]
      });
    // [END getidptoken]
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        router.push({
          name: "user",
          params: { username: user.email, user }
        });
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // [START_EXCLUDE]
        document.getElementById("quickstart-sign-in").textContent = "Sign out";
        // [END_EXCLUDE]
      } else {
        // User is signed out.
        // [START_EXCLUDE]
        document.getElementById("quickstart-sign-in").textContent =
          "Sign in with Google";
        // [END_EXCLUDE]
      }
      // [START_EXCLUDE]
      document.getElementById("quickstart-sign-in").disabled = false;
      // [END_EXCLUDE]
    });
    // [END authstatelistener]
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
