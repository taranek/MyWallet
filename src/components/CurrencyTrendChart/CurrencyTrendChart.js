import React from "react";
import useSharedStyles from 'styles/sharedStyles';
import amountPipe from "pipes/amountPipe";
import Paper from '@material-ui/core/Paper';
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
  const sharedStyles = useSharedStyles();
  const currency = props.currency;
  return (
    <Paper className={[sharedStyles.paper].join(" ")}>
    <h3>Last year</h3>
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
          stroke="#1c249a"
          fill="#3f51b5"
        />
      </AreaChart>
    </ResponsiveContainer>
    </Paper>
  );
}
