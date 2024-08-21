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
    this.todoService.getToDos().subscribe({
      next: (todos) => (this.todos = todos),
      error: (error) => {
        console.error('Error fetching todos:', error)
      }
    });
  }

  addToDo() {
    if (this.newTodo.trim()) {
      const todo: ToDo = {title: this.newTodo, completed: false};
      this.todoService.addToDos(todo).subscribe({
        next: (newToDo) => this.todos.push(newToDo),
        error: (error) => console.error('Error adding todo:', error)
      });
      this.newTodo = '';
    }
  }

  deleteToDo(id: number) {
    this.todoService.deleteToDos(id).subscribe({
      next: () => (this.todos = this.todos.filter((todo) => todo.id !== id)),
      error: (error) => {
        console.error('Error deleting todo:', error)
      },
      complete: () => {
        console.log("Todo Deleted Successfully")
      }
    });
  }

  updateTodoStatus(id: number, completed: boolean) {
    this.todoService.updateToDoStatus(id, completed).subscribe({
      next: (updatedTodo) => {
        const index = this.todos.findIndex((t) => t.id === updatedTodo.id);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
        }
      },
      error: (error) => {
        console.error('Error updating todo status:', error)
      },
      complete: () => {
        console.log("Todo updated successFully");
      }
    });
  }

  editToDo(todo: ToDo) {
    todo.editing = true;
  }

  saveTodo(todo: ToDo) {
    if (todo.title?.trim()) {
      this.todoService.updateToDoTitle(todo.id!, todo.title!).subscribe({
        next: (updatedTodo) => {
          const index = this.todos.findIndex((t) => updatedTodo.id);
          if (index !== 1) {
            this.todos[index] = updatedTodo;
            this.todos[index].editing = false;
          }
        },
        error: (error) => {
          console.log("Error While Save Todo", error);
        },
        complete: () => {
          console.log("Save Todo Completed");
        }
      });
    } else {
      todo.editing = false;
    }
  }
}
