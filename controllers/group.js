import { Group } from "../models/index.js";
import { getFilePath } from "../utilis/image.js";



const createGroup = async (req, res) => {
    const group = new Group(req.body)
    const { user } = req
    group.participants = JSON.parse(req.body.participants)
    group.creator = user
    group.participants.push(user._id)
    if (req.files.image) {
        group.image = getFilePath(req.files.image)
    }

    try {
        const response = await group.save()
        if (response) {
            return res.status(201).send({ msg: "Grupo creado", response })
        } else {
            return res.status(400).send({ msg: "No se pudo crear el grupo" })
        }
    } catch (error) {
        return res.status(500).send({ msg: "Error en servidor", error })
    }

}

export const getAll = async (req, res) => {
    const { user } = req
    console.log(user)
    try {
        const groups = await Group.find({ participants: user }).populate('participants').populate('creator')
        return res.status(200).send({ groups })
    } catch (error) {
        return res.status(500).send({ msg: "Error en servidor", error })
    }


}

export const getGroup = async (req, res) => {
    const { id } = req.params
    try {
        const group = await Group.findById(id).populate('participants').populate('creator')
        return res.status(200).send({ group })
    } catch (error) {
        return res.status(500).send({ msg: "Error en servidor", error })
    }
}

export const updateGroup = async (req, res) => {
    const { id } = req.params
    const { name } = req.body

    try {
        const group = await Group.findById(id)
        if (name) group.name = name
        if (req.files?.image) group.image = getFilePath(req.files.image)

        const response = await Group.findByIdAndUpdate(id, group)

        if (response) {
            return res.status(200).send({ image: group.image, name })
        } else {
            return res.status(400).send({ msg: "No se pudo actualizar el grupo" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ msg: "Error en servidor", error })
    }
}

export const exitGroup = async (req, res) => {
    const { id } = req.params
    const { user } = req

    try {
        await Group.findByIdAndUpdate(id, { $pull: { participants: user } })
        return res.status(200).send({ msg: "salida exitosa" })
    } catch (error) {
        return res.status(500).send({ msg: "Error en servidor", error })
    }
   
}

export const addParticipant = async (req, res) => {
    const {users} = req.body
    const {id} = req.params
    try {
        await Group.findByIdAndUpdate(id, {$addToSet: { participants: users } })
        return res.status(200).send({ msg: "agregado con exito" })
    } catch (error) {
        return res.status(500).send({ msg: "Error en servidor", error })
    }
}

export const banParticipant = async (req, res) => {

    const {user,group} = req.body
    try {
        await Group.findByIdAndUpdate(group, {$pull: { participants: user } })
        return res.status(200).send({ msg: "ban exitoso" })
    } catch (error) {
        return res.status(500).send({ msg: "Error en servidor", error })
    }
}

export const groupController = {
    createGroup,
    getAll,
    getGroup,
    updateGroup,
    exitGroup,
    addParticipant,
    banParticipant
}
