<template>
  <div class="flex">
    <div class="flex justify-center">
      <bounce-loader :loading="isLoading" :color="'#68d391'" :size="100" />
    </div>
    <template v-if="!isLoading">
      <h1 class="text-xl my-10">TORRE DATA ANALYSIS</h1>

      <h3 class="text-xl my-10">Number of Jobs per Skill</h3>
      <line-chart
        class="my-10"
        :colors="['green']"
        :min="Math.min(...this.skill.map(jd => parseFloat(jd.total).toFixed(2)))"
        :max="Math.max(...this.skill.map(jd => parseFloat(jd.total).toFixed(2)))"
        :data="skill.map(jd => [jd.value, parseFloat(jd.total).toFixed(2)])"
      />

      <h3 class="text-xl my-10">Number of Jobs per Compensation Range</h3>
      <line-chart
        class="my-5"
        :colors="['orange']"
        :min="Math.min(...this.compensationRange.map(jd => parseFloat(jd.total).toFixed(2)))"
        :max="Math.max(...this.compensationRange.map(jd => parseFloat(jd.total).toFixed(2)))"
        :data="compensationRange.map(jd => [jd.value, parseFloat(jd.total).toFixed(2)])"
      />

      <h3 class="text-xl my-10">Number of Jobs per Type</h3>
      <line-chart
        class="my-5"
        :colors="['violet']"
        :min="Math.min(...this.type.map(jd => parseFloat(jd.total).toFixed(2)))"
        :max="Math.max(...this.type.map(jd => parseFloat(jd.total).toFixed(2)))"
        :data="type.map(jd => [jd.value, parseFloat(jd.total).toFixed(2)])"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: "JobsChart",
  data() {
    return {
      isLoading: false,
      compensationRange: null,
      skill: null,
      type: null
    };
  },

  created() {
    this.isLoading = true;

    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Vue POST Request Example" })
    };
    fetch(
      "https://search.torre.co/opportunities/_search/?offset=0&size=10&aggregate=true",
      requestOptions
    )
      .then(response => response.json())
      .then(data => (
        this.compensationRange = data.aggregators.compensationrange,
        this.skill = data.aggregators.skill,
        this.type = data.aggregators.type
        ))
      .finally(() => (this.isLoading = false));
  }
};
</script>

<style scoped>
td {
  padding: 10px;
  text-align: center;
}
</style>
