import { observable, action } from 'mobx';

export default class AppStore {
    @observable todoList = [];
    @observable selected = null;
    @observable inputOpen = false;

    @action addTodo(todo) {
        this.todoList.push(todo);
    }

    @action removeTodo(todo) {
        if (!todo) {
            return;
        }
        this.todoList.splice(this.todoList.indexOf(todo), 1);
    }

    @action selectedTodo() {
        return this.selected;
    }

    @action setSelectedTodo(todo) {
        this.selected = todo;
    }

    @action closeDialog() {
        this.inputOpen = false;
    }

    @action openDialog() {
        this.inputOpen = true;
    }
}