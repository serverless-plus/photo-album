import express, { Application } from 'express';
import compression from 'compression'; // compresses requests
import cors from 'cors';
import { router } from './routes';

interface SlsApplication extends Application {
  binaryTypes?: string[] | null;
  slsInitialize?: () => Promise<void>;
}

// Create Express server
const app = express() as SlsApplication;

// Express configuration
app.set('port', process.env.PORT || 3000);

app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define Routes
app.use(router);

export { app };
