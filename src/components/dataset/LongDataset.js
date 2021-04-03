import React, { useEffect, useState } from "react";
import "./LongDataset.css";
import * as Styles from "../../shared/styles";
import * as Constants from "../../shared/constants";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";
import Icon from "@material-ui/core/Icon";
import * as FirebaseRef from "../../shared/FirebaseCalls";
import { toast } from "react-toastify";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import * as Utils from "../../shared/utils";
import Loader from "react-loader-spinner";

function LongDataset() {
  const modalClasses = Styles.useModalStyles();
  const classes = Styles.useListStyles();
  const [allStocks, setAllStocks] = useState([]);
  const [open, setOpen] = useState(false);
  const [matchStocks, setMatchStocks] = useState({
    stocks: [],
    loading: false,
  });
  let userInput = "";
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
  const removeStock = async (stock, e) => {
    e.preventDefault();
    await FirebaseRef.collectionRef.doc(stock.id).delete();
    toast.success(Constants.STOCK_DELETE_SUCCESS);
  };

  const addStock = async (stock, e) => {
    if (stock) {
      await FirebaseRef.collectionRef.add(stock);
      toast.success(Constants.STOCK_ADD_SUCCESS);
      getStocksList();
    }
  };

  function renderRow(props) {
    const { index, style } = props;
    return (
      <div className="stock-dataset">
        <ListItem
          button
          style={style}
          key={index}
          onClick={(event) => removeStock(allStocks[index], event)}
        >
          <ListItemText
            primary={
              <React.Fragment>
                <strong>{allStocks[index].stockName}</strong>
                <Icon className="ml-4 remove-icn">remove_circle</Icon>
              </React.Fragment>
            }
          />
        </ListItem>
      </div>
    );
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // load stocks
  const searchStocks = (e) => {
    setMatchStocks((prevState) => {
      return { ...prevState, loading: true };
    });
    e.preventDefault();
    userInput = e.currentTarget.value;
    const url =
      Constants.URL_PATH +
      "?function=" +
      "SYMBOL_SEARCH" +
      "&keywords=" +
      userInput +
      "&apikey=" +
      Constants.API_KEY;
    fetch(url)
      .then(Utils.handleErrors)
      .then((response) => response.json())
      .then((data) => {
        const bestMatches =
          data && data["bestMatches"] ? data["bestMatches"] : null;
        if (bestMatches) {
          // Meta Data key is common for all time series responses

          Object.keys(bestMatches).forEach((i) => {
            matchStocks.stocks.push({
              stockValue: bestMatches[i][Constants.BestMatchStocksKeys[0]],
              stockName: bestMatches[i][Constants.BestMatchStocksKeys[1]],
            });
          });
          setMatchStocks(() => {
            return { loading: false, stocks: matchStocks.stocks };
          });
        } else {
          throw Error(data);
        }
      })
      .catch(function (error) {
        toast.error(error["Error Message"]);
        console.log("error", error["Error Message"]);
      });
  };

  return (
    <div className="main-div">
      <h3 className="text-center">Stocks Watchlist</h3>
      <div className={[classes.root, "stocks-list", "mt-4"].join(" ")}>
        <FixedSizeList
          height={400}
          width={300}
          itemSize={46}
          itemCount={allStocks.length}
        >
          {renderRow}
        </FixedSizeList>
        <ListItem
          button
          key={allStocks.length + 1}
          className="add-stock"
          onClick={handleOpen}
        >
          <ListItemText
            primary={
              <React.Fragment>
                <strong>Add Stock</strong>
                <Icon color="primary" className="ml-4 add-icn">
                  add_circle
                </Icon>
              </React.Fragment>
            }
          />
        </ListItem>
      </div>
      <div>
        {matchStocks.loading ? (
          <Loader
            type="Circles"
            className="spinner"
            color="#82ca9d"
            height={80}
            width={80}
          />
        ) : null}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={modalClasses.modal}
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
              <h3 id="transition-modal-title" className="mb-4">
                Add Stock
              </h3>
              <Autocomplete
                id="stock-search"
                selectOnFocus
                clearOnBlur
                value={userInput}
                handleHomeEndKeys
                freeSolo
                options={matchStocks.stocks}
                onChange={(event, newValue) => {
                  addStock(newValue, event);
                }}
                renderOption={(option) => option.stockName}
                getOptionLabel={(option) => option.stockName}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Stock Name"
                    variant="outlined"
                    value={userInput}
                    onChange={searchStocks}
                  />
                )}
              />
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}

export default LongDataset;
