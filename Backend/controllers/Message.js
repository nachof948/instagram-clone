import { Message } from '../models/Message.js'
import { Conversation } from '../models/Conversation.js'

export const sendMessage = async (req, res) =>{
    const senderId = req.user.id;
    const { receiverId } = req.params;
    const { message } = req.body;
    try {
        let conversation = await Conversation.findOne({
            participants:{$all:[senderId, receiverId]}
        });

        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId, receiverId]
            })
        };

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        })
        
        if(newMessage) conversation.messages.push(newMessage._id);
        await conversation.save();
        await newMessage.save();

        await Promise.all([conversation.save(), newMessage.save()])

        return res.status(201).json({
            success: true,
            newMessage
        })
    } catch (error) {
        console.log(error)
    }
};

export const getMessage = async (req, res) =>{
    const senderId = req.user.id;
    const { receiverId } = req.params;

    try {
        const conversation = await Conversation.find({
            participants:{$all:[senderId, receiverId]}
        })
        if(!conversation) return res.status(200).json({success:true, messages:[]})
        return res.status(200).json({sucees:true, messages: conversation?.messages})
        
    } catch (error) {
        
    }
}