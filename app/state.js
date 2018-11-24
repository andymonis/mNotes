// import { createStore } from '/node_modules/redux/es/redux.mjs';
import { createStore } from './min.red.js'; 
import todoApp from './reducers.js';

const STORE = createStore(todoApp);

export { STORE } 