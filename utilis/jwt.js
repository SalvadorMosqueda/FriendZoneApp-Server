import jsonwebtoken from 'jsonwebtoken'
import {JWT_SECRET_KEY}from '../constants.js'


const createAccessToken = (user) => {
    const expToken  = new Date()
    expToken.setHours(expToken.getHours() + 24)
    const payload = {
        token_type: 'access_token',
        user_id: user._id,
        iat: Math.floor(Date.now() / 1000), // Convert to seconds
        exp: Math.floor(expToken.getTime() / 1000) // Convert to seconds
    }

    return jsonwebtoken.sign(payload, JWT_SECRET_KEY)
}


const createRefreshToken = (user) => {
    const expToken  = new Date()
    expToken.setMonth(expToken.getMonth() + 1)
    const payload = {
        token_type: 'access_token',
        user_id: user._id,
        iat: Math.floor(Date.now() / 1000), // Convert to seconds
        exp: Math.floor(expToken.getTime() / 1000) // Convert to seconds
    }

    return jsonwebtoken.sign(payload, JWT_SECRET_KEY)
}

const decoded = (token) => {
    return jsonwebtoken.decode(token, JWT_SECRET_KEY)
}

const hasExpiredToken = (token) => {
    const { exp } = decoded(token)
    // const currentDate = new Date().getTime()
    const currentDate = Math.floor(new Date().getTime() / 1000); // Convert to seconds
    if(currentDate <= exp) return false
    return true
}   
export const jwt = { 
    createAccessToken,
    createRefreshToken,
    decoded,
    hasExpiredToken
}