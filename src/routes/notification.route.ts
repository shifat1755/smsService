import { Router } from "express";
import { sendSMS } from "../controllers/notification.controller";

const router=Router();

router.post('/:type',sendSMS);

export default router;