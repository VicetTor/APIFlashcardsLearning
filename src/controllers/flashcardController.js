import { db } from "../db/database.js"
import { collection, flashcard } from "../db/schema.js"
import { request, response } from "express"

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
export const getAllFlashCardsFromCollection = async (req, res)=>{
    const { idCollection } = req.params
    const isCollectionPublic = await db.select({
        isPublic: collection.isPublic
    }).from(collection).where(eq(collection.id, idCollection))
    
    const isOwnerOfCollection = true;
    if(!isCollectionPublic){
        const userId = await db.select({
            userId: collection.userId 
        }).from(collection).where(eq(collection.id, idCollection))

        if(req.user.userId != userId){
            isOwnerOfCollection = false;
        }
    }

    try{
        if(isOwnerOfCollection){
            const results = await db.select().from(flashcard).where(eq(flashcard.collectionId,idCollection)).orderBy('created_at', 'desc')
            res.status(200).json(results);
        }
        res.status(500).send({
            error: 'You do not have the rights to do that',
        })
    }catch(error){
        res.status(500).send({
            error: 'Failed to query flashcards',
        })
    }
}