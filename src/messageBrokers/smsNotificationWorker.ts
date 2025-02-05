import { Worker, Job } from 'bullmq';
import { getSmsProvider,totalNumberOfProviders } from '../services/smsProvider.service';

export const worker = new Worker("smsQueue", async (job: Job) => {
    console.log("job data", job.data);
    const providerCount = await totalNumberOfProviders();
    if (job.data.lastProviders.length === providerCount) {
        job.data.lastProviders = [];
        await job.updateData(job.data);
    }
    const { id, fn: sendSmsWithProvider } = await getSmsProvider(job.data.lastProviders);
    job.data.lastProviders.push(id);
    if (sendSmsWithProvider){
        const response = await sendSmsWithProvider(job.data.text, job.data.number);
        console.log("response", response);
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