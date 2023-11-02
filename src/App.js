import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList/ProductList';
import Admin from './components/Admin/Admin';
import { useTelegram } from './hooks/useTelegram';

const App = () => {
  const { onToggleButton } = useTelegram();

  return (
    <div className="App">
      <BrowserRouter>
        <button onClick={onToggleButton}>Toggle Button</button>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;