import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import router from "./routes";
import swaggerUi from "swagger-ui-express";
import fs from 'fs';

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/', router);

const swaggerFile:string = `${process.cwd()}/swagger/output.json`;
const swaggerData:string = fs.readFileSync(swaggerFile, 'utf8');
const swaggerJSON = JSON.parse(swaggerData);

app.use('/docs/', swaggerUi.serve, swaggerUi.setup(swaggerJSON));

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});

export default app;
