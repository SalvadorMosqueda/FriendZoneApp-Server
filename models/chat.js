import mongoose from 'mongoose';
import  moongose from 'mongoose';

const chatSchema = moongose.Schema({
    participant_one: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    participant_two: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    message:String,
    name:String,
    timestamp:String,
    received:Boolean
});

export const Chat =mongoose.model('Chat',chatSchema)