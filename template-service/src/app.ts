import express from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
import templateRoutes from './routes/template.routes.js';
import { connectDB } from './config/database.js';

const app = express();

// app.use(helmet());
// app.use(cors());
app.use(express.json());

connectDB(); // Connect to MongoDB

app.use('/templates', templateRoutes);

export default app;