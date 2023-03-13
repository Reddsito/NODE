import UserModel from '../schemas/user.schema.js'
import { hash } from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';




const userRegisterController = async (req, res) => {
    const {name, surname, email, password} = req.body;
    const { _id }  = { _id: uuidv4() }

    const existingUserById = await UserModel.findById(_id).exec();
    if(existingUserById) return res.status(409).send({errors: ['Ya existe un usuario con esta id']});

    const existingUserByEmail = await UserModel.findOne({email}).exec();
    if(existingUserByEmail) return res.status(409).send({errors: ['Ya existe un usuario con este email']});

    const hashedPassword = await hash(password, 12);

    const user = new UserModel( {
        _id,
        name, 
        surname, 
        email,
        password: hashedPassword
    });

    await user.save();

    return res.status(200).json({redirect: "/congratulation"})

    
}

export default userRegisterController