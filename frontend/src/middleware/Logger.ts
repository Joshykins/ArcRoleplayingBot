import { Middleware } from 'redux';

export const Logger: Middleware = store => next => action => {
  next(action);
  if (process.env.NODE_ENV !== 'production') {
    const { type, payload } = action;
    console.log(`%c[${type}]`, 'color: #6BF178', { payload });
  }
};
