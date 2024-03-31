import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import router from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerJSON from "../swagger/output.json";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/', router);

app.use('/docs/', swaggerUi.serve, swaggerUi.setup(swaggerJSON));

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});

export default app;
