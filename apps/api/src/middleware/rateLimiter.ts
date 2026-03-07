import rateLimit from 'express-rate-limit';

/** 15 requests per 15 minutes per IP for form submissions */
export const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later.' },
});
