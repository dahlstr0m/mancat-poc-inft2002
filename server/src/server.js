// @flow

import app from './app';
import express from 'express';
import path from 'path';

const { poolPromise } = require('./mssql-pool');

// Serve client files
app.use(express.static(path.join(__dirname, '/../../client/public')));

const port = 3000;
app.listen(port, () => {
  console.info(`Server running on ports ${port}`);
});
