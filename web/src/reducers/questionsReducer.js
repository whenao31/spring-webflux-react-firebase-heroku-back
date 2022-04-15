import * as actions from '../actions/questionActions'

export const initialState = {
  loading: true,
  hasErrors: false,
  questions: [],
  question: {},
  redirect: null,
  filtered: false
}

export default function questionsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOADING:
      return { ...state, loading: true }
    case actions.LOADED_SUCCESS:
      return { ...state, ...action.payload, loading: false, hasErrors: false, filtered: false }
    case actions.LOADED_FAILURE:
      return { ...state, loading: false, hasErrors: true }
    case actions.CATEGORY_FILTER:
      const category = action.payload;
      const categoryFilteredList = state.questions.filter(question => question.category === category);
      return { ...state, questions: categoryFilteredList, filtered: true }
    case actions.CLEAR_FILTER:
      return { ...state, filtered: false}
    default:
      return state
  }
}
