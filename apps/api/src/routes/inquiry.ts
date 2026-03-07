import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { formLimiter } from '../middleware/rateLimiter';
import pool from '../db/pool';

const router = Router();

const validate = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').optional().trim(),
  body('company').optional().trim(),
  body('service_type').optional().trim(),
  body('message').trim().notEmpty().withMessage('Message is required'),
  body('locale').optional().isIn(['ar', 'en']),
];

router.post('/', formLimiter, validate, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { name, email, phone, company, service_type, message, locale = 'ar' } = req.body;

  try {
    await pool.query(
      `INSERT INTO service_inquiries (name, email, phone, company, service_type, message, locale, ip_address)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [name, email, phone, company, service_type, message, locale, req.ip]
    );

    res.status(201).json({
      message: locale === 'ar'
        ? 'تم إرسال استفسارك بنجاح'
        : 'Your inquiry has been submitted successfully',
    });
  } catch (error) {
    console.error('Inquiry submission error:', error);
    res.status(500).json({ message: 'Failed to submit inquiry' });
  }
});

export default router;
