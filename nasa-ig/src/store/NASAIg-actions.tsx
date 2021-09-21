import { ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'
import { SET_CURRENT_IMAGES } from './NASAIg-types'
import { SetCurrentImagesAction } from './NASAIg-types'
import { SET_LOADING} from './NASAIg-types'
import { SET_LIKES } from './NASAIg-types'
import { SetLikesAction } from './NASAIg-types'
import { SetLoadingAction } from './NASAIg-types'
import { persistStore } from 'redux-persist'
import store from './store'
import { SetCopyImagesAction } from './NASAIg-types'
import { SET_COPY_IMAGES } from './NASAIg-types'
import { SET_COPY_LIKES } from './NASAIg-types'
import { SetCopyLikesAction } from './NASAIg-types'

export function getAPODRange(startDate: Date, endDate: Date): ThunkAction<Promise<any>, {}, {}, AnyAction> {
    return async (): Promise<any> => {
        return fetch(`https://api.nasa.gov/planetary/apod?api_key=gNEZW89Uix8qJaVbIEzoUv8wa5gFsweJ2rinS7So&start_date=${startDate}&end_date=${endDate}`).then(
            res => {
                return Promise.resolve(res)
            }
        ).catch(err => {
            return Promise.reject(new Error(err.response.data))
        })
    }
}


export function getAPODDefault(): ThunkAction<Promise<any>, {}, {}, AnyAction> {
    return async (): Promise<any> => {
        return fetch(`https://api.nasa.gov/planetary/apod?api_key=gNEZW89Uix8qJaVbIEzoUv8wa5gFsweJ2rinS7So&count=100`).then(
            res => {
                return Promise.resolve(res.json())
            }
        ).catch(err => {
            return Promise.reject(new Error(err.response.data))
        })
    }
}

export function setCurrentImages (currentImages: any): SetCurrentImagesAction {
    return {
        type: SET_CURRENT_IMAGES,
        currentImages
    }
}

export function setLoading (loading: boolean): SetLoadingAction {
    return {
        type: SET_LOADING,
        loading
    }
}

export function setLikes (likes: number[]): SetLikesAction {
    return {
        type: SET_LIKES,
        likes
    }
}

export function setCopyImages (copyImages: any): SetCopyImagesAction {
    return {
        type: SET_COPY_IMAGES,
        copyImages
    }
}

export function setCopyLikes (copyLikes: number[]): SetCopyLikesAction {
    return {
        type: SET_COPY_LIKES,
        copyLikes
    }
}

