<template>
  <div class="about">
    <h1>This is {{$route.params.username}}'s page</h1>
    <h2>{{date}}</h2>
    <h3>Entries</h3>
    <form>
      <p>Add an entry:</p>
      <p>
        <label for="entryType">Type of entry:</label>
        <select id="entryType" v-model.number="entryType">
          <option>Consumption</option>
          <option>Feeling</option>
        </select>
      </p>
    <p v-if="entryType === 'Consumption'">
      <label for="foodsConsumed">Foods consumed:</label>
      <input id="foodsConsumed" v-model="foodsConsumed" placeholder="cappuccino, salad, etc.">
    </p>
    <p v-if="entryType === 'Feeling'">
      <label for="feeling">Feeling:</label>
      <input id="feeling" v-model="feeling" placeholder="upset stomach, etc.">
    </p>
    <p v-if="entryType">
      <label for="timestamp">{{entryType === 'Feeling' ? "Time felt:" : "Time consumed:"}}</label>
      <input id="timestamp" v-model="timestamp" placeholder="8:00 AM">
    </p>
    </form>
  </div>
</template>



<script>
import moment from "moment";

export default {
  data() {
    return {
      date: moment().format("dddd, MMMM Do, YYYY"),
      entryType: null,
      foodsConsumed: null,
      timestamp: null
    };
  }
};
</script>
