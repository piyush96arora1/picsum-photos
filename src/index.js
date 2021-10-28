import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import  {store, persistor} from './store';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';

const target = document.querySelector('#root');

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <div>
        <App />
      </div>
      </PersistGate>
  </Provider>,
  target,
);
// registerServiceWorker();
