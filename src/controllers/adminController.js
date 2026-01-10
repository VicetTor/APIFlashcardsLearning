import { db } from '../db/database.js'
import { users } from '../db/schema.js'
import { eq, desc } from "drizzle-orm"
import 'dotenv/config'

/**
 * @param {request} req
 * @param {response} res
 */
export const getAllUsers = async(req, res) => {
    try {
        const idCurentUser = req.user.userId
        const [user] = await db.select().from(users).where(eq(users.id,idCurentUser))
        if(user.isAdmin){
            let listUsers = await db.select().from(users).orderBy(desc(users.createdAt))
            if(!listUsers){
                return res.status(401).json({error: 'no users'})
            }
            res.status(200).json(listUsers)
        }
        else {
            return res.status(403).json({error: "Access denied: you are not an administrator"})
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
export const getUserById = async(req, res) => {
    const idUser = req.params.id
    try{
        const resultUser = await db.select().from(users).where(eq(users.id, idUser)).orderBy('created_at','desc')
        const currentUser = await db.select().from(users).where(eq(users.id, req.user.userId)).orderBy('created_at','desc')

        if(currentUser[0].isAdmin){
            res.status(200).json(resultUser);
        }
        else{
            res.status(403).send({
                error: 'Access denied: you are not an administrator'
            })
        }

    }
    catch(error){
        res.status(500).send({
            error: 'getUserById failed',
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
