/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SERVER-SIDE RENDERING ENTRY POINT
 * 
 * To run this in a production Node.js environment:
 * 1. Build the React app (App.tsx) to CommonJS/ESM compatible with Node.
 * 2. Run `node server.js`
 */

import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App'; // Note: Requires a build step to handle .tsx imports in Node

const PORT = process.env.PORT || 3000;
const app = express();

// Serve static assets
app.use(express.static('./', { index: false }));

app.get('/*', (req, res) => {
  const templatePath = path.resolve('./index.html');
  
  fs.readFile(templatePath, 'utf8', (err, template) => {
    if (err) {
      console.error('Error reading index.html:', err);
      return res.status(500).send('Server Error');
    }

    // 1. Render the React App to a string
    const appHtml = ReactDOMServer.renderToString(
      React.createElement(App)
    );

    // 2. Inject the rendered HTML into the template placeholder
    // This replaces <!--SSR_OUTPUT--> with the actual App HTML
    const finalHtml = template.replace(
      '<!--SSR_OUTPUT-->',
      appHtml
    );

    // 3. Send the fully rendered page to the client
    res.setHeader('Content-Type', 'text/html');
    res.send(finalHtml);
  });
});

app.listen(PORT, () => {
  console.log(`SSR Server is listening on port ${PORT}`);
});