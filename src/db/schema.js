import { sqliteTable, text, integer, bool } from "drizzle-orm/sqlite-core"
import { randomUUID } from 'crypto'

export const user = sqliteTable('user',{
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

export const collection = sqliteTable('collection',{
    id: text().primaryKey().$defaultFn(()=>randomUUID()),
    title: text('title', {length:100}).notNull(),
    description: text('description', {length:255}),
    isPublic: integer('is_public', {mode:'boolean'}).notNull(),
    createdAt: integer('created_at', { mode: 'timestamp'}).$defaultFn(
        () => new Date()
    ),
    userId: text('id_user').references(()=>user.id,{ onDelete: 'cascade' }).notNull(),
})

export const flashcard = sqliteTable('flashcard', {
    id: text().primaryKey().$defaultFn(()=>randomUUID()),
    front: text('front', {length:100}).notNull(),
    back: text('back', {length:100}).notNull(),
    urlFront: text('url_front', {length:100}).notNull(),
    urlBack: text('url_back', {length:100}).notNull(),
    createdAt: integer('created_at', { mode: 'timestamp'}).$defaultFn(
        () => new Date()
    ),
    collectionId: text('id_collection').references(()=>collection.id,{ onDelete: 'cascade'}).notNull(),
})

export const level = sqliteTable('level',{
    id: text().primaryKey().$defaultFn(()=>randomUUID()),
    levelDefinition: integer('level_definition').notNull(),
    delay: text('delay', {length:100}).notNull(),
    createdAt: integer('created_at', { mode: 'timestamp'}).$defaultFn(
        () => new Date()
    ),
})

export const study = sqliteTable('study',{
    id: text().primaryKey().$defaultFn(()=>randomUUID()),
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
    flashcardId: text('id_flashcard').references(()=>flashcard.id,{ onDelete: 'cascade'}).notNull(),
    userId: text('id_user').references(()=>user.id,{ onDelete: 'cascade'}).notNull(),
    levelId: text('id_level').references(()=>level.id,{ onDelete: 'cascade'}).notNull(),
})



