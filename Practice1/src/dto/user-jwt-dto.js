import { jwtVerify } from "jose"

const userJWTDTO = async (req, res, next) => {
    const {authorization} = req.cookies;

    if(!authorization) return res.status(401).send('Usuario no autorizado1');

    const jwt = authorization.split(' ')[1]

    if(!jwt) return res.status(401).send('Usuario no autorizado2');

    try {   
        const encoder = new TextEncoder();
        const { payload } = await jwtVerify(jwt, encoder.encode(process.env.JWT_PRIVATE_KEY))

        req.id = payload.id


        next();

    }catch(error) {
        res.status(401).send('Usuario no autorizado3');
    }

}

export default userJWTDTO