import MessageModel from "../schemas/message.schema.js";
import UserModel from "../schemas/user.schema.js";

const deleteMessage = async (req, res) => {
    const {messageId}= req.params

    const { id } = req;

    const existingUserById = await UserModel.findById(id).exec();

    const existingMessageById = await MessageModel.findById(messageId).exec();

    if(!existingUserById) return res.status(401).send({errors: 'unauthorized user'})

    if(!existingMessageById) return res.status(401).send({errors: ['No existe mensaje con ese ID']})

    if(existingUserById.email === existingMessageById.addressee){
        await existingMessageById.delete()
    } else {
        return res.status(401).json({message: 'Not authorization'})
    }


    return res.status(201).json({ redirect: '/user/profile' })
    
}

export default deleteMessage