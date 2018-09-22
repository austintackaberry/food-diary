<template>
  <div class="about">
    <h1>Hello, {{user.displayName}}</h1>
    <h2>{{date}}</h2>
    <form @submit.prevent="onSubmit">
      <p>Add an entry:</p>
      <p>
        <label for="entryType">Type of entry:</label>
        <select id="entryType" v-model.number="entryType">
          <option>consumption</option>
          <option>feeling</option>
        </select>
      </p>
      <div v-if="entryType">
        <p v-if="entryType === 'consumption'">
          <label for="consumption">Foods consumed:</label>
          <input id="consumption" v-model="consumption" placeholder="cappuccino, salad, etc.">
        </p>
        <p v-if="entryType === 'feeling'">
          <label for="feeling">Feeling:</label>
          <input id="feeling" v-model="feeling" placeholder="upset stomach, etc.">
        </p>
        <p>
          <label for="timestamp">{{entryType === 'Feeling' ? "Time felt:" : "Time consumed:"}}</label>
          <input id="timestamp" v-model="timestamp" placeholder="8:00 AM">
        </p>
        <p>
          <input type="submit" value="Submit">  
        </p>
      </div>
    </form>
    <h3>Entries</h3>
    <div class="entries" v-for="entry in entries" :key="entry.id">
        <div class="entry">
          <p class="entryType">{{entry.entryType}}</p>
          <p>{{entry.consumption ? "Time consumed: " : "Time felt: "}}<span>{{entry.textTime}}</span></p>
          <p>{{entry.consumption || entry.feeling }}</p>
        </div>
    </div>
  </div>
</template>



<script>
import moment from "moment";

export default {
  data() {
    return {
      date: moment(this.$route.params.date, "YYYYMMDD").format(
        "dddd, MMMM Do, YYYY"
      ),
      entries: [],
      entryType: null,
      consumption: null,
      feeling: null,
      timestamp: moment().format("h:mm A"),
      dataToken: null
    };
  },
  props: {
    user: Object,
    token: String
  },
  methods: {
    onSubmit() {
      const updateState = ref => {
        entry.id = ref.id;
        this.entries.push({ ...entry, textTime: this.timestamp });
        this.entries.sort((a, b) => a.timestamp - b.timestamp);
        this.entryType = null;
        this.feeling = null;
        this.consumption = null;
        this.timestamp = moment().format("h:mm A");
      };

      const entry = {
        entryType: this.entryType,
        timestamp: moment(this.timestamp, "h:mm A").valueOf(),
        date: this.$route.params.date,
        username: this.user.username
      };
      entry[this.entryType] = this[this.entryType];

      var firebase = this.$store.state.firebase;
      var db = firebase.firestore();
      db.collection("entries")
        .add(entry)
        .then(updateState);
    }
  },
  async created() {
    var firebase = this.$store.state.firebase;
    var db = firebase.firestore();
    const newUser = {
      displayName: this.user.displayName,
      email: this.user.email,
      username: this.user.username,
      phoneNumber: this.user.phoneNumber
    };
    await db
      .collection("users")
      .doc(this.user.username)
      .set(newUser, { merge: true });
    const querySnapshot = await db
      .collection("entries")
      .where("username", "==", newUser.username)
      .where("date", "==", this.$route.params.date)
      .get();
    const entries = [];
    querySnapshot.forEach(doc => {
      entries.push(doc.data());
    });
    this.entries = entries
      .map(entry => ({
        ...entry,
        textTime: moment(entry.timestamp).format("h:mm A")
      }))
      .sort((a, b) => a.timestamp - b.timestamp);

    if (!this.token) {
      this.dataToken = await this.user.getIdToken();
    } else {
      this.dataToken = this.token;
    }
  }
};
</script>

<style scoped>
.entries {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.entry {
  border-radius: 3px;
  border: solid black 1px;
  padding: 10px;
  margin: 5px;
}
.entryType {
  font-weight: bold;
}
</style>
