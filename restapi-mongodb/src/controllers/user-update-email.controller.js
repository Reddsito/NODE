import UserModel from '../schemas/user.schema.js'
import { compare } from 'bcrypt'


const userUpdateEmailController = async (req, res) => {
    const { id } = req;
    const { email, password } = req.body;

    const existingEmail = await UserModel.findOne({email}).exec()

    if(existingEmail) return res.status(401).send('Correo ya utilizado en otra cuenta.')

    const existingUserById = await UserModel.findById(id).exec();

    if(!existingUserById) return res.status(401).send({errors: ['Usuario no autorizado']})

    const isCredentialsCorrect = await compare(password, existingUserById.password)

    if(!isCredentialsCorrect) return res.status(401).send({errors: ['Credenciales incorrectas']})

    existingUserById.email = email;

    await existingUserById.save();

    return res.send({message: ['Email actualizado']})
    
}

export default userUpdateEmailController