import { Worker, Job } from 'bullmq';
import { failedQueue } from './bullMQ.producer';
import { getProvider } from '../services/smsProvider.service';

export const worker = new Worker("taskQueue", async (job: Job) => {
    const sendSmsWithProvider= getProvider(job.data.lastProvider);
    if (sendSmsWithProvider){
        job.data.lastProvider = sendSmsWithProvider.name;
        const response = await sendSmsWithProvider(job.data.text, job.data.number);
        if (await response.status !== 200) {
            throw new Error(`Failed to send SMS: Status ${response.status}`);
    }}
},{connection: {
    host: "localhost",
    port: 6379
}});

worker.on("failed", async (job,err) => {
    if(job){
        if(job.attemptsMade>10){
            await failedQueue.add("failedSMS", job.data);
            console.error(
                `Job ${job.id} failed after ${job.attemptsMade} attempts: ${err.message}`
            );
    } else {
        await job.updateData(job.data);
    }

    }
});