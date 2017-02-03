import { createStore } from 'redux'
import todoApp from './reducers'

const logger = store => next => {
  if(!console.group) {
    return next;
  }

  return action => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = next(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
}

const promise = store => next => action => {
  if(typeof action.then === 'function') {
    return action.then(next);
  }
  return next(action);
}

const applyMiddlewares = (store, middlewares) => {
  let dispatch = store.dispatch;
  middlewares.slice().reverse().forEach((middleware) => {
    dispatch = middleware(store)(dispatch);
  });

  store.dispatch = dispatch;
}

const configureStore = () => {
  const store = createStore(todoApp);
  const middlewares = [promise];

  if(process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }  
  applyMiddlewares(store, middlewares);

  return store;
}

export default configureStore;
