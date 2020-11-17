// @flow

import express from 'express';
import projectRouter from './routing/project-router';
import posterRouter from './routing/poster-router';
import categoryRouter from './routing/category-router';
import employerRouter from './routing/employer-router';
import authRouter from './routing/auth-router';

/**
 * Express application.
 */
const app: express$Application<> = express();
app.use(express.json());

// Routing
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/posters', posterRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/employers', employerRouter);
app.use('/api/v1/auth', authRouter);

export default app;
