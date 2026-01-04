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
            const listUsers = await db.select().from(users).where(eq(users.id, req.params.id)).orderBy(desc(users.createdAt))
        
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
