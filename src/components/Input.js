import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50ch",
    },
  },
}));

export default function Input({ item, setItem }) {
  const classes = useStyles();

  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          label="Add Todo"
          variant="outlined"
        />
      </form>
    </div>
  );
}
