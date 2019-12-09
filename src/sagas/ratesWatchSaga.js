import { delay} from "redux-saga/effects";
import { ratesSaga } from "./ratesSaga";

export default function* ratesWatchSaga() {
  let useToaster = false;
  while (true) {
    console.log("Fetching newest rates...");
    yield* ratesSaga(useToaster);
    yield delay(60 * 1000);
  }
}
