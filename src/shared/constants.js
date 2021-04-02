export const API_KEY = "FGZFH2DQT1IBES7V";
export const URL_PATH = "https://www.alphavantage.co/query";
export const TimeSeries = [
  {
    seriesValue: "TIME_SERIES_INTRADAY&interval=5min", // defaulted to 5 minutes
    seriesName: "Intraday",
    apiParam: "Time Series (5min)",
  },
  {
    seriesValue: "TIME_SERIES_DAILY",
    seriesName: "Daily",
    apiParam: "Time Series (Daily)",
  },
  {
    seriesValue: "TIME_SERIES_WEEKLY",
    seriesName: "Weekly",
    apiParam: "Weekly Time Series",
  },
  {
    seriesValue: "TIME_SERIES_MONTHLY",
    seriesName: "Monthly",
    apiParam: "Monthly Time Series",
  },
];

export const Stocks = [
  { stockValue: "AAPL", stockName: "Apple" },
  { stockValue: "AMZN", stockName: "Amazon" },
  { stockValue: "NOK", stockName: "Nokia" },
  { stockValue: "TSLA", stockName: "Tesla" },
];

export const APIKeyNames = [
  "1. open",
  "2. high",
  "3. low",
  "4. close",
  "5. volume",
];
