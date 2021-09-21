import logo from './logo.svg';
import './App.css';
import React from 'react';
import NASAIg from './components/NASAIg';
import { Provider } from 'react-redux';
import store from './store/store';
import { getAPODDefault } from './store/NASAIg-actions';
import { setCurrentImages } from './store/NASAIg-actions';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';
const persistor = persistStore(store);
function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NASAIg/>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
