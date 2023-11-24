import { User } from "../models/index.js";
import { getFilePath } from "../utilis/index.js"
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
    const { user } = req
    console.log("user", user)
    try {
        const users = await User.find({ _id: { $ne: user } }).select("-password")
        if (!users) return res.status(404).send({ msg: "No hay usuarios" })
        res.status(200).send({ users })
    } catch (error) {
        return res.status(500).send({
            error: 'Error en servidor',
            message: error.message
        });
    }
}

const getUser = async (req, res) => {
    try {
        const response = await User.findById(req.params.id).select("-password")
        if (!response) return res.status(404).send({ msg: "Usuario no encontrado" })
        res.status(200).send({ user: response })

    } catch (error) {
        return res.status(500).send({
            error: 'Error en servidor',
            message: error.message
        });
    }

}

const updateUser = async (req, res) => {
    const { user } = req
    const userData = req.body

    if (req.files.avatar) {
        const imagePath = req.files.avatar

        let img = getFilePath(imagePath)

        userData.avatar = img

        console.log(userData)
    }

    try {
        const response = await User.findByIdAndUpdate({ _id: user }, userData)
        if (!response) return res.status(404).send({ msg: "Usuario no encontrado" })
        res.status(200).send({ msg: "Usuario actualizado", response })

    } catch (error) {
        return res.status(500).send({
            error: 'Error en servidor',
            message: error.message
        });
    }
}
export const UserController = {
    getMe,
    getUsers,
    getUser,
    updateUser
}