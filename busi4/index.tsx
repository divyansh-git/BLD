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
const hasContent = rootElement.hasChildNodes() && rootElement.innerHTML.trim() !== '<!--SSR_OUTPUT-->';

if (hasContent) {
  console.log('Hydrating server-rendered content...');
  ReactDOM.hydrateRoot(
    rootElement,
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    {
      onRecoverableError: (error) => {
        // Suppress hydration mismatch warnings
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