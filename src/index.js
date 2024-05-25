import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ThemeState from './context/themes/ThemeState';


ReactDOM.render(
  <React.StrictMode>
    <ThemeState>
    <App />
    </ThemeState>
  </React.StrictMode>,
  document.getElementById('root')
);

  