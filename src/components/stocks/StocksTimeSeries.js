import React, { useState } from "react";
import "./StocksTimeSeries.css";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import * as Constants from "../../shared/constants";
import * as Styles from "../../shared/styles";
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

function StocksTimeSeries() {
  // material-UI classes
  const classes = Styles.useStyles();

  const [data, setData] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [series, setTimeSeries] = useState("");

  // load stocks
  const loadStocks = (symbolVal, seriesVal) => {
    const url =
      Constants.URL_PATH +
      "?function=" +
      seriesVal +
      "&symbol=" +
      symbolVal +
      "&apikey=" +
      Constants.API_KEY;
    fetch(url)
      .then((response) => response.json())
      .then((data) => displayStockData(data, seriesVal));
  };

  // handle stock symbol change from InputLabel and load stocks
  const handleChange = (symbolVal, seriesVal) => {
    if (symbolVal && seriesVal) {
      // reset data
      setData([]);
      loadStocks(symbolVal, seriesVal);
    } else {
      console.log("invalid form");
    }
  };

  const handleSymbolChange = (event) => {
    setSymbol(event.target.value);
    handleChange(event.target.value, series);
  };

  const handleTimeSeriesChange = (event) => {
    setTimeSeries(event.target.value);
    handleChange(symbol, event.target.value);
  };

  const displayStockData = (result, seriesVal) => {
    // show 10 records at a time
    var countMax = 10;
    var count = 0;
    const selectedSeriesObj = Constants.TimeSeries.find(
      (x) => x.seriesValue === seriesVal
    );
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
            open: result[seriesAPIParam][key][Constants.APIKeyNames[0]],
            high: result[seriesAPIParam][key][Constants.APIKeyNames[1]],
            low: result[seriesAPIParam][key][Constants.APIKeyNames[2]],
            close: result[seriesAPIParam][key][Constants.APIKeyNames[3]],
            volume: result[seriesAPIParam][key][Constants.APIKeyNames[4]],
          });
        }
      });
      setData(data);
    } else {
      console.log("invalid input");
    }
  };

  return (
    <div className="StocksTimeSeries">
      <h1>Stock - Time Series</h1>

      <FormControl className={classes.formControlStock}>
        <InputLabel id="stock-select-label">Symbol</InputLabel>
        <Select
          labelId="stock-select-label"
          id="stock-select"
          value={symbol}
          onChange={handleSymbolChange}
        >
          {Constants.Stocks.map((stock, index) => (
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
          {Constants.TimeSeries.map((ts, index) => (
            <MenuItem key={index} value={ts.seriesValue}>
              {ts.seriesName}
            </MenuItem>
          ))}
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
