import { jwt } from "../utilis/index.js"

const isAuth = (req, res, next) => {

    if (!req.headers.authorization) return res.status(403).send({ msg: "No tienes autorización" })

    const token = req.headers.authorization.split(" ")[1]

    try {
        const hasExpired = jwt.hasExpiredToken(token)
        if (hasExpired) return res.status(403).send({ msg: "Token ha expirado" })
        const { user_id } = jwt.decoded(token)
        req.user = user_id
        next();

    } catch (error) {
        return res.status(500).send({ msg: "Token no válido" })
    }

}


export const mdAuth = {
    isAuth
}