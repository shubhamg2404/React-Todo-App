import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux'
///import { autoRehydrate, persisteStore } from 'redux-persist'
//import reducer from './reducers/reducer'
import { reducer as listReducer } from './components/Workarea/reducer';
import { reducer as bucketReducer } from './reducers/bucketReducer';
import './index.css';


const autoRehydrate = () => {
  try {
    const retValue = JSON.parse(localStorage.getItem('store'));
    if (retValue) {
      return retValue;
    } else {
      return {}
    }
  } catch (e) {
    console.error("Error");
  }
  return undefined;
}


const rootReducer = combineReducers({
  buckets: listReducer,
  bucketNames: bucketReducer
})

// const store = compose(
//   autoRehydrate()
// )(createStore)(rootReducer)

const store = createStore(rootReducer, autoRehydrate())

store.subscribe(() => {
  const searilizedState = JSON.stringify(store.getState());
  localStorage.setItem('store', searilizedState)

})


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);

