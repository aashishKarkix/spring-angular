package com.example.demo.service.impl;

import com.example.demo.entity.Todo;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repo.TodoRepository;
import com.example.demo.service.TodoService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoServiceImpl implements TodoService {
    private final TodoRepository todoRepository;

    public TodoServiceImpl(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @Override
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    @Override
    public Todo saveTodos(Todo todo) {
        return todoRepository.save(todo);
    }

    @Override
    public void deleteTodos(Long id) {
        todoRepository.deleteById(id);
    }

    @Override
    public Todo updateToDoStatus(Long id, Boolean completed) {
        return todoRepository
                .findById(id)
                .map(todo -> {
                    todo.setCompleted(completed);
                    return todoRepository.save(todo);
                }).orElseThrow(() -> new ResourceNotFoundException("Todo not found with id " + id));
    }

    @Override
    public Todo updatedToWithTitle(Long id, String title) {
        return todoRepository.findById(id)
                .map(todo -> {
                    todo.setTitle(title);
                    return todoRepository.save(todo);
                }).orElseThrow(() -> new ResourceNotFoundException("Todo not found " + id));
    }
}
