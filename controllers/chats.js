import { Chat,ChatMessage } from "../models/index.js";

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
    const {user} = req
    try {
        const chats = await Chat.find({ $or: [{ participant_one: user }, { participant_two: user }] }).populate("participant_one").populate("participant_two");
        
        const arrayChats =[]
        for await (const  chat of chats) {
            const response = await ChatMessage.findOne({chat: chat._id}).sort({createdAt:-1})
            console.log("inf",response)
            arrayChats.push({...chat._doc,last_message:response?.createdAt ||null})
        }
        return res.status(200).send({ msg: "get my chats", arrayChats });
    }catch(error) {
        return res.status(500).send(error);
    }
}

const deleteChat =async (req,res)=>{
    const chat_id =req.params.id

    console.log(chat_id)

    try {
        const chatDeleted = await Chat.findByIdAndDelete(chat_id);
        if(!chatDeleted) return res.status(404).send({msg:"chat no encontrado"});
         return res.status(200).send({msg:'chat eliminado',chatDeleted});
    } catch (error) {
        return res.status(500).send({msg:"error en el servidor",error});
    }

}
export const chatController = {
    createChat,
    getMyChats,
    deleteChat
}