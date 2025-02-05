import { Router } from "express";
import { sendSmsNotification,sendEmailNotification } from "../controllers/notification.controller";
import {z} from 'zod';
import { validateRequest } from "../middlewares/validateRequest";

const router=Router();

const smsSchema = z.object({
    phone: z.string().min(10).max(15),
    text: z.string().min(1)
  });
  
const emailSchema = z.object({
    recipients: z.array(z.string().email()).nonempty(),
    subject: z.string().min(1),
    body: z.string().min(1)
  });

router.post('/sms',validateRequest(smsSchema),sendSmsNotification);
router.post('/email',validateRequest(emailSchema),sendEmailNotification);


export default router;