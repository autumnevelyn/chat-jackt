import {
    ColumnType,
    Generated,
    Insertable,
    Selectable,
    Updateable
} from 'kysely'

export interface Database {
    users: UserTable
    messages: MessageTable
}

// Table interfaces should only be used in the `Database` type above and never as a result type of a query!
export interface UserTable {
    // Columns that are generated by the database should be marked using the `Generated` type. This way they are automatically made optional in inserts and updates.
    id: Generated<number>
    username: string
    password: string
    // You can specify a different type for each operation (select, insert and
    // update) using the `ColumnType<SelectType, InsertType, UpdateType>`
    // wrapper. Here we define a column `created_at` that is selected as
    // a `Date`, can optionally be provided as a `string` in inserts and
    // can never be updated:
    created_at: ColumnType<Date, string | undefined, never>
}

// These wrappers make sure that the correct types are used in each operation.
export type User = Selectable<UserTable>
export type NewUser = Insertable<UserTable>
export type UserUpdate = Updateable<UserTable>

export interface MessageTable {
    id: Generated<number>
    sender_id: number
    conversation_id: number
    content: string  
    created_at: ColumnType<Date, string | undefined, never>
}

export type Message = Selectable<MessageTable>
export type NewMessage = Insertable<MessageTable>
export type MessageUpdate = Updateable<MessageTable>


export interface ConversationTable {
    id: Generated<number>
    type: 'private_message' | 'group_chat' | null
    title: string
    created_at: ColumnType<Date, string | undefined, never>
}

export type Conversation = Selectable<ConversationTable>
export type NewConversation = Insertable<ConversationTable>
export type ConversationUpdate = Updateable<ConversationTable>

export interface IsMemberTable {
    conversation_id: number
    user_id: number
    created_at: ColumnType<Date, string | undefined, never>
}

export type IsMember = Selectable<IsMemberTable>
export type NewIsMember = Insertable<IsMemberTable>
export type IsMemberUpdate = Updateable<IsMemberTable>