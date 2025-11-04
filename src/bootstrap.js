import { globalInit } from './preset';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import LiveEditor from './LiveEditor';

const root = ReactDOM.createRoot(document.getElementById('root'));
const renderRoot = async App => {
  await globalInit();
  root.render(<App />);
};

renderRoot(window.location.pathname === '/editor' ? LiveEditor : App);
