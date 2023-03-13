import UserModel from '../schemas/user.schema.js'
import MessageModel from '../schemas/message.schema.js'

const userProfileController = async (req, res) => {
    const { id } = req;


    const existingUserById = await UserModel.findById(id).exec();

    if(!existingUserById) return res.status(401).json({message: 'Usuario no autorizado'})

    const {name, surname, email} = existingUserById;

    const newMessages = await MessageModel.find({addressee: email})

    const messages = await Promise.all (
        newMessages.map( async mess => {

            const newAuthor = await UserModel.findOne({_id: mess.authorName})
   

            return {
                _id: mess._id,
                title: mess.title,
                addressee: mess.addressee,
                authorName: `${newAuthor.name} ${newAuthor.surname}`,
                date: mess.date,
                message: mess.message
            }
        })
    )

    return res.render('profile', {name, surname, messages})
    
}

export default userProfileController