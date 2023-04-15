import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.scss';
import store from '@components/Chat/redux';

const container = document.getElementById('root') as HTMLElement;
const app = (
  <Provider store={store}>
    <App />
  </Provider>
);
createRoot(container).render(app);
