import moment from 'moment';
export default function ratesTrendPipe(dataFromApi){
  let ratesTrendHistory = [];
  for(var key in dataFromApi) {
    var value = dataFromApi[key];
    value = {
      ...value,
      date:key,
    }
    ratesTrendHistory.push(value);
  }
  const sorted = sortByDate(ratesTrendHistory);
  return sorted;
}
function sortByDate(data){
  const sorted =  data.sort((a,b)=>{
  return (moment(a.date).isAfter(b.date)) ? 1:-1;
})
  return sorted;
};