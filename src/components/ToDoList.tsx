import React, { useState, useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'todo-list';

const MAX_LENGTH = 100;

const ToDoList: React.FC = () => {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState<string[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed.length < 1 || trimmed.length > MAX_LENGTH) {
      setError('Task must be between 1 and 100 characters.');
      return;
    }
    setTodos([trimmed, ...todos]);
    setInput('');
    setError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (error) setError('');
  };

  const handleDelete = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleDeleteAll = () => {
    setTodos([]);
  };

  return (
    <div className="todo-list">
      <h2>Your tasks</h2>
      {todos.length > 0 && (
        <button 
          className="todo-list__delete-all-btn"
          onClick={handleDeleteAll}
        >
          Delete All
        </button>
      )}
      <form className="todo-list__form" onSubmit={handleAdd}>
        <input
          type="text"
          className="todo-list__input"
          placeholder="Input your task..."
          value={input}
          onChange={handleInputChange}
          maxLength={MAX_LENGTH + 1}
        />
        <button className="todo-list__add-btn" type="submit">Add</button>
      </form>
      <div className="todo-list__char-counter" style={{ color: input.length > MAX_LENGTH ? '#dc3545' : '#888' }}>
        {input.length} / {MAX_LENGTH}
      </div>
      {error && <div className="todo-list__error">{error}</div>}
      <div className="todo-list__items">
        {todos.length === 0 ? (
          <div className="todo-list__empty">No tasks</div>
        ) : (
          todos.map((todo, idx) => (
            <div className="todo-list__item" key={idx}>
              <span className="todo-list__text">{todo}</span>
              <button 
                className="todo-list__delete-btn"
                onClick={() => handleDelete(idx)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ToDoList; 