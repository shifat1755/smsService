import { Router } from "express";
import { sendSmsNotification,sendEmailNotification } from "../controllers/notification.controller";
import {z} from 'zod';
import { validateRequest } from "../middlewares/validateRequest";

const router=Router();

const smsSchema = z.object({
    phoneNumber: z.string().min(10).max(15),
    message: z.string().min(1)
  });
  
const emailSchema = z.object({
    email: z.array(z.string().email()).nonempty(),
    subject: z.string().min(1),
    body: z.string().min(1)
  });

router.post('/sms',validateRequest(smsSchema),sendSmsNotification);
router.post('/email',validateRequest(emailSchema),sendEmailNotification);


export default router;