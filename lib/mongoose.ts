import mongoose from 'mongoose'

let isConnected=false; // Variable to check if mongoose is connected

export const connecctedToDB=async()=>
{
    mongoose.set('strictQuery',true);

    if(!process.env.MONGODB_URL) return console.log("Mongo DB URL Not Found");
    if(isConnected) return console.log('Already Connected To Mongo DB')
    
    try {
        await mongoose.connect(process.env.MONGODB_URL,{
            dbName:'Threads'
        })

        isConnected=true;

        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error)
    }
}