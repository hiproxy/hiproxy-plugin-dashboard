(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('redux'), require('react'), require('react-dom'), require('react-redux')) :
	typeof define === 'function' && define.amd ? define(['redux', 'react', 'react-dom', 'react-redux'], factory) :
	(factory(global.Redux,global.React,global.ReactDOM,global.ReactRedux));
}(this, (function (redux,React$1,reactDom,reactRedux) { 'use strict';

React$1 = 'default' in React$1 ? React$1['default'] : React$1;

/**
 * @file
 * @author zdying
 */

var Home = (function (props) {
  return React.createElement(
    "h1",
    null,
    "hiproxy dashboard"
  );
});

console.log(Home);

var d = document;

// store & controller (redux)

var init = false;

var counter = function counter() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var action = arguments[1];

  switch (action.type) {
    case "INCR":
      return state + 1;
    case "INCR":
      return state - 1;
    default:
      if (init) console.log('action: ' + action.type + ' - no state change');
      init = true;
      return state;
  }
};

var store = redux.createStore(counter);
window.store = store;

// views (react)


// components

var CounterButton = React$1.createClass({
  displayName: 'CounterButton',
  handleClick: function handleClick(event) {
    store.dispatch({ type: 'INCR' });
  },
  render: function render$$1() {
    return React$1.createElement(
      'button',
      { onClick: this.handleClick },
      'Increate'
    );
  }
});

var Counter = React$1.createClass({
  displayName: 'Counter',

  contextTypes: {
    store: React$1.PropTypes.object
  },

  render: function render$$1() {
    return React$1.createElement(
      'div',
      null,
      'Counter:',
      React$1.createElement(
        'h4',
        null,
        this.context.store.getState()
      )
    );
  }
});

var mainRender = function mainRender() {
  reactDom.render(React$1.createElement(
    'div',
    null,
    React$1.createElement(
      'h1',
      null,
      'Hello Rollup+React+Redux!'
    ),
    React$1.createElement(
      reactRedux.Provider,
      { store: store },
      React$1.createElement(Counter, null)
    ),
    React$1.createElement(CounterButton, null)
  ), d.querySelector('.container'));
};

// main render

mainRender();

store.subscribe(function () {
  return mainRender();
});

})));
