import fetch from "isomorphic-fetch";
import Toaster from "toaster/toaster";
import moment from 'moment'
export default async function getRatesTrend(dateStart,dateEnd,rate,base='EUR'){
  const toaster = new Toaster(`trendFor${rate}Chart`);
  const end = moment(dateEnd).format("YYYY-MM-DD");
  const start = moment(dateStart).format("YYYY-MM-DD");
  const ratesDataUrl = `https://api.exchangeratesapi.io/history?start_at=${start}&end_at=${end}&base=${base}&symbols=${rate}`;
  try{
    toaster.inProgress(`Fetching trends for ${rate}...`);
    const response = await fetch(ratesDataUrl);
    const data = await response.json();    
    toaster.updateSuccess(`Trends for ${rate} fetched succesfully`);
    return data; 
  }catch(err){
    toaster.updateError(`Could not fetch trends for: ${rate} `);
  }
  
  
}