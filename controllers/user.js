import { User } from "../models/index.js";

const getMe = async (req, res) => {

    try {
        const { user } = req

        const response = await User.findById(user).select("-password")

        if (!response) return res.status(404).send({ msg: "Usuario no encontrado" })

        res.status(200).send({ user: response })

    } catch (error) {
        return res.status(500).send({
            error: 'Error en servidor',
            message: error.message
        });
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password")
        if (!users) return res.status(404).send({ msg: "No hay usuarios" })
        res.status(200).send({ users })
    } catch (error) {
        return res.status(500).send({
            error: 'Error en servidor',
            message: error.message
        });
    }
}

export const UserController = {
    getMe,
    getUsers
}