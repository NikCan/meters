import ReactDOM from 'react-dom/client';
import './assets/index.css';
import { RootStoreProvider } from './context/RootStoreContext';
import { rootStore } from './models';
import { App } from './app/App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RootStoreProvider value={rootStore}>
    <App />
  </RootStoreProvider>
);
