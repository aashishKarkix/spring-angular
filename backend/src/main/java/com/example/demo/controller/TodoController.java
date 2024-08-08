package com.example.demo.controller;

import com.example.demo.entity.Todo;
import com.example.demo.service.TodoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public List<Todo> getTodos() {
        return todoService.getAllTodos();
    }

    @PostMapping
    public Todo createTodo(@RequestBody Todo todo) {
        return todoService.saveTodos(todo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodoStatus(@PathVariable Long id, @RequestBody Map<String, Boolean> request) {
        Boolean completed = request.get("completed");
        if (completed == null) {
            return ResponseEntity.badRequest().build();
        }
        Todo updatedTodo = todoService.updateToDoStatus(id, completed);
        return ResponseEntity.ok(updatedTodo);
    }

    @PutMapping("/updateTitle/{id}")
    public ResponseEntity<Todo> updateTitle(@PathVariable Long id, @RequestBody Map<String, String> request) {
        String title = request.get("title");
        if (title == null || title.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        Todo updatedTodo = todoService.updatedToWithTitle(id, title);
        return ResponseEntity.ok(updatedTodo);
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        todoService.deleteTodos(id);
    }
}
