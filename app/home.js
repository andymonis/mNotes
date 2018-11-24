import { STORE } from './state.js';
import { addTodo } from './actions.js';
import UI from './min.ui.js';

class Home {
    constructor(){
        this.view = {
            todos: [],
            txtNewTodo: ""
        }

        STORE.subscribe(() => { 
            this.onStateChange();
        } );
    }

    onStateChange(){
        let state = STORE.getState();
        this.view.todos = state.todos;

        UI.refresh();
    }

    onClick(){
        STORE.dispatch(addTodo(this.view.txtNewTodo));
        this.view.txtNewTodo = "";
    }

    onInput(evt){
        this.view.txtNewTodo = evt.srcElement.value;
    }

    render(){
        let state = STORE.getState();
        let lis = [];
        for( let i=0; i<state.todos.length; i++ ){
            lis.push( UI.h( "li", {}, state.todos[i].text ) );
        }

        return UI.h("section", {}, [
            UI.h( "div", {}, [
                UI.h( "h2", {}, "App Title" )
            ]),
            UI.h( "button", { 
                class:"btn",
                onclick:()=>{ this.onClick() }
            }, "add todo" ),
            UI.h( "input", {
                class: "frm",
                placeholder:"enter a todo...",
                oninput:(evt)=> { this.onInput(evt) }
            } ),
            UI.h( "div", {}, [
                UI.h( "ul", {}, lis )
            ])
        ]);
    }
}

export default Home;