import { globalInit } from './preset';
import React from 'react';
import ReactDOM from 'react-dom/client';
import LiveView from './LiveView';
import LiveEditor from './LiveEditor';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
const renderRoot = async Component => {
  const preset = await globalInit();
  root.render(<App preset={preset}><Component /></App>);
};

renderRoot(window.location.pathname === '/editor' ? LiveEditor : LiveView);
