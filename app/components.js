Vue.component('todo-list', {
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
});