import { Worker, Job } from 'bullmq';
import { getSmsProvider } from '../services/smsProvider.service';

export const worker = new Worker("smsQueue", async (job: Job) => {
    const { id, fn: sendSmsWithProvider } = getSmsProvider(job.data.lastProvider);
    if (sendSmsWithProvider){
        job.data.lastProvider = id;
        const response = await sendSmsWithProvider(job.data.text, job.data.number);
        if (await response.status !== 200) {
            throw new Error(`Failed to send SMS: Status ${response.status}`);
    }}
},{connection: {
    host: "localhost",
    port: 6379
}});

worker.on("failed", async (job,err) => {
    await job?.updateData(job.data);

});