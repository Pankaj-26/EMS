
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connection = async () => {
    try {
  
     
        await mongoose.connect(process.env.MONGODB_URL);

        // Log on successful connection
        console.log('Mongoose connected to MongoDB');

        // Listen for connection events
        mongoose.connection.on('open', () => {
            console.log('Mongoose connection is open');
        });

        mongoose.connection.on('error', (err) => {
            console.error('Mongoose connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose disconnected from MongoDB');
        });

    } catch (e) {
        // Log the error if connection fails
        console.error('Error connecting to MongoDB:', e.message);
        process.exit(1); // Exit process if the connection fails
    }
};

export default connection;
