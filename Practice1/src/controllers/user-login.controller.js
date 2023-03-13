import UserModel from '../schemas/user.schema.js'
import { compare } from 'bcrypt'
import { SignJWT } from 'jose'



const userLoginController = async (req, res) => {
    const {email, password} = req.body;

    const existingUserByEmail = await UserModel.findOne( {email} ).exec();

    if(!existingUserByEmail) return res.status(401).json({message: 'Wrong credentials, please try again.'});

    const isCredentialsCorrect = compare(password, existingUserByEmail.password)

    if(!isCredentialsCorrect) return res.status(401).send({message: 'Wrong credentials, please try again.'});

    const encoder = new TextEncoder()
    const jwtConstructor = new SignJWT( {id: existingUserByEmail._id});

    const jwt = await jwtConstructor.setProtectedHeader({alg: 'HS256', typ: 'JWT'}).setIssuedAt().setExpirationTime('7d').sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

    res.cookie('authorization', `bearer ${jwt}`, {
        maxAge: 604800000,
        httpOnly: true,
        sameSite: 'strict' // lax en caso de que esté el front y el back en sitios distintos

    })
    return res.send({ redirect: '/user/profile' })
}

export default userLoginController