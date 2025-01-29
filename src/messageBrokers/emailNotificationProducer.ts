import { Email, Sms } from "../types/notification.type";
import { Queue} from 'bullmq';


export const emailQueue = new Queue('emailQueue', {
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


export const addToEmailQueue =async (notification:Email) => {
    emailQueue.add('emailNotification', notification);
    const jobCount =await emailQueue.getJobCounts();
    console.log('Number of jobs in the emailQueue:', jobCount);
}