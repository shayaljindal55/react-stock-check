import React, { useState, useEffect, useRef } from "react";
import "./StocksTimeSeries.css";
import * as Constants from "../../shared/constants";
import * as Utils from "../../shared/utils";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

function StocksTimeSeries(props) {
  const prevProps = useRef([props.series, props.symbol]);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState({
    loading: false,
  });

  useEffect(() => {
    const querySeries = props.series;
    const querySymbol = props.symbol;
    const prevLateVal = prevProps.current;
    const nextLateVal = [props.series, props.symbol];
    if (typeof nextLateVal !== "undefined" && prevLateVal !== nextLateVal) {
      if (querySymbol && querySeries) {
        setLoader(() => {
          return { loading: true };
        });
        props.setCustomInputs((prevState) => {
          return { ...prevState, symbol: querySymbol, series: querySeries };
        });
        loadStocks(querySymbol, querySeries);
        prevProps.current = [props.series, props.symbol];
      }
    }
  }, [props.symbol, props.series]);
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
      .then(Utils.handleErrors)
      .then((response) => response.json())
      .then((data) => {
        const errMsg = data
          ? data["Error Message"]
            ? data["Error Message"]
            : data["Note"]
            ? data["Note"]
            : null
          : null;
        if (!data) {
          throw Error(errMsg);
        } else if (data && data["Meta Data"]) {
          // Meta Data key is common for all time series responses
          displayStockData(data, seriesVal);
        } else {
          throw Error(errMsg);
        }
      })
      .catch(function (error) {
        const message = error
          ? error
          : "Something went wrong while fetching data. Please try again!";
        toast(message);
        setLoader(() => {
          return { loading: false };
        });
      });
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
    if (seriesAPIParam && result[seriesAPIParam]) {
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
      setLoader(() => {
        return { loading: false };
      });
    } else {
      toast.info(Constants.INVALID_DATA_ERROR);
    }
  };

  return (
    <div className="StocksTimeSeries">
      <ToastContainer />
      {loader.loading ? (
        <Loader
          type="Circles"
          className="spinner"
          color="#82ca9d"
          height={80}
          width={80}
        />
      ) : null}
      <div style={{ width: "100%", height: "400px" }} className="row">
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
            <Line type="monotone" dataKey="open" stroke="#8884d8" />
            <Line type="monotone" dataKey="close" stroke="#82ca9d" />
            <Line type="monotone" dataKey="high" stroke="#ff0000" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
  // }
}

export default StocksTimeSeries;
