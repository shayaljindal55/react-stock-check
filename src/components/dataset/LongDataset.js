import React from "react";
import "./LongDataset.css";
import * as Styles from "../../shared/styles";
import * as Constants from "../../shared/constants";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from 'react-window';

function LongDataset() {
  const classes = Styles.useListStyles();
  function renderRow(props) {
    const { index, style } = props;
    return (
      <ListItem button style={style} key={index}>
        <ListItemText primary={Constants.Stocks[index].stockName} />
      </ListItem>
    );
  }

  return (
    <div className={classes.root}>
      <FixedSizeList
        height={400}
        width={300}
        itemSize={46}
        itemCount={Constants.Stocks.length}
      >
        {renderRow}
      </FixedSizeList>
    </div>
  );
  // }
}

export default LongDataset;
