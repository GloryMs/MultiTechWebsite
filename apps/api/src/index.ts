import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import contactRouter from './routes/contact';
import inquiryRouter from './routes/inquiry';
import healthRouter from './routes/health';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ─── Middleware ───────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));

// ─── Routes ──────────────────────────────────────────
app.use('/api/health', healthRouter);
app.use('/api/contact', contactRouter);
app.use('/api/inquiry', inquiryRouter);

// ─── Error Handler ───────────────────────────────────
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error('Unhandled error:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
);

// ─── Start ───────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Multitech API running on http://localhost:${PORT}`);
});

export default app;
