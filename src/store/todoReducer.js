const defaultState = {
  todos: [],
  showCompleted: false,
  showNoCompleted: false
}

export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
const SHOW_ALL = "SHOW_ALL";
const SHOW_COMPLETED = "SHOW_COMPLETED";
const SHOW_NO_COMPLETED = "SHOW_NO_COMPLETED";


export const todoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_TODO:
        return {...state, todos: [...state.todos, action.payload]}
    case DELETE_TODO: 
        return { ...state, todos: state.todos.filter(i => i.id !== action.payload) }
    case TOGGLE_TODO: 
      return {
        ...state,
        todos: state.todos.map(
          todo => todo.id === action.payload
            ? {...todo, completed: !todo.completed}
            : todo
        )
      }
    case SHOW_ALL:
      return { ...state, showCompleted: false, showNoCompleted: false }
    case SHOW_COMPLETED:
      return { ...state, showCompleted: true, showNoCompleted: false }
    case SHOW_NO_COMPLETED:
      return {...state, showCompleted: false, showNoCompleted: true }
    default: return state;
  }
}


export const addTodoAction = payload => ({type: ADD_TODO, payload})
export const deleteTodoAction = payload => ({type: DELETE_TODO, payload})
export const toggleTodoAction = payload => ({type: TOGGLE_TODO, payload})
export const showCompletedAction = () => ({type: SHOW_COMPLETED})
export const showAllAction = () => ({type: SHOW_ALL})
export const showNoCompletedAction = () => ({type: SHOW_NO_COMPLETED})