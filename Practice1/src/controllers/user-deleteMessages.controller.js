import MessageModel from "../schemas/message.schema.js";
import UserModel from "../schemas/user.schema.js";

const deleteMessages = async (req, res) => {
    const  data = req.body;
    const { id } = req;
    
    const existingUserById = await UserModel.findById(id).exec();

    if(!existingUserById) return res.status(401).send({errors: 'unauthorized user'})

    await MessageModel.deleteMany({
        _id: {
            $in: data.ids
        }
    })

    return res.status(201).json({
        message: 'todo bien'
    });
    
}

export default deleteMessages