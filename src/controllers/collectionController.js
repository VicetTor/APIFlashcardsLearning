import {db} from "../db/database.js"
import { collections, users } from "../db/schema.js"
import { request, response } from "express"
import { eq, and } from "drizzle-orm"

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
export const createCollection = async (req, res) => {
    const { idUser } = req.params
    const { title, description, isPublic } = req.body

    if(!title || (typeof(isPublic) == 'undefined') ){
        return res.status(400).send({error: "The title and the knowledge of the privacy is required"})
    }
    try{
        const [newCollection] = await db.insert(collections).values({title: title, isPublic: isPublic, description:description, userId: idUser}).returning()
        res.status(201).send({message: 'Collection created', data:newCollection})
    }catch(error){
        res.status(500).send({
            error: 'Failed to post collection',
        })
    }
}

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
export const getCollectionById = async (req, res) => {
    const idCollection = req.params.id

    try{
        const resultsCollection = await db.select().from(collections).where(eq(collections.id, idCollection)).orderBy('created_at','desc')
        const currentUser = await db.select().from(users).where(eq(users.id, req.user.userId)).orderBy('created_at','desc')

        //Puisqu'il n'y a qu'une collection par ID alors on peut récupérer au premier index
        if(resultsCollection[0]["isPublic"] == true || resultsCollection[0]["userId"] == req.user.userId || currentUser[0]["isAdmin"] == true){
            res.status(200).json(resultsCollection);
        }
        else{
            res.status(403).send({
                error: 'Vous n\'avez pas accès à cette page'
            })
        }

    }catch(error){
        console.error(error)
        res.status(500).send({
            error: 'Failed to query collection',
            reason: error
        })
    }
}

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
export const getCollectionByTitle = async (req, res) => {
    const { title } = req.params;

    try{
        const results = await db.select().from(collections).where(and(eq(collections.title, title), eq(collections.isPublic, true))).orderBy('created_at','desc')
        if(results[0] == null){
            res.status(200).send({information:"Il n'y a aucune collection publique ayant ce nom"})
        }
        else{
            res.status(200).json(results);
        }
    }catch(error){
        res.status(500).send({
            error: 'Failed to query collection by title',
            reason: error
        })
    }
}

/**
 * @param {request} req
 * @param {response} res
 */
export const getMyCollections = async (req, res) => {
    const userId = req.user.userId
    try{
        const results = await db.select().from(collections).where(eq(collections.userId, userId)).orderBy('created_at','desc')
        if(results[0] == null){
            res.status(200).send({information:"Vous n'avez aucune collection créées"})
        }
        else{
            res.status(200).json(results);
        }
    }catch(error){
        console.error(error)
        res.status(500).send({
            error: 'Failed to query my collection',
            reason: error
        })
    }
}
