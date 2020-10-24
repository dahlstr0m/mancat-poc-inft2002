// @flow

import express from 'express';

const app: express$Application<> = express();

app.use(express.json());

//app.use('/api/v1', taskRouter);

export default app;
