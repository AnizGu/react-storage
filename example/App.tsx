import React, { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { ReactStorage } from '../src/index';

function App() {
  const [count, setCount] = useState(0)
  const storage = ReactStorage.getInstance();

  useEffect(() => {
    storage.type = 'sessionStorage';
    storage.type = 'localStorage';
    storage.set('hello', '你好');
    console.log('get', storage.get('hello'));
    console.log("getKeys", storage.getKeys());
    storage.remove('test');
    storage.removeExpired();
    storage.removeAll();
  }, []);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
