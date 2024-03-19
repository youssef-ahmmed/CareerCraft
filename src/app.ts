import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import router from "./routes";


dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'hello' });
});

app.use('/api/v1/', router);

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`)
});

export default app;
