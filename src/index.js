import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import App from "./App";
import bookNowReducer from "./Reducer/reducer";
import "./index.css";
import {
  watchBooking,
  watchPostTodayTime,
  watchUpdateGame,
} from "./sagas/index";
import * as serviceWorker from "./serviceWorker";

const sagaMiddlewhere = createSagaMiddleware();
const store = createStore(bookNowReducer, applyMiddleware(sagaMiddlewhere));

sagaMiddlewhere.run(watchBooking);
sagaMiddlewhere.run(watchUpdateGame);
sagaMiddlewhere.run(watchPostTodayTime);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
