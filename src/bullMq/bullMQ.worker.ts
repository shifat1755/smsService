import { Worker, Job } from 'bullmq';
import { failedQueue } from './bullMQ.producer';
import { getSmsProvider } from '../services/smsProvider.service';
import { getEmailProvider } from '../services/emailProvider.service';

export const worker = new Worker("taskQueue", async (job: Job) => {
    if(job.data.number){
        const sendSmsWithProvider= getSmsProvider(job.data.lastProvider);
        if (sendSmsWithProvider){
            job.data.lastProvider = sendSmsWithProvider.name;
            const response = await sendSmsWithProvider(job.data.text, job.data.number);
            if (await response.status !== 200) {
                throw new Error(`Failed to send SMS: Status ${response.status}`);
        }}
    }
    else {
        const sendEmailWithProvider = getEmailProvider(job.data.lastProvider);
        if (sendEmailWithProvider) {
            job.data.lastProvider = sendEmailWithProvider.name;
            const response = await sendEmailWithProvider(job.data.subject, job.data.body, job.data.recipients);
            if (response.status !== 200) {
                throw new Error(`Failed to send Email: Status ${response.status}`);
            }
        }
    }
},{connection: {
    host: "localhost",
    port: 6379
}});

worker.on("failed", async (job,err) => {
    if(job){
        if(job.attemptsMade>10){
            await failedQueue.add("failedNotification", job.data);
            console.error(
                `Job ${job.id} failed after ${job.attemptsMade} attempts: ${err.message}`
            );
    } else {
        await job.updateData(job.data);
    }

    }
});