import React from 'react'
import ReactDOM from 'react-dom/client'
import './App/layout/styles.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import router from './App/router/Routes';
import { RouterProvider } from 'react-router-dom';
import { StoreProvider } from './App/context/StoreContext';
import { Provider } from 'react-redux';
import { store } from './App/store/configureStore';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StoreProvider>
  </React.StrictMode>,
);
