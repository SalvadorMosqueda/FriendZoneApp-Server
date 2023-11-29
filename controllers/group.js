import { Group } from "../models/index.js";



const createGroup = async (req, res) => {
    const group = new Group(req.body)
    const { user } = req
    group.participants = JSON.parse(req.body.participants)
    group.creator = user
    console.log(group)
    return res.send(req.body)
}

export const groupController = {
createGroup
}