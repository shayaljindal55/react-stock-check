// import for Material-UI
import { makeStyles } from "@material-ui/core/styles";

// styles for Material-UI
export const useStyles = makeStyles((theme) => ({
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

export const useListStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 400,
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
  },
}));
