import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config.js';
import { booksRouter } from './routes/books.route.js';
import { errorHandlerMiddleware } from './middleware/error-handler.js';

const PORT: number = Number(process.env.PORT);
const DB_URI: string = process.env.DB_URI;

const app = express();

app.use(express.json());
app.use('/api/books', booksRouter);
app.use(errorHandlerMiddleware);

async function run() {
  await mongoose.connect(DB_URI);
  await app.listen(PORT, () => {
    console.log(`listening at port ${PORT}...`);
  });
}

run();
