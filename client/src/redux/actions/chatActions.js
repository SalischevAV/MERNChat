import {APPEND_MESSAGE, IS_TYPING, NOT_TYPING, JUST_JOINED, LEAVE_CHAT } from '../types';

export function AppendMessage(data){
    return{
        type: APPEND_MESSAGE,
        payload: {...data},
    }
}

export function isTyping(data){
    return{
        type: IS_TYPING,
        payload: {...data},
    }
}

export function justJoined(bool){
    return{
        type: JUST_JOINED,
        payload: {success: bool},
    }
}

export function notTyping(data){
    return{
        type: NOT_TYPING,
        payload:{...data},
    }
}