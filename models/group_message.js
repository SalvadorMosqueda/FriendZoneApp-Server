import mongoose from 'mongoose';

const GroupMessageSchema = mongoose.Schema({
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        required: true,
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    message: String,

    type:{
        type: String,
        enum: ["TEXT", "IMAGE"],
    },
},
{
    timestamps: true,
});

export const GroupMessage = mongoose.model("GroupMessage", GroupMessageSchema);