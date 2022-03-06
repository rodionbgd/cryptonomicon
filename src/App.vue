<template>
  <div class="container mx-auto flex flex-col items-center bg-gray-100 p-4">
    <div class="container">
      <section>
        <div class="flex">
          <div class="max-w-xs">
            <label for="wallet" class="block text-sm font-medium text-gray-700"
              >Тикер</label
            >
            <div class="mt-1 relative rounded-md shadow-md">
              <input
                id="wallet"
                v-model="ticker"
                type="text"
                name="wallet"
                class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
                placeholder="e.g. DOGE"
                @keydown.enter="add"
              />
            </div>
            <div
              v-if="ticker && autocompleteTicker.length"
              class="flex bg-white shadow-md p-1 rounded-md shadow-md flex-wrap"
            >
              <span
                v-for="t of autocompleteTicker"
                :key="t"
                class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
                @click="
                  ticker = t;
                  add();
                "
              >
                {{ t }}
              </span>
            </div>
            <div v-if="isOld()">
              <div class="text-sm text-red-600">Такой тикер уже добавлен</div>
            </div>
          </div>
        </div>
        <button
          type="button"
          class="my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          @click="add"
        >
          <svg
            class="-ml-0.5 mr-2 h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="#ffffff"
          >
            <path
              d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
            ></path>
          </svg>
          Добавить
        </button>
      </section>
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
            v-for="t of filterTickers()"
            :key="t"
            :class="{ 'border-4': sel === t }"
            class="bg-white overflow-hidden shadow rounded-lg border-purple-800 border-solid cursor-pointer"
            @click="select(t)"
          >
            <div class="px-4 py-5 sm:p-6 text-center">
              <dt class="text-sm font-medium text-gray-500 truncate">
                {{ t.name }} - USD
              </dt>
              <dd class="mt-1 text-3xl font-semibold text-gray-900">
                {{ t.price }}
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
        <section v-if="sel" class="relative">
          <h3 class="text-lg leading-6 font-medium text-gray-900 my-8">
            {{ sel.name }} - USD
          </h3>
          <div class="flex items-end border-gray-600 border-b border-l h-64">
            <div
              v-for="(g, idx) of normalizedGraph()"
              :key="idx"
              :style="{ height: `${g}%` }"
              class="bg-purple-800 border w-10"
            ></div>
          </div>
          <button
            type="button"
            class="absolute top-0 right-0"
            @click="sel = null"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              x="0"
              y="0"
              viewBox="0 0 511.76 511.76"
              xml:space="preserve"
            >
              <g>
                <path
                  d="M436.896,74.869c-99.84-99.819-262.208-99.819-362.048,0c-99.797,99.819-99.797,262.229,0,362.048    c49.92,49.899,115.477,74.837,181.035,74.837s131.093-24.939,181.013-74.837C536.715,337.099,536.715,174.688,436.896,74.869z     M361.461,331.317c8.341,8.341,8.341,21.824,0,30.165c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    l-75.413-75.435l-75.392,75.413c-4.181,4.16-9.643,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    c-8.341-8.341-8.341-21.845,0-30.165l75.392-75.413l-75.413-75.413c-8.341-8.341-8.341-21.845,0-30.165    c8.32-8.341,21.824-8.341,30.165,0l75.413,75.413l75.413-75.413c8.341-8.341,21.824-8.341,30.165,0    c8.341,8.32,8.341,21.824,0,30.165l-75.413,75.413L361.461,331.317z"
                  fill="#718096"
                  data-original="#000000"
                ></path>
              </g>
            </svg>
          </button>
        </section>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oftenTickers: [],
      autocompleteTicker: [],
      filteredTickers: [],
      ticker: null,
      sel: null,
      tickers: [],
      graph: [],
      filter: "",
      page: 1,
      hasNextPage: true,
    };
  },

  computed: {
    autocompleteTicker() {
      return this.oftenTickers
        ?.filter((t) => t.includes(this.ticker?.toUpperCase()))
        .slice(0, 4);
    },
  },

  async created() {
    const tickers = localStorage.getItem("cryptonomicon");
    if (tickers) {
      this.tickers = JSON.parse(tickers);
      this.tickers?.forEach((ticker) => {
        this.updateTicker(ticker);
      });
    }
    const response = await fetch(
      "https://min-api.cryptocompare.com/data/all/coinlist?summary=true"
    );
    const data = await response.json();
    this.oftenTickers = Object.values(data.Data)?.map(
      (ticker) => ticker.Symbol
    );
  },

  watch: {
    filter() {
      this.page = 1;
    },

    filteredTickers() {
      const pages = Math.ceil(this.filteredTickers?.length / 6);
      if (this.page > pages) {
        this.page = pages;
      }
    },
  },

  methods: {
    add() {
      if (this.isOld()) {
        return;
      }
      if (!this.ticker) {
        this.ticker = "";
        return;
      }

      const currentTicker = {
        name: this.ticker.toUpperCase(),
        price: "-",
        intervalId: null,
      };
      this.updateTicker(currentTicker);
      this.tickers.push(currentTicker);
      this.filteredTickers = [...this.tickers];
      localStorage.setItem("cryptonomicon", JSON.stringify(this.tickers));
      this.ticker = "";
    },

    updateTicker(currentTicker) {
      currentTicker.intervalId = setInterval(async () => {
        const response = await fetch(
          `https://min-api.cryptocompare.com/data/price?fsym=${currentTicker.name}&tsyms=USD&api_key=d0690cd38c2b128758385513f18ad8ee5045266d889b6aebc6430bdcff48c177`
        );
        if (response.status !== 200) {
          return;
        }
        const data = await response.json();
        const price = data.USD;
        this.tickers.find((t) => t.name === currentTicker.name).price =
          price > 1 ? price.toFixed(2) : price?.toPrecision(3) ?? "-";
        if (this.sel?.name === currentTicker.name) {
          this.graph.push(price);
        }
      }, 2000);
    },

    remove(t) {
      this.tickers = this.tickers.filter((ticker) => {
        if (ticker === t) {
          clearInterval(ticker.intervalId);
          ticker.intervalId = null;
          this.sel = null;
        }
        return ticker !== t;
      });
      this.filteredTickers = this.filteredTickers?.filter((ticker) => {
        return ticker !== t;
      });
      localStorage.setItem("cryptonomicon", JSON.stringify(this.tickers));
    },

    filterTickers() {
      const start = 6 * (this.page - 1);
      const end = 6 * this.page;
      this.filteredTickers = this.tickers?.filter((t) =>
        t.name?.includes(this.filter?.toUpperCase())
      );
      this.hasNextPage = this.filteredTickers.length > end;
      return this.filteredTickers?.slice(start, end);
    },

    isOld() {
      return this.tickers?.filter(
        (t) => t.name?.toUpperCase() === this.ticker?.toUpperCase()
      ).length;
    },

    normalizedGraph() {
      const maxVal = Math.max(...this.graph);
      let minVal = Math.min(...this.graph);
      if (maxVal === minVal) {
        minVal = 0;
      }
      return this.graph.map((g) => 5 + ((g - minVal) * 95) / (maxVal - minVal));
    },

    select(ticker) {
      this.sel = ticker;
      this.graph = [];
    },
  },
};
</script>
