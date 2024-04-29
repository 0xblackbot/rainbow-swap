import { useEffect } from 'react';
import './App.css';
import { TonConnectButton, useTonWallet } from '@tonconnect/ui-react';

const tg = window.Telegram.WebApp;

function App() {
  const wallet = useTonWallet();
  
  useEffect(() => {

    tg.ready();
  }, []);
  const onClose = () => {
    tg.close();
  }
  console.log(wallet);
  return (
    <div className="App">
      <TonConnectButton />
      {wallet ? <div>Wallet succesfully connected: {wallet.account.address}</div>: null }
      <button onClick={onClose}>Close app</button>
    </div>
  );
}

export default App;
