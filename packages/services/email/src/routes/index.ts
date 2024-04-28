import express from "express";
const router = express.Router();
import { getEmails, sendEmail } from '@/controllers'


router.post('/emails/send', sendEmail)
router.get('/emails', getEmails)

export default router;
