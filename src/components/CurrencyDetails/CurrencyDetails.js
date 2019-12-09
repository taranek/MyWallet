import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import useSharedStyles from "styles/sharedStyles";
import withLoading from "hoc/withLoading";
import CurrencyTrendChart from 'components/CurrencyTrendChart/CurrencyTrendChart';
import moment from 'moment';
import ratesTrendPipe from 'pipes/ratesTrendPipe';
import getRatesTrend from 'stateDataProviders/ratesTrendProvider';
export function CurrencyDetails(props) {  
  const targetCurrency = props.targetCurrency;
  const [trendData,setTrendData] = useState(null);
  const sharedStyles = useSharedStyles();
  const CurrencyTrendChartWithLoading = withLoading(CurrencyTrendChart);

  useEffect(()=>{
      var dataForChart;
      const dateEnd = moment.now();
      const dateStart = moment(dateEnd).subtract(365, 'days');
      getRatesTrend(dateStart,dateEnd,targetCurrency)
        .then(rawData =>{
           dataForChart = ratesTrendPipe(rawData.rates);
           setTrendData(dataForChart);
          })
    },[targetCurrency])

  return (
    <Paper className={[sharedStyles.paper, sharedStyles.lightBlue].join(" ")}>
<h2>Currency trend: EUR - {targetCurrency}</h2>
        <CurrencyTrendChartWithLoading loading={trendData===null}  data={trendData} currency={targetCurrency}></CurrencyTrendChartWithLoading>
    </Paper>
  );
}

export function mapStateToProps(state) {
  return {
    targetCurrency: state.targetCurrency,
  };
}
export default connect(mapStateToProps)(CurrencyDetails);

