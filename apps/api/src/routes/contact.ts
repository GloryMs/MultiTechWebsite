import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { formLimiter } from '../middleware/rateLimiter';
import { sendEmail, contactNotificationHtml } from '../services/emailService';
import pool from '../db/pool';

const router = Router();

const validate = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').optional().trim(),
  body('subject').optional().trim(),
  body('message').trim().notEmpty().withMessage('Message is required'),
  body('locale').optional().isIn(['ar', 'en']),
];

router.post('/', formLimiter, validate, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { name, email, phone, subject, message, locale = 'ar' } = req.body;

  try {
    // Save to database
    await pool.query(
      `INSERT INTO contact_submissions (name, email, phone, subject, message, locale, ip_address)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [name, email, phone, subject, message, locale, req.ip]
    );

    // Send notification email to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'admin@multitech.com.sa',
      subject: `[Multitech] New Contact: ${subject || 'General Inquiry'}`,
      html: contactNotificationHtml({ name, email, phone, subject, message }),
    });

    res.status(201).json({
      message: locale === 'ar'
        ? 'تم إرسال رسالتك بنجاح'
        : 'Your message has been sent successfully',
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ message: 'Failed to submit contact form' });
  }
});

export default router;
