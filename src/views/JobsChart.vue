<template>
  <div class="flex-col">
    <div class="flex justify-center">
      <bounce-loader :loading="isLoading" :color="'#68d391'" :size="100" />
    </div>
    <template v-if="!isLoading">
      <div class="flex flex-col sm:flex-row justify-around items-center">
        <!-- <div class="flex flex-col items-center">
          <img
            :src="
              `https://static.coincap.io/assets/icons/BTC@2x.png`
            "
            :alt="asset.name"
            class="w-20 h-20 mr-5"
          />
          <h1 class="text-5xl">
            {{ asset.name }}
            <small class="sm:mr-2 text-gray-500">{{ asset.symbol }}</small>
          </h1>
        </div> -->

        <!-- <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span>#{{ asset.rank }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
              <span>{{ asset.priceUsd | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b>
              <span>{{ min | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más alto</b>
              <span>{{ max | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
              <span>{{ avg | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Variación 24hs</b>
              <span>{{ asset.changePercent24Hr | percent }}</span>
            </li>
          </ul>
        </div> -->

        <!-- <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button
            @click="toggleConverter"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >{{ fromUsd ? `USD a ${asset.symbol}` : `${asset.symbol} a USD` }}</button>

          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
                v-model="convertValue"
                id="convertValue"
                type="number"
                class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                :placeholder="`Valor en ${fromUsd ? 'USD' : asset.symbol}`"
              />
            </label>
          </div>

          <span class="text-xl">{{ convertResult }} {{ fromUsd ? asset.symbol : 'USD' }}</span>
        </div> -->
      </div>

      <line-chart
        class="my-10"
        :colors="['orange']"
        :min="min"
        :max="max"
        :data="jobsData.map(jd => [jd.value, parseFloat(jd.total).toFixed(2)])"
      />

      <!-- <h3 class="text-xl my-10">Mejores Ofertas de Cambio</h3>
      <table>
        <tr v-for="m in markets" :key="`${m.exchangeId}-${m.priceUsd}`" class="border-b">
          <td>
            <b>{{ m.exchangeId }}</b>
          </td>
          <td>{{ m.priceUsd | dollar }}</td>
          <td>{{ m.baseSymbol }} / {{ m.quoteSymbol }}</td>
          <td>
            <px-button
              :is-loading="m.isLoading || false"
              v-if="!m.url"
              @custom-click="getWebSite(m)"
            >
              <slot>Obtener Link</slot>
            </px-button>
            <a v-else class="hover:underline text-green-600" target="_blanck">{{ m.url }}</a>
          </td>
        </tr>
      </table> -->
    </template>
  </div>
</template>

//
<script>
// import api from "@/api";
// //import PxButton from '@/components/PxButton'

// export default {
//   name: "JobsChart",

//   //components: { PxButton },

//   data() {
//     return {
//       isLoading: false,
//       oportunity: []
//     };
//   },

//   created() {
//     this.getData()
//   },

//   methods: {
//     getData() {
//       this.isLoading = true;

//       Promise.all([
//         api.getTestData()
//       ])
//         .then(([oportunity]) => {
//           //console.log(oportunity)
//           this.oportunity = oportunity
//         })
//         .finally(() => (this.isLoading = false));
//     }
//   }
// };
//
</script>

<script>
export default {
  name: "JobsChart",
  data() {
    return {
      isLoading: false,
      jobsData: null
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
      .then(data => (this.jobsData = data.aggregators.compensationrange))
      .finally(() => (this.isLoading = false));
  },

  computed: {
    min() {
      return Math.min(
        ...this.jobsData.map(jd => parseFloat(jd.total).toFixed(2))
      )
    },

    max() {
      return Math.max(
        ...this.jobsData.map(jd => parseFloat(jd.total).toFixed(2))
      )
    }
  }
};
</script>

<style scoped>
td {
  padding: 10px;
  text-align: center;
}
</style>
