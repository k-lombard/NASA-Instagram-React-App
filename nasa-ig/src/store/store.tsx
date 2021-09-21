import { initialIGState, NASAIgReducer } from "./NASAIg-reducers";
import { combineReducers, applyMiddleware, createStore, compose } from 'redux'
import { createStoreHook } from "react-redux";
import { persistStore, persistReducer } from 'redux-persist'
import createSagaMiddleware from "../../node_modules/redux-saga"
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import { PersistPartial } from "redux-persist/lib/persistReducer";

export const initialState = {
    NASAIg: initialIGState
}


export type RootState = ReturnType<typeof rootReducer>
const middleware = createSagaMiddleware()

const rootReducer = combineReducers({
    NASAIg: NASAIgReducer
})

const config = {
    key: 'root',
    storage: storage,
};
const persisted = persistReducer<RootState, any>(config, rootReducer);
const store = createStore(persisted, applyMiddleware(thunk, middleware));

export default store
  


// export default createStore(
//     rootReducer,
//     initialState,
//     applyMiddleware(thunk, middleware)
// )
