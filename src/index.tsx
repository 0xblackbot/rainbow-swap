import React from 'react';
import ReactDOM from 'react-dom/client';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import App from './App';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl="https://musical-licorice-e034aa.netlify.app/tonconnect-manifest.json">
    <App />
    </TonConnectUIProvider>
  </React.StrictMode>
);
