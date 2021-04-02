import React, { useState, useEffect } from "react";
import "./StocksTimeSeries.css";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import * as Constants from "../../shared/constants";
import * as Styles from "../../shared/styles";
import * as Utils from "../../shared/utils";
import Loader from "react-loader-spinner";
// can use material ui alert or snackbar instead of 'react-toastify' to show toast messages
import { toast } from "react-toastify";
import LongDataset from "../dataset/LongDataset";
import Button from "@material-ui/core/Button";
import * as FirebaseRef from "../../shared/FirebaseCalls";

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
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

function StocksTimeSeries() {
  // material-UI classes
  const classes = Styles.useStyles();
  const modalClasses = Styles.useModalStyles();
  const [allStocks, setAllStocks] = useState([]);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [customInputs, setCustomInputs] = useState({
    symbol: "",
    series: "TIME_SERIES_MONTHLY", //default value
    loading: false,
  });
  useEffect(() => {
    getStocksList();
  }, []);

  const getStocksList = () => {
    FirebaseRef.collectionRef.onSnapshot((snapshot) => {
      const stockData = [];
      snapshot.forEach((doc) => stockData.push({ ...doc.data(), id: doc.id }));
      setAllStocks(stockData);
    });
  };

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
        if (data && data["Meta Data"]) {
          // Meta Data key is common for all time series responses
          displayStockData(data, seriesVal);
        } else {
          throw Error(data);
        }
      })
      .catch(function (error) {
        toast.error(error["Error Message"]);
        console.log("error", error["Error Message"]);
      });
  };

  // handle stock symbol change from InputLabel and load stocks
  const handleChange = (symbolVal, seriesVal) => {
    if (symbolVal && seriesVal) {
      // reset data
      setData([]);
      setCustomInputs((prevState) => {
        return { ...prevState, loading: true };
      });
      loadStocks(symbolVal, seriesVal);
    } else {
      toast.info(Constants.INCOMPLETE_FORM);
    }
  };

  const handleSymbolChange = (event) => {
    setCustomInputs((prevState) => {
      return { ...prevState, symbol: event.target.value };
    });
    handleChange(event.target.value, customInputs.series);
  };

  const handleTimeSeriesChange = (event) => {
    setCustomInputs((prevState) => {
      return { ...prevState, series: event.target.value };
    });
    handleChange(customInputs.symbol, event.target.value);
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
      setCustomInputs((prevState) => {
        return { ...prevState, loading: false };
      });
    } else {
      toast.info(Constants.INVALID_DATA_ERROR);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="StocksTimeSeries">
      {customInputs.loading ? (
        <Loader
          type="Circles"
          className="spinner"
          color="#82ca9d"
          height={80}
          width={80}
        />
      ) : null}
      <h1 className="mt-4">Stock - Time Series</h1>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className="mt-2 float-right mr-5 custom-hover"
        onClick={handleOpen}
      >
        Manage Stocks
      </Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={[modalClasses.modal, "custom-modal"].join(" ")}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={modalClasses.paper}>
            <LongDataset />
          </div>
        </Fade>
      </Modal>

      <FormControl className={classes.formControlStock}>
        <InputLabel id="stock-select-label">Stock</InputLabel>
        <Select
          labelId="stock-select-label"
          id="stock-select"
          value={customInputs.symbol}
          onChange={handleSymbolChange}
        >
          {allStocks.map((stock, index) => (
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
          value={customInputs.series}
          onChange={handleTimeSeriesChange}
        >
          {Constants.TimeSeries.map((ts, index) => (
            <MenuItem key={index} value={ts.seriesValue}>
              {ts.seriesName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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
