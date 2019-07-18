import React from 'react';
import { Provider } from 'react-redux';
import Items from './component/cart/items';
import store from './store';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div>
        <h1>SHOPING BAG</h1>
        <Items />
      </div>
    </Provider>
  );
}

export default App;
