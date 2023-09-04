import config from '@config/index';
import mongoose from 'mongoose';

export class MongoDB {
  async connect(): Promise<mongoose.Connection> {
    mongoose.set('strictQuery', true);
    await mongoose.connect(config.mongodbUrl);

    console.log('MongoDB connected');

    const connection = mongoose.connection;
    return connection;
  }

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
  }
}

export default new MongoDB();
