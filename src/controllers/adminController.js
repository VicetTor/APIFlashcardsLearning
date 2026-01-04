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