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

// sample stocks data for reference only
export const Stocks = [
  { stockValue: "IBM", stockName: "IBM" },
  { stockValue: "TSCO.LON", stockName: "Tesco PLC" },
  { stockValue: "SHOP.TRT", stockName: "Shopify" },
  { stockValue: "GPV.TRV", stockName: "GreenPower Motor Co" },
  { stockValue: "AAPL", stockName: "Apple" },
  { stockValue: "AMZN", stockName: "Amazon" },
  { stockValue: "NOK", stockName: "Nokia" },
  { stockValue: "TSLA", stockName: "Tesla" },
];

export const BestMatchStocksKeys = ["1. symbol", "2. name"];

export const APIKeyNames = [
  "1. open",
  "2. high",
  "3. low",
  "4. close",
  "5. volume",
];
export const INVALID_DATA_ERROR =
  "Invalid Symbol and/or Time Series selected. Please select another value.";
export const INCOMPLETE_FORM =
  "Please select Symbol and Time Series to load Stock Prices.";
export const STOCK_DELETE_SUCCESS = "Stock has been deleted successfully!";
export const STOCK_ADD_SUCCESS = "Stock has been added successfully!";
