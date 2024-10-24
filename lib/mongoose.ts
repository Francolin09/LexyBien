import mongoose, { ConnectOptions } from 'mongoose';

const connectMongo = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
    } as ConnectOptions);
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }
};



export default connectMongo;