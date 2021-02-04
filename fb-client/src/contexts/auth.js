import { createContext, useReducer } from 'react'

const initialState = {
    user: null
}

if (localStorage.getItem('jwt-token')) {
    let token = localStorage.getItem("jwt-token")
    let user = JSON.parse(localStorage.getItem("user"));
    initialState.user = { token, user }
}

const AuthContext = createContext({
    user: null,
    login: (userData) => { },
    logout: () => { }
})

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload }
        case 'LOGOUT':
            return { ...state, user: null }
        default:
            return state;
    }
}

const AuthProvider = (props) => {
    const [state, dispatch] = useReducer(authReducer, initialState)

    const login = (userData) => {
        localStorage.setItem("jwt-token", userData.token)
        localStorage.setItem("user", JSON.stringify(userData.user))
        dispatch({ type: 'LOGIN', payload: userData })
    }

    const logout = () => {
        localStorage.removeItem("jwt-token")
        localStorage.removeItem("user")
        dispatch({ type: 'LOGOUT' })
    }

    return (
        <AuthContext.Provider
            value={{ user: state.user, login, logout }} {...props}
        />
    )

}

export { AuthContext, AuthProvider }