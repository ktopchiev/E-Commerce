import ReactDOM from 'react-dom/client'
import './App/layout/styles.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import router from './App/router/Routes';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './App/store/configureStore';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
