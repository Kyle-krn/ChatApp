export const wsTypes = {
    ROOM : {
        GET : {
            ALL_ROOMS: 'all_rooms',
            CREATED_ROOM : 'created_room',
            TITLE_UNIQUE: 'title_unique'
        },
        POST: {
            CREATE_ROOM: 'createRoom'
        }
    },
    CHAT: {
        GET: {
            JOIN_IN_ROOM: 'join_in_room',
            LEAVE_IN_ROOM: 'leave_in_room',
            CONNECTED_TO_CHAT: 'connected_to_chat',
            CHAT_NOT_FOUND: 'chat_not_found',
            NEW_MESSAGE: 'new_message',
            OLD_MESSAGES: 'old_messages'
        },
        POST: {
            NEW_MESSAGE: 'newMessage',
            GET_OLD_MESSAGE: 'getOldMessage'
        }
    }
} 