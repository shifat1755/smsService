import { Request, Response } from "express";
import { addToQueue } from "../bullMq/bullMQ.producer";
import { Sms } from "../types/notification.type";

export const sendSMS = async (req: Request, res: Response) => {
    const sms: Sms = {
        text: req.body.text,
        number: req.body.phone,
        lastProvider: null,
    };
    addToQueue(sms);
    res.status(200).json({
        status: "added to queue and will be deliver shortly"
    });
};