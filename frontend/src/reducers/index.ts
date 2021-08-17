import { combineReducers } from 'redux';
import { counterExampleReducer } from './counterExample';

export const rootReducer = combineReducers({
  counterExample: counterExampleReducer as any,
});
