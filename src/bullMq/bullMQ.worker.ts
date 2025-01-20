import { Worker, Job } from 'bullmq';
import { getProvider } from '../services/smsProvider.service';
import { failedQueue } from './bullMQ.producer';

const worker = new Worker("taskQueue", async (job: Job) => {
    console.log("got call in worker");
    const sendSMSToProvider = getProvider();//have to use a while loop to check provider.
    const response = await sendSMSToProvider(job.data.text, job.data.phone);
    console.log(await response);
    if (await response.status !== 200) {
        throw new Error(`Failed to send SMS: Status ${response.status}`);
    }
    console.log(`SMS sent to ${job.data.phone}`);
},{connection: {
    host: "localhost",
    port: 6379
}});

worker.on("failed", async (job,err) => {
    console.log("got call in failed");
    if(job && job.attemptsMade>9){
        await failedQueue.add("failedSMS", job.data);
        console.error(
            `Job ${job.id} failed after ${job.attemptsMade} attempts: ${err.message}`
        );
    }
});