import mongoose  from "mongoose";

const ChatMeessageSchema = mongoose.Schema(
    {
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat",
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
    }
);

export const ChatMessage = mongoose.model("ChatMessage", ChatMeessageSchema);

