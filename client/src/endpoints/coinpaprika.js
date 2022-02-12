export const getTickers = () => `https://api.coinpaprika.com/v1/tickers`;

export const getTicker = (coin_id) =>
  `https://api.coinpaprika.com/v1/tickers/${coin_id}`;

export const getHistoricals = (coin_id) =>
  `https://api.coinpaprika.com/v1/tickers/${coin_id}/historical`;
