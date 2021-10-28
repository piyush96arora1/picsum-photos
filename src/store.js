// import { createStore, applyMiddleware, compose } from "redux";
// // import { routerMiddleware } from "react-router-redux";
// import thunk from "redux-thunk";
// // import { createBrowserHistory } from "history";
// import rootReducer from "./modules";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// // export const history = createBrowserHistory();
// const persistConfig = {
//   key: "root",
//   storage,
// };
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const initialState = {};
// const enhancers = [];
// const middleware = [thunk];

// // if (process.env.NODE_ENV === "development") {
//   const { devToolsExtension } = window;

//   if (typeof devToolsExtension === "function") {
//     enhancers.push(devToolsExtension());
//   }
// // }

// const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

// // const store = createStore(rootReducer, initialState, composedEnhancers);

// export default () => {
//   let store = createStore(persistedReducer, composedEnhancers);
//   let persistor = persistStore(store);
//   return { store, persistor };
// };

// export default store;


import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './modules';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'reducer',
    storage: storage,
 };
const presistedReducer = persistReducer(persistConfig, rootReducer );
const store = createStore(presistedReducer, 
composeWithDevTools(applyMiddleware(thunk)));
const persistor = persistStore(store);
export { persistor, store };