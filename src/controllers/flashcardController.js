import { db } from "../db/database.js"
import { collections, flashcards, users, studies, levels } from "../db/schema.js"
import { request, response } from "express"
import { eq, and, lte } from "drizzle-orm"

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
        
        if(resultsCollection[0]["userId"] == req.user.userId){
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

        if(resultsCollection[0]["userId"] == req.user.userId){
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

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
export const reviewFlashcardById = async (req, res)=>{
    const idFlashcard = req.params.id

    try{
        const resultsFlashcard = await db.select().from(flashcards).where(eq(flashcards.id, idFlashcard)).orderBy('created_at','desc')
        const resultsCollection = await db.select().from(collections).where(eq(collections.id, resultsFlashcard[0]["collectionId"])).orderBy('created_at','desc')
        const currentUser = await db.select().from(users).where(eq(users.id, req.user.userId)).orderBy('created_at','desc')

        if(resultsCollection[0]["isPublic"] == true || resultsCollection[0]["userId"] == req.user.userId || currentUser[0]["isAdmin"] == true){

            const resultsLevels = await db.select().from(levels).orderBy('level_definition','asc')
            const resultsStudies = await db.select().from(studies).where(and(eq(studies.userId, req.user.userId), eq(studies.flashcardId, idFlashcard))).orderBy('created_at','desc')

            let studyToUpdate = resultsStudies[0]
            
            if (studyToUpdate == undefined){
                studyToUpdate = await db.insert(studies).values({ reviewCount: 0, lastDate: null, nextDate: null, flashcardId: idFlashcard, userId: req.user.userId, levelId: null, createdAt: new Date()}).returning()
                studyToUpdate = studyToUpdate[0]
            }

            let newLevel = null
            if (studyToUpdate["levelId"] == null){
                newLevel = resultsLevels[0]
            }
            else{
                newLevel = resultsLevels[resultsLevels.findIndex(level => level["id"] === studyToUpdate["levelId"]) + 1] || resultsLevels[resultsLevels.length -1]
            }

            let nextDate = new Date()
            nextDate.setDate(nextDate.getDate() + newLevel["delay"])
            if (newLevel["id"] == studyToUpdate["levelId"]){
                nextDate = null
            }

            await db.update(studies).set({
                reviewCount: studyToUpdate["reviewCount"] + 1, 
                lastDate: new Date(), 
                nextDate: nextDate,
                levelId: newLevel["id"]
            }).where(eq(studies.id, studyToUpdate["id"]));

            res.status(200).send({message: 'Flashcard reviewed successfully'});

        }
        else{
            return res.status(403).send({
                error: 'You do not have the rights to review this flashcard'
            })
        }

    }catch(error){
        res.status(500).send({
            error: 'Failed to review flashcard',
        })
    }

}

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
export const getFlashcardsToReviewByCollection = async (req, res)=>{
    const idCollection = req.params.id
    try{
        const resultsCollection = await db.select().from(collections).where(eq(collections.id, idCollection)).orderBy('created_at','desc')
        const currentUser = await db.select().from(users).where(eq(users.id, req.user.userId)).orderBy('created_at','desc')

        if(resultsCollection[0]["userId"] == req.user.userId || currentUser[0]["isAdmin"] == true){
            const resultsFlashcard = await db.select().from(flashcards).innerJoin(studies, eq(flashcards.id, studies.flashcardId)).where(and(eq(flashcards.collectionId, idCollection), eq(studies.userId, req.user.userId), lte(studies.nextDate, new Date()))).orderBy('created_at','desc')
            res.status(200).json(resultsFlashcard);
        }
    }catch(error){
        console.error(error)
        res.status(500).send({
            error: 'Failed to get flashcards',
        })
    }
}