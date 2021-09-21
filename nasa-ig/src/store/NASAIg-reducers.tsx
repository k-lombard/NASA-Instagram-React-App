import { IGState } from "./NASAIg-types";
import { NASAIgActionTypes } from "./NASAIg-types";
import { SET_CURRENT_IMAGES } from "./NASAIg-types";
import { getAPODDefault } from "./NASAIg-actions";
import { SET_LOADING } from "./NASAIg-types";
import { SET_LIKES } from "./NASAIg-types";
import { PURGE } from 'redux-persist';
import { initialState } from "./store";
import { SET_COPY_IMAGES } from "./NASAIg-types";
import { SET_COPY_LIKES } from "./NASAIg-types";

export const initialIGState: IGState = {
    currentImages: [],
    likes: [],
    loading: false,
    copyImages: [],
    copyLikes: []
}

export function NASAIgReducer (
    state = initialIGState,
    action: NASAIgActionTypes
): IGState {
    switch (action.type) {
        case SET_CURRENT_IMAGES:
            return {
                ...state,
                currentImages: action.currentImages
            }
        case SET_LIKES:
            return {
                ...state,
                likes: action.likes
            }
        case SET_LOADING:
            return {
                ...state,
                loading: action.loading
            }
        case SET_COPY_IMAGES:
            return {
                ...state,
                copyImages: action.copyImages
            }
        case SET_COPY_LIKES:
            return {
                ...state,
                copyLikes: action.copyLikes
            }
        case PURGE:
            return initialIGState;
        default:
            return state
    }
}