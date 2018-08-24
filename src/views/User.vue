<template>
  <div class="about">
    <h1>This is {{user.displayName}}'s page</h1>
    <h2>{{date}}</h2>
    <form @submit.prevent="onSubmit">
      <p>Add an entry:</p>
      <p>
        <label for="entryType">Type of entry:</label>
        <select id="entryType" v-model.number="entryType">
          <option>Consumption</option>
          <option>Feeling</option>
        </select>
      </p>
      <div v-if="entryType">
        <p v-if="entryType === 'Consumption'">
          <label for="foodsConsumed">Foods consumed:</label>
          <input id="foodsConsumed" v-model="foodsConsumed" placeholder="cappuccino, salad, etc.">
        </p>
        <p v-if="entryType === 'Feeling'">
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
          <p>{{entry.foodsConsumed ? "Time consumed: " : "Time felt: "}}<span>{{entry.textTime}}</span></p>
          <p>{{entry.foodsConsumed || entry.feeling }}</p>
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
      foodsConsumed: null,
      feeling: null,
      timestamp: moment().format("h:mm A")
    };
  },
  props: {
    user: Object,
    token: String
  },
  methods: {
    onSubmit() {
      this.entries.push({
        entryType: this.entryType,
        foodsConsumed: this.foodsConsumed,
        feeling: this.feeling,
        timestamp: moment(this.timestamp, "h:mm A"),
        textTime: this.timestamp,
        id: Math.floor(Math.random() * 1000000)
      });
      this.entries.sort((a, b) => a.timestamp - b.timestamp);
      this.entryType = null;
      this.feeling = null;
      this.foodsConsumed = null;
      this.timestamp = moment().format("h:mm A");
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
