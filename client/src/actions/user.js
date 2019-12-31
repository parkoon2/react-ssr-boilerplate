import { FETCH_LOGIN_REQUEST, FETCH_LOGIN_SUCCESS, FETCH_LOGOUT_REQUEST, FETCH_LOGOUT_SUCCESS } from "../constants/actionTypes"
import axios from 'axios'
import config from '../../../server/config/config'

export function fetchUsers() {
    return dispatch => {
        axios.get(`${config.host}:${config.port}/api/v1/users`).then(({ data }) => dispatch({ type: 'FETCH_USERS_SUCCESS', payload: { users: data.users } })).catch(err => console.error(err))
    }
}

export function fetchLogin(user, callback) {
    return dispatch => {
        dispatch(fetchLoginRequest())

        setTimeout(() => {
            user.name = 'guest#1'
            dispatch(fetchLoginSuccess(user))
            callback(user)
        }, 1)
    }
}

export function fetchLogout(callback) {
    return dispacth => {
        dispacth(fetchLogoutRequest())
        setTimeout(() => {
            dispacth(fetchLogoutSuccess())
            callback()
        }, 1)
    }
}

export const fetchLogoutRequest = () => ({
    type: FETCH_LOGOUT_REQUEST
})

export const fetchLogoutSuccess = () => ({
    type: FETCH_LOGOUT_SUCCESS
})

export const fetchLoginRequest = () => ({
    type: FETCH_LOGIN_REQUEST
})

export const fetchLoginSuccess = user => ({
    type: FETCH_LOGIN_SUCCESS,
    payload: {
        user
    }
})