import UI from './min.ui.js';

import { STORE } from './state.js';
import { addTodo } from './actions.js';

import Home from './home.js';

UI.bind( "#home", new Home() );

STORE.dispatch(addTodo('Learn about actions'));
STORE.dispatch(addTodo('Learn about something'));
STORE.dispatch(addTodo('Learn about books'));