import { Worker, Job } from 'bullmq';
import { getEmailProvider } from '../services/emailProvider.service';

export const worker = new Worker("emailQueue", async (job: Job) => {
    const {id,fn:sendEmailWithProvider} = getEmailProvider(job.data.lastProvider);
    if (sendEmailWithProvider) {
        job.data.lastProvider = id;
        const response = await sendEmailWithProvider(job.data.subject, job.data.body, job.data.recipients);
        if (response.status !== 200) {
            throw new Error(`Failed to send Email: Status ${response.status}`);
        }
    }
},{connection: {
    host: "localhost",
    port: 6379
}});

worker.on("failed", async (job,err) => {
    await job?.updateData(job.data);
});