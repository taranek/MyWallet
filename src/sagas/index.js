import { ratesSaga } from "./ratesSaga";
import { transactionsSaga } from "./transactionsSaga";

export default function* mainSaga(){
  yield* ratesSaga();
  yield* transactionsSaga();
}