import { db } from "../db/database.js"
import { collections, flashcards, users } from "../db/schema.js"
import { request, response } from "express"
import { eq } from "drizzle-orm"

/**
 * @param {request} req
 * @param {response} res
 */
export const createFlashcard = async (req, res)=>{
    const userId = req.user.userId
    const { front, back, urlFront, urlBack, collectionId } = req.body;
    try{
        if (!front || !back || !collectionId){
            return res.status(400).send({error: "Front text, back text and collectionId are required"})
        }

        const collection = await db.select().from(collections).where(eq(collections.id, collectionId))
        if(!collection){
            return res.status(404).send({error: "Collection not found"})
        }

        if(collection[0]["userId"] !== userId){
            return res.status(403).send({error: "You do not have the rights to create a flashcard in this collection"})
        }
        
        const [newFlashCard] = await db.insert(flashcards).values({front:front, back:back, urlFront:urlFront, urlBack:urlBack, collectionId:collectionId}).returning()

        res.status(201).send({message:"Flashcard created", data:newFlashCard})
    }
    catch(error){
        console.error(error)
        res.status(500).send({
            error: 'Failed to post flashcard',
        })
    }
}

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
export const getFlashcardById = async (req, res) => {
    const idFlashcard = req.params.id

    try{
        const resultsFlashcard = await db.select().from(flashcards).where(eq(flashcards.id, idFlashcard)).orderBy('created_at','desc')
        const resultsCollection = await db.select().from(collections).where(eq(collections.id, resultsFlashcard[0]["collectionId"])).orderBy('created_at','desc')
        const currentUser = await db.select().from(users).where(eq(users.id, req.user.userId)).orderBy('created_at','desc')

        //Puisqu'il n'y a qu'une collection par ID alors on peut récupérer au premier index
        if(resultsCollection[0]["isPublic"] == true || resultsCollection[0]["userId"] == req.user.userId || currentUser[0]["isAdmin"] == true){
            res.status(200).json(resultsFlashcard);
        }
        else{
            res.status(403).send({
                error: 'Vous n\'avez pas accès à cette page'
            })
        }

    }catch(error){
        res.status(500).send({
            error: 'Failed to query flashcard',
            reason: error
        })
    }
}

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
export const getFlashcardsByCollection = async (req, res)=>{
    const idCollection = req.params.id

    try{

        const resultsCollection = await db.select().from(collections).where(eq(collections.id, idCollection)).orderBy('created_at','desc')
        const currentUser = await db.select().from(users).where(eq(users.id, req.user.userId)).orderBy('created_at','desc')

        if(resultsCollection[0]["isPublic"] == true || resultsCollection[0]["userId"] == req.user.userId || currentUser[0]["isAdmin"] == true){

            const resultsFlashcard = await db.select().from(flashcards).where(eq(flashcards.collectionId, idCollection)).orderBy('created_at','desc')
            res.status(200).json(resultsFlashcard);
        }
        else{
            res.status(403).send({
                error: 'Vous n\'avez pas accès à cette page'
            })
        }

    }catch(error){
        res.status(500).send({
            error: 'Failed to query flashcards',
        })
    }
}


/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
export const deleteFlashcardById = async (req, res)=>{
    const idFlashcard = req.params.id

    try{
        const resultsFlashcard = await db.select().from(flashcards).where(eq(flashcards.id, idFlashcard)).orderBy('created_at','desc')
        const resultsCollection = await db.select().from(collections).where(eq(collections.id, resultsFlashcard[0]["collectionId"])).orderBy('created_at','desc')
        const currentUser = await db.select().from(users).where(eq(users.id, req.user.userId)).orderBy('created_at','desc')
        
        if(resultsCollection[0]["userId"] == req.user.userId || currentUser[0]["isAdmin"] == true){
            await db.delete(flashcards).where(eq(flashcards.id, idFlashcard));
            res.status(200).send({message: 'Flashcard deleted successfully'});
        }
        else{
            res.status(403).send({
                error: 'You do not have the rights to delete this flashcard'
            })
        }
    }catch(error){
        res.status(500).send({
            error: 'Failed to delete flashcard',
        })
    }
}

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
export const editFlashcardById = async (req, res)=>{
    const idFlashcard = req.params.id
    const { front, back, urlFront, urlBack } = req.body;
    try{
        const resultsFlashcard = await db.select().from(flashcards).where(eq(flashcards.id, idFlashcard)).orderBy('created_at','desc')
        const resultsCollection = await db.select().from(collections).where(eq(collections.id, resultsFlashcard[0]["collectionId"])).orderBy('created_at','desc')
        const currentUser = await db.select().from(users).where(eq(users.id, req.user.userId)).orderBy('created_at','desc')

        if(resultsCollection[0]["userId"] == req.user.userId || currentUser[0]["isAdmin"] == true){
            await db.update(flashcards).set({front:front, back:back, urlFront:urlFront, urlBack:urlBack}).where(eq(flashcards.id, idFlashcard));
            res.status(200).send({message: 'Flashcard edited successfully'});
        }
        else{
            res.status(403).send({
                error: 'You do not have the rights to edit this flashcard'
            })
        }
    }catch(error){
        res.status(500).send({
            error: 'Failed to edit flashcard',
        })
    }
}

// /**
//  * 
//  * @param {request} req 
//  * @param {response} res 
//  */
// export const getFlashcardsToReviewByCollection = async (req, res)=>{
//     const idCollection = req.params.id
//     try{
//         const resultsCollection = await db.select().from(collections).where(eq(collections.id, idCollection)).orderBy('created_at','desc')
//         const currentUser = await db.select().from(users).where(eq(users.id, req.user.userId)).orderBy('created_at','desc')
//         if(resultsCollection[0]["isPublic"] == true || resultsCollection[0]["userId"] == req.user.userId || currentUser[0]["isAdmin"] == true){
//             //where id collection and where 
//             const resultsFlashcard = await db.select().from(flashcards).where(eq(flashcards.collectionId, idCollection)) //.orderBy('created_at','desc')
// }