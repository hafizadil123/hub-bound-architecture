import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import RootReducer from "../reducers/RootReducer";
import RootSaga from "../sagas/RootSaga";
import creatSagaMiddleware from "redux-saga";

const sagaMiddleware = creatSagaMiddleware();

// Middleware: Redux Persist Config
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["loginReducer", "updateBusinessIdReducer"],
  blacklist: [""],
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, RootReducer);

// Redux: Store
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
// Middleware: Redux Persist Persister
let persistor = persistStore(store);
sagaMiddleware.run(RootSaga);

// Exports
export { store, persistor };
