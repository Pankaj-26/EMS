import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connection=async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to MongoDB');
          });
          
          mongoose.connection.on('error', (err) => {
            console.error('Mongoose connection error:', err);
          });

    }catch(e){
        console.log(e)
    }
}

export default connection;