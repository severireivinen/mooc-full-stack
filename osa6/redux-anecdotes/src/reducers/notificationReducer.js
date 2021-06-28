const initialState = { text: null, time: null }

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return { text: action.data.text, time: action.data.time }
        case 'CLEAR_NOTIFICATION':
            return {
                text: null,
                time: null
            }

        default: return state
    }
}

export const setNotification = (text, time) => {
    return async dispatch => {
        const timeOut = setTimeout(() => {
            dispatch(clearNotification())
        }, time)
        dispatch({ type: 'SET_NOTIFICATION', data: { text, timeOut } })
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION'
    }
}

export default notificationReducer