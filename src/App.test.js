import {render} from "@testing-library/react";
import {Provider} from "react-redux";

import reducer, {reducerGetQuotes} from './redux/reducer/reducerQuotes'
import {store} from "./app/store";
import App from "./App";

test('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual(
    {
      quotes: {}
    }
  )
})

test('should handle a quotes', () => {
  let state = store.getState().quotes;
  expect(state.quotes).toMatchObject({});

  store.dispatch(reducerGetQuotes({
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "source_currency": "USD",
    "target_currency": "USDC_EVMOS",
    "source_amount": "100.0",
    "target_amount": "0.423",
    "fiat_blockchain_fee": "1.13",
    "absolute_internal_fee": "2.83",
    "internal_fee_percent": "2.99",
    "expires_at": "2022-04-25T19:44:43.315Z"
  }));
  const {
    id,
    source_currency,
    target_currency,
    source_amount,
    target_amount,
    fiat_blockchain_fee,
    absolute_internal_fee,
    internal_fee_percent,
    expires_at
  } = store.getState().quotes.quotes;
  expect(id).toBe("3fa85f64-5717-4562-b3fc-2c963f66afa6");
  expect(source_currency).toBe("USD");
  expect(target_currency).toBe("USDC_EVMOS");
  expect(source_amount).toBe("100.0");
  expect(target_amount).toBe("0.423");
  expect(fiat_blockchain_fee).toBe("1.13");
  expect(absolute_internal_fee).toBe("2.83");
  expect(internal_fee_percent).toBe("2.99");
  expect(expires_at).toBe("2022-04-25T19:44:43.315Z");


  store.dispatch(reducerGetQuotes({"source_amount": "100"}));
  state = store.getState().quotes.quotes;
  expect(state.source_amount).toBe("100");
})

test('check App', () => {
  const view = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(view).not.toBeNull();
})
