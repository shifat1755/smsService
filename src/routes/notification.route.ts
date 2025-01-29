import { Router } from "express";
import { sendSmsNotification,sendEmailNotification } from "../controllers/notification.controller";

const router=Router();

router.post('/sms',sendSmsNotification);
router.post('/email',sendEmailNotification);


export default router;