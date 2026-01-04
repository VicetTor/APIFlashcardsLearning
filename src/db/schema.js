import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { randomUUID } from 'crypto'

export const users = sqliteTable('users',{
    id: text().primaryKey().$defaultFn(()=>randomUUID()),
    mail: text('email', {length:255}).notNull().unique(),
    firstName: text('first_name',{length:50}).notNull(),
    lastName: text('last_name',{length:50}).notNull(),
    password: text('password', {length:255}).notNull(),
    isAdmin: integer('is_admin', {mode:'boolean'}).notNull(),
    createdAt: integer('created_at', { mode: 'timestamp'}).$defaultFn(
        () => new Date()
    ),
})

export const collections = sqliteTable('collections',{
    id: text().primaryKey().$defaultFn(()=>randomUUID()),
    title: text('title', {length:100}).notNull(),
    description: text('description', {length:255}),
    isPublic: integer('is_public', {mode:'boolean'}).notNull(),
    createdAt: integer('created_at', { mode: 'timestamp'}).$defaultFn(
        () => new Date()
    ),
    userId: text('id_user').references(()=>users.id,{ onDelete: 'cascade' }).notNull(),
})

export const flashcards = sqliteTable('flashcards', {
    id: text().primaryKey().$defaultFn(()=>randomUUID()),
    front: text('front', {length:100}).notNull(),
    back: text('back', {length:100}).notNull(),
    urlFront: text('url_front', {length:100}),
    urlBack: text('url_back', {length:100}),
    createdAt: integer('created_at', { mode: 'timestamp'}).$defaultFn(
        () => new Date()
    ),
    collectionId: text('id_collection').references(()=>collections.id,{ onDelete: 'cascade'}).notNull(),
})

export const levels = sqliteTable('levels',{
    id: text().primaryKey().$defaultFn(()=>randomUUID()),
    levelDefinition: integer('level_definition').notNull(),
    delay: integer('delay').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp'}).$defaultFn(
        () => new Date()
    ),
})

export const studies = sqliteTable('studies',{
    id: text().primaryKey().$defaultFn(()=>randomUUID()),
    reviewCount: integer('review_count').notNull().$default(0),
    lastDate: integer('last_date', { mode: 'timestamp'}).$defaultFn(
        () => new Date()
    ),
    nextDate: integer('next_date', { mode: 'timestamp'})
    .$defaultFn(
        () => null
    ),
    createdAt: integer('created_at', { mode: 'timestamp'}).$defaultFn(
        () => new Date()
    ),
    flashcardId: text('id_flashcard').references(()=>flashcards.id,{ onDelete: 'cascade'}).notNull(),
    userId: text('id_user').references(()=>users.id,{ onDelete: 'cascade'}).notNull(),
    levelId: text('id_level').references(()=>levels.id,{ onDelete: 'cascade'}),
})

// http://localhost:3000/flashcards/16c3b3f9-33c7-4180-97aa-bde0bc96d620/review

