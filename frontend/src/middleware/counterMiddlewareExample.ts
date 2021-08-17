import { Middleware } from 'redux';

export const counterMiddlewareExample: Middleware = store => next => action => {
  next(action);
  if (action.type === 'COUNTER_EXAMPLE_COUNT') {
    if (action.payload === 'add') {
      store.dispatch({ type: 'COUNTER_EXAMPLE_ADD' });
    } else if (action.payload === 'subtract') {
      store.dispatch({ type: 'COUNTER_EXAMPLE_SUBTRACT' });
    }
  }
};
