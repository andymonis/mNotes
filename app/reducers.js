import { ADD_TODO } from './actions.js';

const initialState = {
    todos: []
}

function todoApp(state = initialState, action={}) {
    switch (action.type) {
        case ADD_TODO:
            return Object.assign({}, state, {
                todos: [
                    ...state.todos,
                    {
                    text: action.text,
                    completed: false
                    }
                ]
            })
        default:
            return state
    }
}

export default todoApp;