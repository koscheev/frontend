const initialState = {
    login: '',
    password: '',
    user: null,
    error: '',
    users: [],
    loggedInUser: null,
    page: 0,
    basket: [],
    details: false

}

export default (state = initialState, action) => {
    
    if(action.type === "CHANGE_LOGIN") {
        return {
            ...state,
            login: action.payload
        }
    }

    if(action.type === 'CHANGE_PASSWORD') {
        return {
            ...state,
            password: action.payload
        }
    }

    if(action.type === "GET_USER") {
        return {
            ...state,
            user: action.payload
        }
    }

    if(action.type === "GET_ERROR") {
        return {
            ...state,
            error: action.payload
        }
    }

    if(action.type === "SET_USERS") {
        return {
            ...state,
            users: action.payload
        }
    }

    if(action.type === "LOG_IN") {
        return {
            ...state,
            loggedInUser: action.payload
        }
    }

    if(action.type === "LOG_OUT") {
        return {
            ...state,
            loggedInUser: null
        }
    }

    if(action.type === "ADD_TO_BASKET") {
        return {
            ...state,
            basket: [...state.basket, action.payload]
        }
    }

    if(action.type === "REMOVE_FROM_BASKET") {
        return {
            ...state,
            basket: state.basket.filter((product) => product !== action.payload)
        }
    }

    if(action.type === "CLEAR_BASKET") {
        return {
            ...state,
            basket: []
        }
    }

    if(action.type === "GET_DETAILS") {
        return {
            ...state,
            details: action.payload
        }
    }

    return state
}
