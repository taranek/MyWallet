import React from "react";
import Grid from "@material-ui/core/Grid";
import TableHeader from "components/TableHeader/TableHeader";
import propTypes from "prop-types";

export default function TransactionListHeader(props) {
  const base = props.base;
  const targetCurrency = props.targetCurrency;
  return (
    <Grid container spacing={1}>
      <Grid item xs={6} md={2}>
        <TableHeader>{`Amount [${base}]`}</TableHeader>
      </Grid>
      <Grid item xs={6} md={2}>
        <TableHeader>{`Amount [${targetCurrency}]`}</TableHeader>
      </Grid>
      <Grid item xs={6} md={6}>
        <TableHeader>Title</TableHeader>
      </Grid>
      <Grid item xs={6} md={2}>
        <TableHeader align="right">Details</TableHeader>
      </Grid>
    </Grid>
  );
}

TransactionListHeader.propTypes = {
  base: propTypes.string,
  targetCurrency: propTypes.string
};
