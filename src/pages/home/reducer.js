/**
 * @file
 * @author zdying
 */

const initState = {
  result: 0
};

import * as Actions from './action';

export default function (state = initState , action) {
  switch (action.type) {
    case 'ADD':
      return Object.assign({}, state, {
        result: state.result + (action.payload || 1)
      });
      break;

    default:
      return state;
  }
};
