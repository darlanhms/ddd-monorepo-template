/* eslint-disable no-use-before-define */
import { createConnection } from 'typeorm';

const connectToDB = async (): Promise<void> => {
    try {
        await createConnection();
        console.log('database connected successfully.');
    } catch (error: any) {
        console.error(`an error occurred: ${error.message}`);
        console.error('retrying connection in 3 seconds...');
        await retryInSeconds();
    }
};

async function retryInSeconds(): Promise<void> {
    return new Promise(resolve => {
        setTimeout(async () => {
            resolve(await connectToDB());
        }, 3000);
    });
}

connectToDB();
