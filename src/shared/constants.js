export const API_KEY = "FGZFH2DQT1IBES7V";
export const URL_PATH = "https://www.alphavantage.co/query";
export const timeSeries = [
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

export const stocks = [
  { stockValue: "AAPL", stockName: "Apple" },
  { stockValue: "AMZN", stockName: "Amazon" },
  { stockValue: "NOK", stockName: "Nokia" },
  { stockValue: "TSLA", stockName: "Tesla" },
];
