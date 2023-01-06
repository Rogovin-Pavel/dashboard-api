import express from 'express';
import { homeHandler } from './handlers.js';
import { usersRouter } from './users/users.js';
const port = 8000;
const app = express();
app.get('/', homeHandler);
app.use('/users', usersRouter);
app.listen(port, () => {
    console.log(`Сверер запущен на http://localhost:${port}`);
});
