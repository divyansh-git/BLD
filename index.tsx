/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Check if the server (or manual injection) has already rendered HTML into the root.
if (rootElement.hasChildNodes() && rootElement.innerHTML.trim() !== '<!--SSR_OUTPUT-->') {
  console.log('Hydrating server-rendered content...');
  // We use onRecoverableError to handle minor HTML mismatches between our manual shell
  // and the complex animated React app gracefully.
  ReactDOM.hydrateRoot(
    rootElement,
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    {
      onRecoverableError: (error) => {
        console.warn('Hydration recovered:', error);
      }
    }
  );
} else {
  console.log('Client-side rendering...');
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}