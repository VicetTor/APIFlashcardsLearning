import { db } from '../db/database.js'
import { users } from '../db/schema.js'
import { eq } from "drizzle-orm"
import 'dotenv/config'

export const getAllUsers = async(req, res) => {
    try {
        const idCurentUser = req.user.userId
        const [user] = await db.select().from(users).where(eq(users.id,idCurentUser))
        console.log("users: " + user.isAdmin)
        if(user.isAdmin == 1){
            const [listUsers] = await db.select().from(users)
        
        if(!listUsers){
            return res.status(401).json({error: 'no users'})
        }
        res.status(200).json(listUsers)
        }
        

    }
    catch(error){
        console.error(error)
        res.status(500).send({
            error: 'getAllUsers failed',
        })
    }
}

/**
 * @param {request} req
 * @param {response} res
 */
export const deleteUser = async(req, res) => {
    const idCurrentUser = req.user.userId
    const { idUserToDelete } = req.params
   
    try{
        const [user] = await db.select().from(users).where(eq(users.id,idCurrentUser))
        if(!user.isAdmin || (idUserToDelete == idCurrentUser)){
            res.status(403).send({error:"Vous n'avez pas le droit de réaliser cette action"})
        }
        else{
            const results = await db.delete(users).where(eq(users.id,idUserToDelete)).returning({id:users.id})
            res.status(200).send({message: 'User deleted', data:results})
        }
    }
    catch(error){
        console.error(error)
        res.status(500).send({
            error: 'deleteUser failed',
        })
    }
}