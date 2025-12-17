import { db } from './database.js'
import { users, collections, flashcards, levels, studies } from './schema.js'
import bcrypt from 'bcrypt'


const seed = async() => {
    console.log('Starting database seeding...')
    try{
        // Delete existing data in reverse order to avoid foreign key constraints
        await db.delete(studies)
        await db.delete(flashcards)
        await db.delete(collections)
        await db.delete(levels)
        await db.delete(users)

        // Seed users
        const SeedUsers = [
            {
                mail: 'jeanmidu13@gmail.com',
                firstName: 'Jean',
                lastName: 'Midu',
                password: await bcrypt.hash('patatatata', await bcrypt.genSalt()),
                isAdmin: false,
            },
            {
                mail: 'hugojaubert@gmail.com',
                firstName: 'Hugo',
                lastName: 'Jaubert',
                password: await bcrypt.hash('hugolisse', await bcrypt.genSalt()),
                isAdmin: true,
            }
        ]

        const userResults = await db.insert(users).values(SeedUsers).returning()

        // Seed levels
        const SeedLevels = [
            {
                levelDefinition: 1,
                delay: '1 jour',
            },
            {
                levelDefinition: 2,
                delay: '2 jours',
            },
            {
                levelDefinition: 3,
                delay: '4 jours',
            },
            {
                levelDefinition: 4,
                delay: '8 jours',
            },
            {
                levelDefinition: 5,
                delay: '16 jours',
            }
        ]

        const levelResults = await db.insert(levels).values(SeedLevels).returning()

        // Seed collections
        const SeedCollections = [
            {
                title: 'Géographie',
                description: 'Questions sur la géographie mondiale',
                isPublic: true,
                userId: userResults[0].id
            },
            {
                title: 'Littérature',
                description: 'Questions sur les auteurs et œuvres célèbres',
                isPublic: false,
                userId: userResults[1].id
            },
            {
                title: 'Histoire',
                description: 'Événements historiques importants',
                isPublic: true,
                userId: userResults[0].id
            }
        ]

        const collectionResults = await db.insert(collections).values(SeedCollections).returning()

        // Seed flashcards
        const SeedFlashcards = [
            {
                front: 'Quelle est la capitale de la France?',
                back: 'Paris',
                urlFront: '',
                urlBack: '',
                collectionId: collectionResults[0].id
            },
            {
                front: 'Quel est le plus grand océan du monde?',
                back: "L'océan Pacifique",
                urlFront: '',
                urlBack: '',
                collectionId: collectionResults[0].id
            },
            {
                front: 'Qui a écrit "Les Misérables"?',
                back: 'Victor Hugo',
                urlFront: '',
                urlBack: '',
                collectionId: collectionResults[1].id
            },
            {
                front: 'En quelle année a eu lieu la Révolution française?',
                back: '1789',
                urlFront: '',
                urlBack: '',
                collectionId: collectionResults[2].id
            },
            {
                front: 'Quel est le symbole chimique de l\'eau?',
                back: 'H2O',
                urlFront: '',
                urlBack: '',
                collectionId: collectionResults[0].id
            }
        ]

        const flashcardResults = await db.insert(flashcards).values(SeedFlashcards).returning()

        // Seed studies
        const SeedStudies = [
            {
                flashcardId: flashcardResults[0].id,
                userId: userResults[0].id,
                levelId: levelResults[0].id,
                lastDate: new Date(),
                nextDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) // 1 day later
            },
            {
                flashcardId: flashcardResults[1].id,
                userId: userResults[1].id,
                levelId: levelResults[1].id,
                lastDate: new Date(),
                nextDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) // 2 days later
            },
            {
                flashcardId: flashcardResults[2].id,
                userId: userResults[0].id,
                levelId: levelResults[2].id,
                lastDate: new Date(),
                nextDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000) // 4 days later
            }
        ]

        await db.insert(studies).values(SeedStudies)

        console.log('Database seeded successfully')
    }catch(error){
        console.log(error)
    }
}

seed()