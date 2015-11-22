import 'babel-core/polyfill';
import $ from 'jquery';
window.jQuery = $; // Assure it's available globally.
require('semantic/dist/semantic.min.js');
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Root, { store } from './Root';

ReactDOM.render(
  <div>
    <Provider store={store}>
      <Root />
    </Provider>
  </div>,
  document.getElementById('app')
);
