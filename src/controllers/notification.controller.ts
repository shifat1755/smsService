import { Request, Response } from "express";
import { addToSmsQueue } from "../messageBrokers/smsNotificationProducer";
import { Sms } from "../types/notification.type";
import { addToEmailQueue } from "../messageBrokers/emailNotificationProducer";

export const sendSmsNotification = async (req: Request, res: Response) => {
    try{
        const sms: Sms = {
            text: req.body.text,
            number: req.body.phone,
            lastProviders: [],
        };
        await addToSmsQueue(sms);
        res.status(200).json({
            status: "added to queue and will be deliver shortly"
        });
    }
    catch(err){
        res.status(500).json({
            status: "failed to add to queue"
        });
    }
};

export const sendEmailNotification = async (req: Request, res: Response) => {
    try{
        const email = {
            subject: req.body.subject,
            body: req.body.body,
            recipients: req.body.recipients,
            lastProvider: null,
        };
        await addToEmailQueue(email);
        res.status(200).json({
            status: "added to queue and will be deliver shortly"
        });
    }
    catch(err){
        res.status(500).json({
            status: "failed to add to queue"
        });
    }
};
