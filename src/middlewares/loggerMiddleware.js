import { db } from '../db/database.js'
import { users } from '../db/schema.js'

const logger = async (req, res, next) => {

    const { method, host, path } = req
    const time = new Date().toLocaleTimeString('fr-FR')
    console.log(`${time} : ${method} - ${host} - ${path}`)

    try{
        const results = await db.select().from(users);
        res.status(200).json(results);
    }catch(error){
        console.error(error)
    }

    next()
}

export default logger