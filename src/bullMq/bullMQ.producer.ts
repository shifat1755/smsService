import { Sms } from "../types/notification.type";
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

export const failedQueue = new Queue('failedQueue', {
    connection: {
        host: "localhost",
        port: 6379
    }
});

export const addToQueue =async (sms: Sms) => {
    console.log('got call at addToQueue');
    taskQueue.add('SMS', sms);
    const jobCount =await taskQueue.getJobCounts();
    console.log('Number of jobs in the queue:', jobCount);
}