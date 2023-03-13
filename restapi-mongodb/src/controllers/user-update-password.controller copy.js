import UserModel from '../schemas/user.schema.js'
import { compare, hash } from 'bcrypt'


const userUpdatePasswordController = async (req, res) => {
    const { id } = req;
    const { password, newPassword } = req.body;

    const existingUserById = await UserModel.findById(id).exec();
    if(!existingUserById) return res.status(401).send({errors: ['Usuario no autorizado']})

    const isCredentialsCorrect = await compare(password, existingUserById.password)
    if(!isCredentialsCorrect) return res.status(401).send({errors: ['Credenciales incorrectas']})

    const hashedPassword = await hash(newPassword, 12);

    existingUserById.password = hashedPassword

    await existingUserById.save();

    return res.send({message: ['Contraseña actualizada']})
    
}

export default userUpdatePasswordController