
import {APPEND_MESSAGE, IS_TYPING, NOT_TYPING, JUST_JOINED, LOAD_MESSAGES} from '../types';

const initialState={
    messages: [],
    typist: null,
    joined: false,
}

const chatReducer = (state = initialState, action)=>{
    switch(action.type){
        case LOAD_MESSAGES:
            return{
                ...state,
                messages: action.payload,
            }
        case APPEND_MESSAGE:
            return {
                ...state,
                messages: state.messages.concat([action.payload]),
            };
        case IS_TYPING:
            return {
                ...state,
                typist: action.payload.handle,
            };
        case NOT_TYPING:
            return{
                ...state,
                typist: null,
            };
        case JUST_JOINED:
            return{
                ...state,
                joined:action.payload.success,
            }
        default: return state;
    }
}
export default chatReducer;
