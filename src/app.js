import { createStore } from 'redux';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Home from './pages/home/index';

import store from './store';

const mainRender = () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>,
    document.querySelector('#app')
  )
}

// main render

mainRender()

