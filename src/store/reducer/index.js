const INITIAL_STATE = {
    users: [],
    currentUser: {}
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SETFIREBASEUSERS":
            return {
                ...state,
                users: action.payload
            }
        case "SETUSER":
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }

}