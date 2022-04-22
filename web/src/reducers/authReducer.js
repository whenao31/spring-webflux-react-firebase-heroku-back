import * as actions from '../actions/authActions'

export const initialState = {
  email: null,
  uid: null,
  firstName: null,
  lastName: null,
  profileImage: null,
  documentId: null,
  questionUserEmail: "",
}

export default function authReducer(state = initialState, action) {
  const payload = action.payload;
  switch (action.type) {
    case actions.LOGIN:
      return {
        ...state,
        email: payload.email,
        uid: payload.uid,
      }
    case actions.LOGOUT:
      return initialState
    case actions.GET_USER_PROFILE:
      return {
        ...state,
        firstName: payload.firstName,
        lastName:payload.lastName,
        profileImage: payload.profileImage,
        documentId: payload.documentId
      }
    case actions.GET_QUESTION_USER_EMAIL:
        return { ...state, questionUserEmail: payload.questionUserEmail}
    default:
      return state
  }
}
