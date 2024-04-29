import { useEffect, useState } from "react";
import "./App.css";
import { TonConnectButton, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";

const tg = window.Telegram.WebApp;

function App() {
  const [tonAdress, setTonAdress] = useState("");
  const [tonAmount, setTonAmount] = useState("");
  const [tonConnectUI] = useTonConnectUI();

  const wallet = useTonWallet();

  useEffect(() => {
    tg.ready();
  }, []);

  const onClose = () => {
     tg.close();
  };

  const sendTonTransaction = async (event: React.FormEvent) => {
  event.preventDefault();
    const transaction = {
      messages: [
          {
              address: tonAdress,
              amount: tonAmount,
            }
          ],
          validUntil: Math.floor(Date.now() / 1000) + 1 * 60
  }

  tonConnectUI.sendTransaction(transaction)
  }
  
  return (
    <div className="App">
      <TonConnectButton />
      {wallet ? (
        <>
          <form onSubmit={sendTonTransaction}>
          <input placeholder="Input TON amount" type='number' onChange={e => setTonAmount(e.target.value)}></input>
          <input placeholder="Input TON address" type='text' onChange={e => setTonAdress(e.target.value)}></input>
          {tonAdress && tonAmount ? <button type="submit">Send TON</button> : null}
          </form>
        </>
      ) : null}
      <button onClick={onClose}>Close app</button>
    </div>
  );
}

export default App;
