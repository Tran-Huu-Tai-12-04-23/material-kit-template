import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './redux/store';

import App from './app';



// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <Provider store={store}>
      <BrowserRouter>
        <Suspense>
          <App />
          <ToastContainer style={{ zIndex: 100000000 }} theme="light" />
        </Suspense>
      </BrowserRouter>
    </Provider>
  </HelmetProvider>
);
