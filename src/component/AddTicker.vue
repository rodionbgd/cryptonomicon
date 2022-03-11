<template>
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
        <div v-if="isOld">
          <div class="text-sm text-red-600">Такой тикер уже добавлен</div>
        </div>
      </div>
    </div>
    <add-button type="button" @click="add" :disabled="disabled" />
  </section>
</template>

<script>
import AddButton from "./AddButton.vue";

export default {
  name: "AddTicker",
  components: {
    AddButton,
  },

  data() {
    return {
      ticker: "",
      disabled: true,
    };
  },

  emits: {
    "add-ticker": (payload) =>
      typeof payload === "object" && payload.name?.length,
  },

  props: {
    oftenTickers: {
      type: Array,
      default() {
        return [];
      },
    },

    tickers: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  computed: {
    autocompleteTicker() {
      return this.oftenTickers
        ?.filter((t) => t.includes(this.ticker?.toUpperCase()))
        .slice(0, 4);
    },

    isOld() {
      return this.tickers?.filter((t) => t.name === this.ticker?.toUpperCase())
        .length;
    },
  },

  watch: {
    ticker() {
      if (!this.ticker || this.isOld) {
        this.disabled = true;
        return;
      }
      this.disabled = false;
    },
  },

  methods: {
    add() {
      if (!this.ticker) {
        this.ticker = "";
        return;
      }
      if (this.isOld) {
        return;
      }
      const uppercaseTicker = this.ticker.toUpperCase();
      const bgColor = this.oftenTickers.includes(uppercaseTicker)
        ? "bg-white"
        : "bg-red-100";
      const ticker = {
        name: uppercaseTicker,
        price: "-",
        intervalId: null,
        bgColor,
      };
      this.$emit("add-ticker", ticker);
      this.ticker = "";
    },
  },
};
</script>
