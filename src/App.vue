<template>
  <div class="container mx-auto flex flex-col items-center bg-gray-100 p-4">
    <div class="container">
      <add-ticker
        @add-ticker="add"
        :often-tickers="oftenTickers"
        :tickers="tickers"
      />
      <template v-if="tickers.length">
        <div>
          <button
            class="my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            v-if="page > 1"
            @click="page--"
          >
            back
          </button>
          <button
            class="my-4 mx-2 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            v-if="hasNextPage"
            @click="page++"
          >
            next
          </button>
          <label for="filter" class="block text-sm font-medium text-gray-700"
            >Фильтр</label
          >
          <input
            id="filter"
            v-model="filter"
            type="text"
            class="block pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
            @keydown.enter="add"
          />
        </div>
        <hr class="w-full border-t border-gray-600 my-4" />
        <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div
            v-for="t of paginatedTickers"
            :key="t"
            :class="[
              t.bgColor,
              {
                'border-4': selectedTicker === t,
              },
            ]"
            class="overflow-hidden shadow rounded-lg border-purple-800 border-solid cursor-pointer"
            @click="select(t)"
          >
            <div class="px-4 py-5 sm:p-6 text-center">
              <dt class="text-sm font-medium text-gray-500 truncate">
                {{ t.name }} - USD
              </dt>
              <dd class="mt-1 text-3xl font-semibold text-gray-900">
                {{ formatPrice(t.price) }}
              </dd>
            </div>
            <div class="w-full border-t border-gray-200"></div>
            <button
              class="flex items-center justify-center font-medium w-full bg-gray-100 px-4 py-4 sm:px-6 text-md text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all focus:outline-none"
              @click.stop="remove(t)"
            >
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#718096"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Удалить
            </button>
          </div>
        </dl>
        <hr class="w-full border-t border-gray-600 my-4" />
        <TheGraph
          :graph="graph"
          :selected-ticker="selectedTicker"
          @remove-graph="selectedTicker = null"
          @update-max-elements="updateMaxElements"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { getTickerList, subscribeToTicker, unsubscribeFromTicker } from "./api";
import AddTicker from "./component/AddTicker.vue";
import TheGraph from "./component/TheGraph.vue";

export default {
  components: {
    AddTicker,
    TheGraph,
  },

  data() {
    return {
      oftenTickers: [],
      selectedTicker: null,
      tickers: [],
      graph: [],
      filter: "",
      page: 1,
      maxGraphElements: 1,
    };
  },

  computed: {
    pageStateOptions() {
      return {
        filter: this.filter,
        page: this.page,
      };
    },

    startIndex() {
      return 6 * (this.page - 1);
    },

    endIndex() {
      return 6 * this.page;
    },

    hasNextPage() {
      return this.filteredTickers?.length > this.endIndex;
    },

    filteredTickers() {
      return this.tickers?.filter((t) => {
        return t.name?.includes(this.filter?.toUpperCase());
      });
    },

    paginatedTickers() {
      return this.filteredTickers?.slice(this.startIndex, this.endIndex);
    },
  },

  watch: {
    tickers() {
      localStorage.setItem("cryptonomicon", JSON.stringify(this.tickers));
    },

    paginatedTickers() {
      if (!this.paginatedTickers?.length && this.page > 1) {
        this.page -= 1;
      }
    },

    selectedTicker() {
      this.graph = [];
      this.$nextTick(this.calculateMaxGraphElements);
    },

    filter() {
      this.page = 1;
    },

    pageStateOptions(state) {
      window.history.pushState(
        null,
        "",
        `${window.location.pathname}?filter=${state.filter}&page=${state.page}`
      );
    },
  },

  async created() {
    this.oftenTickers = [...(await getTickerList())];

    const params = Object.fromEntries(
      new URL(window.location).searchParams.entries()
    );
    const VALID_KEYS = ["filter", "page"];
    VALID_KEYS.forEach((key) => {
      if (params[key]) {
        this[key] = params[key];
      }
    });

    const tickers = localStorage.getItem("cryptonomicon");
    if (tickers) {
      this.tickers = JSON.parse(tickers);
      this.tickers?.forEach((ticker) => {
        subscribeToTicker(ticker.name, (price) => {
          this.updateTicker(ticker.name, price);
        });
      });
    }
  },

  methods: {
    add(ticker) {
      if (!ticker) {
        return;
      }
      this.tickers = [...this.tickers, ticker];
      subscribeToTicker(ticker.name, (price) => {
        this.updateTicker(ticker.name, price);
      });
      this.ticker = "";
    },

    formatPrice(price) {
      if (price === "-") {
        return price;
      }
      return price > 1 ? price?.toFixed(2) : price?.toPrecision(3);
    },

    resizeGraph() {
      if (this.graph.length > this.maxGraphElements) {
        this.graph = this.graph.slice(
          this.graph.length - this.maxGraphElements,
          this.graph.length
        );
      }
    },

    updateMaxElements(maxElements) {
      this.maxGraphElements = maxElements;
      this.resizeGraph();
    },

    updateTicker(tickerName, price) {
      this.tickers.find((t) => t.name === tickerName).price = price;
      if (this.selectedTicker?.name === tickerName) {
        this.graph = [...this.graph, price];
        this.resizeGraph();
      }
    },

    remove(t) {
      this.tickers = this.tickers.filter((ticker) => {
        if (ticker === t) {
          clearInterval(ticker.intervalId);
          ticker.intervalId = null;
        }
        return ticker !== t;
      });
      if (t === this.selectedTicker) {
        this.selectedTicker = null;
      }
      unsubscribeFromTicker(t.name);
    },

    select(ticker) {
      this.selectedTicker = ticker;
    },
  },
};
</script>
