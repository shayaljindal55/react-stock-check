import React, { useState } from "react";
import "./StocksTimeSeries.css";

// import for Material-UI
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// styles for Material-UI
const useStyles = makeStyles((theme) => ({
  formControlStock: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  formControlTimeSeries: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function StocksTimeSeries() {
  const API_KEY = "FGZFH2DQT1IBES7V";
  const wrapper = React.createRef();
  const URL_PATH = "https://www.alphavantage.co/query";
  const [data, setData] = useState([]);
  // material-UI classes
  const classes = useStyles();
  // hook for stock symbol
  const [symbol, setSymbol] = useState("");
  const [series, setTimeSeries] = useState("");
  const timeSeries = [
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

  const stocks = [
    { stockValue: "AAPL", stockName: "Apple" },
    { stockValue: "AMZN", stockName: "Amazon" },
    { stockValue: "NOK", stockName: "Nokia" },
    { stockValue: "TSLA", stockName: "Tesla" },
  ];
  // load stocks
  const loadStocks = (symbol, series) => {
    const url =
      URL_PATH +
      "?function=" +
      series +
      "&symbol=" +
      symbol +
      "&apikey=" +
      API_KEY;
    fetch(url)
      .then((response) => response.json())
      .then((data) => displayStockData(data));
  };

  // handle stock symbol change from InputLabel and load stocks
  const handleChange = () => {
    if (symbol && series) {
      // reset data
      setData([]);
      loadStocks(symbol, series);
    } else {
      console.log("invalid form");
    }
  };

  const handleSymbolChange = (event) => {
    setSymbol(event.target.value);
    handleChange(event.target.value);
  };

  const handleTimeSeriesChange = (event) => {
    setTimeSeries([]);
    setTimeSeries(event.target.value);
    handleChange(event.target.value);
  };

  const displayStockData = (result) => {
    // show 10 records at a time
    var countMax = 10;
    var count = 0;
    const selectedSeriesObj = timeSeries.find((x) => x.seriesValue === series);
    const seriesAPIParam = selectedSeriesObj
      ? selectedSeriesObj.apiParam
      : null;
    if (seriesAPIParam) {
      Object.keys(result[seriesAPIParam]).forEach(function (key) {
        // add count and take only countMax
        count++;
        if (count < countMax) {
          // push loaded json data to array with keys: data, open, high, low, close & volume
          data.push({
            date: key,
            open: result[seriesAPIParam][key]["1. open"],
            high: result[seriesAPIParam][key]["2. high"],
            low: result[seriesAPIParam][key]["3. low"],
            close: result[seriesAPIParam][key]["4. close"],
            volume: result[seriesAPIParam][key]["5. volume"],
          });
        }
      });
      setData(data);
    } else {
      console.log("invalid input");
    }
  };

  return (
    <div className="StocksTimeSeries" ref={wrapper}>
      <h1>Stock - Time Series</h1>

      <FormControl className={classes.formControlStock}>
        <InputLabel id="stock-select-label">Symbol</InputLabel>
        <Select
          labelId="stock-select-label"
          id="stock-select"
          value={symbol}
          onChange={handleSymbolChange}
        >
          {/* <MenuItem value="AAPL">Apple</MenuItem>
          <MenuItem value="AMZN">Amazon</MenuItem>
          <MenuItem value="NOK">Nokia</MenuItem>
          <MenuItem value="TSLA">Tesla</MenuItem> */}
          {stocks.map((stock, index) => (
            <MenuItem key={index} value={stock.stockValue}>
              {stock.stockName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className={classes.formControlTimeSeries}>
        <InputLabel id="time-series-select-label">Time Series</InputLabel>
        <Select
          labelId="time-series-select-label"
          id="time-series-select"
          value={series}
          onChange={handleTimeSeriesChange}
        >
          {timeSeries.map((ts, index) => (
            <MenuItem key={index} value={ts.seriesValue}>
              {ts.seriesName}
            </MenuItem>
          ))}
          {/* <MenuItem value="TSLA">Intraday</MenuItem>
          <MenuItem value="Daily">Daily</MenuItem>
          <MenuItem value="Weekly">Weekly</MenuItem>
          <MenuItem value="NOK">Monthly</MenuItem> */}
        </Select>
      </FormControl>
      <div style={{ width: "100%", height: "400px" }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={["dataMin", "dataMax"]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="open"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="close" stroke="#82ca9d" />
            <Line type="monotone" dataKey="high" stroke="#ff0000" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default StocksTimeSeries;
