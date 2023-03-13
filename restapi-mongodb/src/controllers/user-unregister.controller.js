import UserModel from '../schemas/user.schema.js'
import { compare } from 'bcrypt'


const userUnregisterController = async (req, res) => {
    const { id } = req;
    const { password } = req.body;


    const existingUserById = await UserModel.findById(id).exec();

    if(!existingUserById) return res.status(401).send({errors: ['Usuario no autorizado']})

    const isCredentialsCorrect = await compare(password, existingUserById.password)
    if(!isCredentialsCorrect) return res.status(401).send({errors: ['Credenciales incorrectas']});

    await existingUserById.delete()

    return res.send({message: ['Usuario eliminado']})
    
}

export default userUnregisterController