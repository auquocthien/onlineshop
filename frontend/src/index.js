import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import ThemedSuspense from 'components/Shared/ThemeSuspense';

import { store, persistor } from 'store';
import { ContextProvider } from 'Context';
ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<ThemedSuspense />}>
      <React.StrictMode>
        <PersistGate persistor={persistor}>
          <ContextProvider>
            <App />
          </ContextProvider>
        </PersistGate>
      </React.StrictMode>
    </Suspense>
  </Provider>,
  document.getElementById('root')
);
