import { db } from '../db/database.js'
import { users } from '../db/schema.js'
import { eq } from "drizzle-orm"
import bcrypt from 'bcrypt'
import jwt  from 'jsonwebtoken'
import 'dotenv/config' 

/**
 * 
 * @param {request} req 
 * @param {response} res 
 * @returns 
 */
export const register = async (req, res) =>{
    try{

        const { mail, firstName, lastName, password, isAdmin } = req.body
        const hashedPassword = await bcrypt.hash(password, 12)
  
        const [newUser] = await db.insert(users).values({ 
            mail: mail, 
            firstName: firstName, 
            lastName: lastName, 
            password: hashedPassword,
            isAdmin: isAdmin
        }).returning({id:users.id, mail:users.mail, firstName:users.firstName, lastName:users.lastName, isAdmin:users.isAdmin})
        
        const token = jwt.sign({id: newUser.id}, process.env.JWT_SECRET, {expiresIn: '24h'})
        res.status(201).send({message: 'User created', userData:newUser, token})

    }catch(error){
        console.error(error)
        res.status(500).send({
            error: 'Register failed',
        })
    }
}

/**
 * 
 * @param {request} req 
 * @param {response} res 
 * @returns 
 */
export const login = async (req, res) => {
    try{
        const { mail, password } = req.body

        const [user] = await db.select().from(users).where(eq(users.mail,mail))
        const isValidPassword = await bcrypt.compare(password, user.password)

        if(!user || !isValidPassword){
            return res.status(401).json({error: "Invalid email or password"})
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'})

        res.status(200).json({
            message: 'User logged in',
            userData: {
                id: user.id,
                mail: user.mail,
                firstName: user.firstName,
                lastName: user.lastName,
                isAdmin: user.isAdmin
            },
            token
        })

    }catch(error){
        console.error(error)
        res.status(500).send({
            error: 'Login Failed',
        })
    }
}
