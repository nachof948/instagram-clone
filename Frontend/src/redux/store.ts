import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

import storage from "redux-persist/lib/storage";
import postSlice from "./postSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({auth:authSlice, posts: postSlice})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };

//Llama al método purge() del persistor
/* persistor.purge().then(() => {
  console.log('Estado persistente restablecido');
}).catch((error) => {
  console.error('Error al restablecer el estado persistente:', error);
});   */