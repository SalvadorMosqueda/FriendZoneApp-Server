import { Chat } from "../models/index.js";

const createChat = async (req, res) => {
    const { participant_one, participant_two } = req.body;

    try {
        const chatExists = await Chat.findOne({ participant_one, participant_two });

        const chatExists2 = await Chat.findOne({ participant_one: participant_two, participant_two: participant_one });

        if (chatExists || chatExists2) return res.status(400).json({ msg: "el chat  ya existe" });


        const chat = new Chat({
            participant_one,
            participant_two
        });

        const chatSaved = await chat.save();
        return res.status(201).send({ msg: "chat creado!", chatSaved });

    } catch (error) {
        res.status(500).send(error);
    }
}

const getMyChats = async (req, res) => {
    res.status(200).send({ msg: "get my chats" });
}
export const chatController = {
    createChat,
    getMyChats
}