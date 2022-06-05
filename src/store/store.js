import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from "./slices/userSlice"
import companyReducer from './slices/activeCompSlice'
import { combineReducers } from 'redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const rootReducer = combineReducers({
  user: userReducer,
  company: companyReducer
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  // blacklist: ['user'], //blacklisting a store attribute name, will not persist that store attribute.
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  // middleware option needs to be provided for avoiding the error. ref: https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

// const store = configureStore({
//   reducer: createReducer(),
//   preloadedState: initializeState,
//   middleware: getDefaultMiddleware => getDefaultMiddleware().concat(createCustomMiddleWare())
// })

export const persistor = persistStore(store);
export default store;