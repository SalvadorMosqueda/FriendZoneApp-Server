import jsonwebtoken from 'jsonwebtoken'
import {JWT_SECRET_KEY}from '../constants.js'


const createAccessToken = (user) => {
    const expToken  = new Date()
    expToken.setMinutes(expToken.getHours() + 24)
    const payload = {
        token_type: 'access_token',
        user_id: user._id,
        iat: Date.now(),
        exp: expToken.getTime()
    }

    return jsonwebtoken.sign(payload, JWT_SECRET_KEY)
}


const createRefreshToken = (user) => {
    const expToken  = new Date()
    expToken.getMonth(expToken.getMonth() + 1)
    const payload = {
        token_type: 'access_token',
        user_id: user._id,
        iat: Date.now(),
        exp: expToken.getTime()
    }

    return jsonwebtoken.sign(payload, JWT_SECRET_KEY)
}

const decoded = (token) => {
    return jsonwebtoken.decode(token, JWT_SECRET_KEY)
}
export const jwt = { 
    createAccessToken,
    createRefreshToken,
    decoded
}