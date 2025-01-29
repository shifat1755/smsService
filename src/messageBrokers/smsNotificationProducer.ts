import { Email, Sms } from "../types/notification.type";
import { Queue} from 'bullmq';


export const smsQueue = new Queue('smsQueue', {
    connection: {
        host: "localhost",
        port: 6379
    },
    defaultJobOptions: {
        attempts: 1000,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
    },
});


export const addToSmsQueue =async (notification: Sms) => {
    smsQueue.add('smsNotification', notification);
    const jobCount =await smsQueue.getJobCounts();
    console.log('Number of jobs in the smsQueue:', jobCount);
}