import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import AppStore from './app-store';
import {Provider} from 'mobx-react';

import { useStrict } from 'mobx';

useStrict(true);

const store = new AppStore();
const render = (Component) => ReactDOM.render(
  <Provider store={store}>
    <Component/>
  </Provider>, document.getElementById('root'));

render(App);
