package com.example.demo.service;

import com.example.demo.entity.Todo;

import java.util.List;

public interface TodoService {
    List<Todo> getAllTodos();

    Todo saveTodos(Todo todo);

    void deleteTodos(Long id);

    Todo updateToDoStatus(Long id, Boolean isCompleted);

    Todo updatedToWithTitle(Long id, String title);
}
