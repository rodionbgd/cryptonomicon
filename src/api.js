const API_KEY =
  "d0690cd38c2b128758385513f18ad8ee5045266d889b6aebc6430bdcff48c177";

const tickerHandlers = new Map();

const AGGREGATE_INDEX = "5";
const socket = new WebSocket(
  `wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`
);

socket.addEventListener("message", (e) => {
  const {
    TYPE: type,
    FROMSYMBOL: currency,
    PRICE: newPrice,
  } = JSON.parse(e.data);
  if (type !== AGGREGATE_INDEX || newPrice === undefined) {
    return;
  }
  const handlers = tickerHandlers.get(currency) ?? [];
  handlers?.forEach((fn) => fn(newPrice));
});

const sendToWS = (message) => {
  const stringifiedMessage = JSON.stringify(message);
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(stringifiedMessage);
  }
  socket.addEventListener(
    "open",
    () => {
      socket.send(stringifiedMessage);
    },
    { once: true }
  );
};

const subscribeToTickerOnWS = (ticker) => {
  const message = {
    action: "SubAdd",
    subs: [`5~CCCAGG~${ticker}~USD`],
  };
  sendToWS(message);
};

const unsubscribeFromTickerOnWS = (ticker) => {
  const message = {
    action: "SubRemove",
    subs: [`5~CCCAGG~${ticker}~USD`],
  };
  sendToWS(message);
};

export const subscribeToTicker = (ticker, cb) => {
  const subscribers = tickerHandlers.get(ticker) || [];
  tickerHandlers.set(ticker, [...subscribers, cb]);
  subscribeToTickerOnWS(ticker);
};

export const unsubscribeFromTicker = (ticker) => {
  tickerHandlers.delete(ticker);
  unsubscribeFromTickerOnWS(ticker);
};
