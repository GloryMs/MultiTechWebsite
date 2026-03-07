import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgresql://multitech_user:multitech_secret_2026@localhost:5432/multitech',
});

pool.on('error', (err) => {
  console.error('Unexpected database pool error:', err);
});

export default pool;
