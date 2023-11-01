import { useEffect } from 'react';
import './App.css';

const tg = window.Telegram.WebApp;


function App() {

  useEffect( () => {
    tg.ready();
  }, [])

  const onClose = () => {
    tg.close()
  }

  return (
    <div className="App">
      <button onClick={onClose}>Закрыть</button>
      <span className={'username'}>
        {tg.initDataUnsafe?.user?.username}
      </span>
    </div>
  );
}

export default App;
