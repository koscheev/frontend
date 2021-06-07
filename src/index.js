import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Navigator from './navigation/'
import reducer from './reducer'
import logo from './foto/logo.png'
import './index.css'
const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <div className="container">
      <Provider store={store}>
        <div className="page-index">
          <img className="size-logo" src={logo} />
          <p className="phone-time">&#128222; Телефон: +375 29 6913560</p>
          <p className="phone-time">&#9203; Режим работы: 9.00 - 18.00</p>
        </div>
        <Navigator />
      </Provider>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);