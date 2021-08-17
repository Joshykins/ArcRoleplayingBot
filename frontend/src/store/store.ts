import { Store, createStore, applyMiddleware, Middleware } from 'redux';
import { rootReducer } from '../reducers';
import { Logger, counterMiddlewareExample } from '../middleware/';

export function configureStore(initialState?: any): Store<IStore> {
  const middleware: Middleware<any, any, any>[] = [
    Logger,
    counterMiddlewareExample,
  ];

  const store = createStore(
    rootReducer as any,
    initialState as any,
    applyMiddleware(...middleware)
  ) as Store<IStore>;

  return store;
}
export interface IStore {
  counterExample: {
    name: string;
    count: number;
  };
}
