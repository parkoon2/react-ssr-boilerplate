import Cookie from 'js-cookie'

import { FETCH_LOGIN_REQUEST, FETCH_LOGIN_SUCCESS, FETCH_LOGOUT_REQUEST, FETCH_LOGOUT_SUCCESS } from '../constants/actionTypes'
const initialState = {
    error: null,
    loading: false,
    info: Cookie.getJSON('user') || {},
    users: [] // 테스트용
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_USERS_SUCCESS': // 이렇게 하면 안됨!
            return {
                ...state,
                users: action.payload.users
            }
        case FETCH_LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                info: { ...action.payload.user },
            }

        case FETCH_LOGOUT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                info: {}
            }
        default:
            return state

    }
}

export default user