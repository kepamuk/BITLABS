import axios from "axios";
import {reducerGetQuotes} from "../reducer/reducerQuotes";

export const actionGetQuotes = (arg) => dispatch => {
  axios.post('quotes', {
    "source_currency": "USD",
    "target_currency": "USDC_EVMOS",
    ...arg
  })
    .then(res => {
      dispatch(reducerGetQuotes(res.data))
    })
}
