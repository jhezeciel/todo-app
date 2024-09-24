import React, { useState } from 'react';
import './todo.css';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim() === '' || dueDate.trim() === '') return;
    setTodos([...todos, { text: newTodo, isComplete: false, isEditing: false, dueDate }]);
    setNewTodo('');
    setDueDate('');
  };

  const handleCompleteTodo = (index) => {
    const updatedTodos = todos.map((todo, idx) =>
      idx === index ? { ...todo, isComplete: !todo.isComplete } : todo
    );
    setTodos(updatedTodos);
  };

  const handleEditTodo = (index) => {
    const updatedTodos = todos.map((todo, idx) =>
      idx === index ? { ...todo, isEditing: true } : todo
    );
    setTodos(updatedTodos);
  };

  const handleSaveTodo = (index, text) => {
    const updatedTodos = todos.map((todo, idx) =>
      idx === index ? { ...todo, text, isEditing: false } : todo
    );
    setTodos(updatedTodos);
  };

  const handleRemoveTodo = (index) => {
    const updatedTodos = todos.filter((_, idx) => idx !== index);
    setTodos(updatedTodos);
  };

  const handleUpdateText = (index, newText) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo, idx) =>
        idx === index ? { ...todo, text: newText } : todo
      );
      return updatedTodos;
    });
  };

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <div className="todo-input">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <TodoList
        todos={todos}
        onComplete={handleCompleteTodo}
        onEdit={handleEditTodo}
        onSave={handleSaveTodo}
        onRemove={handleRemoveTodo}
        onUpdateText={handleUpdateText}
      />
    </div>
  );
};

const TodoList = ({ todos, onComplete, onEdit, onSave, onRemove, onUpdateText }) => {
  if (todos.length === 0) {
    return <p>No todos available.  Add a todo to get started!</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo, index) => (
        <li key={index} className={`todo-item ${todo.isComplete ? 'complete' : ''}`}>
          <div className="todo-content">
            <input
              type="checkbox"
              checked={todo.isComplete}
              onChange={() => onComplete(index)}
              disabled={todo.isEditing}
            />
            {todo.isEditing ? (
              <textarea
                defaultValue={todo.text}
                onChange={(e) => {
                  const newText = e.target.value;
                  onUpdateText(index, newText);
                }}
              />
            ) : (
              <span className="todo-text">{todo.text}</span>
            )}
            <span className="todo-due-date">Due: {todo.dueDate}</span>
          </div>
          <div className="actions">
            {!todo.isComplete && !todo.isEditing && (
              <>
                <button onClick={() => onEdit(index)} disabled={todo.isComplete}>
                  Edit
                </button>
                <button onClick={() => onRemove(index)} disabled={todo.isComplete}>
                  Remove
                </button>
              </>
            )}
            {todo.isEditing && (
              <button onClick={() => onSave(index, todo.text)}>OK</button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoApp;