import { sqliteTable, text, integer, boolean } from "drizzle-orm/sqlite-core"
import { randomUUID } from 'crypto'

export const user = sqliteTable('user',{
    id: text().primaryKey().$defaultFn(()=>randomUUID()),
    mail: text('email', {length:255}).notNull().unique(),
    firstName: text('first_name',{length:50}).notNull(),
    lastName: text('last_name',{length:50}).notNull(),
    password: text('password', {length:255}).notNull(),
    isAdmin: boolean('is_admin').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp'}).$defaultFn(
        () => new Date()
    ),
})

export const collection = sqliteTable('collection',{
    id: text().primaryKey().$defaultFn(()=>randomUUID()),
    title: text('title', {length:100}).notNull(),
    description: text('description', {length:255}),
    isPublic: boolean('is_public').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp'}).$defaultFn(
        () => new Date()
    ),
    owner: text('owner').references(()=>user.id,{ onDelete: 'cascade' }).notNull(),
})

export const flashcard = sqliteTable('flashcard', {
    id: text().primaryKey().$defaultFn(()=>randomUUID()),
    front: text('front', {length:100}).notNull(),
    back: text('back', {length:100}).notNull(),
    createdAt: integer('created_at', { mode: 'timestamp'}).$defaultFn(
        () => new Date()
    ),
})



