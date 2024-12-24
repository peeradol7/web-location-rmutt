import React from 'react';
import { createRoot } from 'react-dom/client'; // Update import statement
import App from './App';


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
