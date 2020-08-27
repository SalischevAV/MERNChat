import {APPEND_MESSAGE, IS_TYPING, NOT_TYPING, JUST_JOINED, LOAD_MESSAGES } from '../types';

export function loadMessages(){
    return async dispatch =>{
        try{
            const response = await fetch('http://localhost:8080/api/messages');
            const data = await response.json();
            dispatch({
                type: LOAD_MESSAGES,
                payload: data,
            })
        }
        catch(err){
            console.log(err)
        }
    }
}

export function AppendMessage(data){
    return async dispatch => {
        console.log({...data})
        try{
            const response = await fetch('http://localhost:8080/api/messages',{
                headers:{'Contetnt-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify(data),
            });
            const req = await response.json();
            // console.log(req)

            dispatch({
                type: APPEND_MESSAGE,
                payload: {...data},
            })
        }
        catch(err){
            console.log(err)
        }
        
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