import {db} from "../db/database.js"

export const getAllCollection = async (req, res) => {
    try {
        const results = await db.select().from(collection).orderBy('created_at', desc)
        res.status(200).json(results)
    }catch(error){
        res.status(500).send({
            error: 'Failed to query questions',
        })
    }
}

export const createCollection = async (req, res) => {
    const{title, description, is_public, id_collection, id_user, created_at} = req.body

    if(!title, !is_public, !id_collection, !id_user){
        return res(400).send({error: "title, is_public, id_collection and id_user are required"})
    }
    try{
        const [newCollection] = await db.insert(questions).values({title: title, is_public: is_public, id_collection: id_collection, id_user: id_user}).returning()
        res.status(201).send({message: 'Collection created', data:newCollection})
    }catch(error){
        res.status(500).send({
            error: 'Failed to post question',
        })
    }
}

