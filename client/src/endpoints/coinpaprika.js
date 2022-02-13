export const getTickers = () => `https://api.coinpaprika.com/v1/tickers`;

export const getTicker = (coin_id) =>
  `https://api.coinpaprika.com/v1/tickers/${coin_id}`;

export const getHistoricals = (coin_id, start, end, days) =>
  `https://api.coinpaprika.com/v1/tickers/${coin_id}/historical?start=${start}&end=${end}&interval=${days}`;
