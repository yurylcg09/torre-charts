<template>
  <div id="app">
    <jobs-chart></jobs-chart>
  </div>
</template>

<script>
import JobsChart from "@/views/JobsChart";

export default {
  name: "App",
  components: {
    JobsChart
  }
};
</script>
JobsChart

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
