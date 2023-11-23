import {User}from '../models/index.js'
import bscrypt from 'bcryptjs'
import { jwt } from '../utilis/index.js'

const register=(req,res)=>{
    const {email,password} = req.body
    const user = new User({
        email:email.toLowerCase(),
        password:password
    })
    //hacheamos password
    const salt = bscrypt.genSaltSync(10)
    const hasPassword = bscrypt.hashSync(password,salt)
    user.password =hasPassword

    user.save().then((userStorage)=>{
        res.status(201).send(userStorage);
    }).catch((err)=>{
        res.status(400).send({ msg: "Error al registrar el usuario" });
    })
}

const login = async(req,res)=>{
    try {
        const { email, password } = req.body;
        let emailLower = email.toLowerCase();

        const result=await User.findOne({ email: emailLower });

        if (!result)return res.status(500).send('Usuario no existe');
        
        bscrypt.compare(password,result.password,(bcryptError,check)=>{
            if(bcryptError) return res.status(500).send({msg:"Error del servidor"})
            if(!check) return res.status(400).send('password incorrecta')
            res.status(201).send({
                access: jwt.createAccessToken(result),
                refresh: jwt.createRefreshToken(result)
            });
        })
    } catch (error) {
        console.error('Error en la función login:', error);
        // Enviar una respuesta de error más detallada al cliente
        res.status(500).send({
            error: 'Error en la autenticación',
            message: error.message
        });
    }
}

export const  refreshAccessToken = (req,res)=>{
    const {refresh} = req.body
    console.log(req.body)
    if(!refresh)res.status(400).send({msg:'No se ha encontrado el refresh Token'})
    const hasExpired =   jwt.hasExpiredToken(refresh)
    console.log(hasExpired)
    res.status(200).send('refreshAccessToken')

}
export const  AuthController ={
    register,
    login,
    refreshAccessToken
}
