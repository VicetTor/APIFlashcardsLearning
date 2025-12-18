import { db } from '../db/database.js'
import { users } from '../db/schema.js'
import { eq } from "drizzle-orm"
import 'dotenv/config'

/**
 * 
 * @param {request} req 
 * @param {response} res 
 * @returns 
 */
export const whoami = async (req, res) => {
    try{
        
        const userId = req.user.userId
        const [user] = await db.select().from(users).where(eq(users.id,userId))

        if(!user){
            return res.status(401).json({error: "Not logged in"})
        }

        res.status(200).json({user: user})

    }catch(error){
        console.error(error)
        res.status(500).send({
            error: 'Fetching current user failed',
        })
    }
}
