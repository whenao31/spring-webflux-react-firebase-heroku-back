
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const GET_USER_PROFILE = 'GET_USER_PROFILE'
export const GET_QUESTION_USER_EMAIL = 'GET_QUESTION_USER_EMAIL'

export const login = (email, uid) => ({ type: LOGIN, payload: {email, uid} })
export const getProfile = (firstName, lastName, profileImage, documentId) => ({ 
    type: GET_USER_PROFILE, 
    payload: {firstName, lastName, profileImage, documentId}
    })

export const getUserEmail = (questionUserEmail) => ({type: GET_QUESTION_USER_EMAIL, payload: {questionUserEmail}})

export const logout = () => ({
    type: LOGOUT
});



