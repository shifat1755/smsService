import { Request, Response } from "express";
import { addToQueue } from "../bullMq/bullMQ.producer";
import { Sms } from "../types/notification.type";

export const sendNotification = async (req: Request, res: Response) => {
    const type = req.params.type;
    if (type === "sms") {
        const sms: Sms = {
            text: req.body.text,
            number: req.body.phone,
            lastProvider: null,
        };
        addToQueue(sms);
    }
    else if (type === "email") {
        const email = {
            subject: req.body.subject,
            body: req.body.body,
            recipients: req.body.recipients,
            lastProvider: null,
        };
        addToQueue(email);
    }
    
    res.status(200).json({
        status: "added to queue and will be deliver shortly"
    });
};