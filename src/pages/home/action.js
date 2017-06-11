/**
 * @file
 * @author zdying
 */

// Actions
export function doClick (count) {
  return {
    type: 'ADD',
    payload: count
  };
};
