import {Component, OnInit} from '@angular/core';
import {TodoService, ToDo} from '../todo.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: ToDo[] = [];
  newTodo: string = '';

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.todoService.getToDos().subscribe(
      (todos) => (this.todos = todos),
      (error) => console.error('Error fetching todos:', error)
    );
  }

  addToDo() {
    if (this.newTodo.trim()) {
      const todo: ToDo = {title: this.newTodo, completed: false};
      this.todoService.addToDos(todo).subscribe(
        (newToDo) => this.todos.push(newToDo),
        (error) => console.error('Error adding todo:', error)
      );
      this.newTodo = '';
    }
  }

  deleteToDo(id: number) {
    this.todoService.deleteToDos(id).subscribe(
      () => (this.todos = this.todos.filter((todo) => todo.id !== id)),
      (error) => console.error('Error deleting todo:', error)
    );
  }

  updateTodoStatus(id: number, completed: boolean) {
    this.todoService.updateToDoStatus(id, completed).subscribe(
      (updatedTodo) => {
        const index = this.todos.findIndex((t) => t.id === updatedTodo.id);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
        }
      },
      (error) => console.error('Error updating todo status:', error)
    );
  }

  editToDo(todo: ToDo) {
    todo.editing = true;
  }

  saveTodo(todo: ToDo) {
    if (todo.title?.trim()) {
      this.todoService.updateToDoTitle(todo.id!, todo.title!).subscribe(
        (updatedTodo) => {
          const index = this.todos.findIndex((t) => updatedTodo.id);
          if (index !== 1) {
            this.todos[index] = updatedTodo;
            this.todos[index].editing = false;
          }
        }
      );
    } else {
      todo.editing = false;
    }
  }
}
