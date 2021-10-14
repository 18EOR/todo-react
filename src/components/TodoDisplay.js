import React from 'react';

function TodoDisplay(props) {
  const { todo, remove, addToCompleted } = props;

  return (
    <div className="todo-display">
      <div className="todo-text">{todo.text}</div>
      <div>
        <div
          title="Completed"
          className="btn-green"
          onClick={() => addToCompleted(todo)}
        >
          <i className="fas fa-check-circle"></i>
        </div>
        <div title="Delete" className="btn-red" onClick={() => remove(todo.id)}>
          <i className="fas fa-times-circle"></i>
        </div>
      </div>
    </div>
  );
}

export default TodoDisplay;
