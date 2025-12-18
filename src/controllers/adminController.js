import { db } from '../db/database.js'
import { users } from '../db/schema.js'

export const getAllUsers = async(req, res) => {
    try {
        const curentUser = req.user.userId
        console.log(curentUser)
        const listUsers = await db.select().from(users)
        
        if(!listUsers){
            return res.status(401).json({error: 'no users'})
        }
        res.status(200).json(listUsers)

    }
    catch(error){
        console.error(error)
        res.status(500).send({
            error: 'getAllUsers failed',
        })
    }
}