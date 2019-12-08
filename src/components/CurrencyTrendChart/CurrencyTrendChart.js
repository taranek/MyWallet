import React from "react";
import Grid from "@material-ui/core/Grid";
import amountPipe from "pipes/amountPipe";
import propTypes from "prop-types";
import { connect } from "react-redux";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function CurrencyTrendChart(props) {
  const data = props.data;
  const currency = props.currency;
  return (
    <ResponsiveContainer height={400}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="6 6" />
        <XAxis dataKey="date" />
        <YAxis
          domain={[
            dataMin => amountPipe(dataMin * 0.97),
            dataMax => amountPipe(dataMax * 1.03)
          ]}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey={currency}
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
