import { Home } from '@/pages/home/Home';
import { useEffect } from 'react';

export function App() {
  useEffect(() => {
    if (window.navigator.userAgent.indexOf('WebKit') !== -1) {
      // Браузер использует движок WebKit (например, Chrome, Safari)
      document.documentElement.classList.add('webkit');
    } else {
      document.documentElement.classList.add('others_browsers');
    }
  }, []);
  return <Home />;
}
