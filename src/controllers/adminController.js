import { db } from '../db/database.js'
import { users } from '../db/schema.js'
import { eq, desc } from "drizzle-orm"
import 'dotenv/config'

export const getAllUsers = async(req, res) => {
    try {
        const idCurentUser = req.user.userId
        const [user] = await db.select().from(users).where(eq(users.id,idCurentUser))
        if(user.isAdmin){
            const listUsers = await db.select().from(users).orderBy(desc(users.createdAt))
        
        if(!listUsers){
            return res.status(401).json({error: 'no users'})
        }
        res.status(200).json(listUsers)
        }
    }
    catch(error){
        res.status(500).send({
            error: 'getAllUsers failed',
        })
    }
}

export const getAllUsersById = async(req, res) => {
    try {
        const idCurentUser = req.user.userId
        const [user] = await db.select().from(users).where(eq(users.id,idCurentUser))
        if(user.isAdmin){
            const listUsers = await db.select()
            .from(users)
            .where(eq(users.id, req.query.id))
            .orderBy(desc(users.createdAt));
        
        if(!listUsers){
            return res.status(401).json({error: 'no users'})
        }
        res.status(200).json(listUsers)
        }
    }
    catch(error){
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
