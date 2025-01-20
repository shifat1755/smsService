import { Email, Sms } from "../types/notification.type";
import { Queue } from 'bullmq';

export const taskQueue = new Queue('taskQueue', {
    connection: {
        host: "localhost",
        port: 6379
    },
    defaultJobOptions: {
        attempts: 10,
        backoff: {
            type: 'exponential',
            delay: 1000
        }
    }
});

export const failedQueue = new Queue('failedNotification', {
    connection: {
        host: "localhost",
        port: 6379
    }
});

export const addToQueue =async (notification: Sms|Email) => {
    console.log('got call at addToQueue');
    taskQueue.add('notification', notification);
    const jobCount =await taskQueue.getJobCounts();
    console.log('Number of jobs in the queue:', jobCount);
}