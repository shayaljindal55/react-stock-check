import React, { useState, useEffect } from "react";
import "./StocksTimeSeries.css";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import * as Constants from "../../shared/constants";
import * as Styles from "../../shared/styles";
// can use material ui alert or snackbar or any other library instead of 'react-toastify' to show toast messages
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LongDataset from "../dataset/LongDataset";
import Button from "@material-ui/core/Button";
import * as FirebaseRef from "../../shared/FirebaseCalls";
import StocksChart from "./StocksChart";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useHistory, useLocation } from "react-router-dom";

function StocksTimeSeries() {
  // material-UI classes
  const classes = Styles.useStyles();
  const modalClasses = Styles.useModalStyles();
  const [allStocks, setAllStocks] = useState([]);
  let query = useQuery();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [customInputs, setCustomInputs] = useState({
    symbol: "",
    series: "TIME_SERIES_MONTHLY", //default value
  });
  useEffect(() => {
    getStocksList();
  }, []);
  const history = useHistory();
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const getStocksList = () => {
    FirebaseRef.collectionRef.onSnapshot((snapshot) => {
      const stockData = [];
      snapshot.forEach((doc) => stockData.push({ ...doc.data(), id: doc.id }));
      setAllStocks(stockData);
    });
  };

  // handle stock symbol change from InputLabel and load stocks
  const handleChange = (symbolVal, seriesVal) => {
    if (symbolVal && seriesVal) {
      // reset data
      setData([]);

      let pathname = `/stocks`;
      let queryParam = new URLSearchParams();
      queryParam.set("symbol", symbolVal);
      queryParam.set("series", seriesVal);
      history.push({
        pathname: pathname,
        search: queryParam.toString(),
      });
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="StocksTimeSeries">
      <ToastContainer />
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
      <StocksChart
        series={query.get("series")}
        symbol={query.get("symbol")}
        setCustomInputs={setCustomInputs}
      />
    </div>
  );
}

export default StocksTimeSeries;
