import AsyncStorage from '@react-native-community/async-storage';
import { createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import reducer from './ducks/';

interface MyWindow extends Window {
  // eslint-disable-next-line
  __REDUX_DEVTOOLS_EXTENSION__?: any;
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(
  persistedReducer,
  // eslint-disable-next-line
  (window as MyWindow).__REDUX_DEVTOOLS_EXTENSION__ &&
    // eslint-disable-next-line
    (window as MyWindow).__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

export const persistor = persistStore(store);
