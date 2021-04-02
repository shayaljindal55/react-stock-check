import React, { useState } from "react";
import "./StocksTimeSeries.css";

// import for Material-UI
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
// styles for Material-UI
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function StocksTimeSeries() {
  // material-UI classes
  const classes = useStyles();
  // hook for stock symbol
  const [symbol, setSymbol] = useState("");

  // load stocks
  const loadStock = (symbol) => {
    console.log(symbol);
  };

  // handle stock symbol change from InputLabel
  const handleChange = (event) => {
    setSymbol(event.target.value);
    loadStock(event.target.value);
  };

  return (
    <div className="StocksTimeSeries">
      <h1>Stock - Time Series</h1>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Symbol</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={symbol}
          onChange={handleChange}
        >
          <MenuItem value="AAPL">Apple</MenuItem>
          <MenuItem value="AMZN">Amazon</MenuItem>
          <MenuItem value="NOK">Nokia</MenuItem>
          <MenuItem value="TSLA">Tesla</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default StocksTimeSeries;
