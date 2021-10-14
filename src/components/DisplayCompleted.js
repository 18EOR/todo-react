import React from 'react';

function DisplayCompleted(props) {
  const { todo, returnToActive, removeCompleted } = props;

  return (
    <div className="todo-display">
      <div>{todo.text}</div>
      <div className="comp-display-end">
        <div className="comp-date">{todo.compTime}</div>
        <div
          title="Restore"
          onClick={() => returnToActive(todo)}
          className="btn-blue"
        >
          <i className="fas fa-undo-alt"></i>
        </div>
        <div
          title="Delete"
          className="btn-red"
          onClick={() => removeCompleted(todo.id)}
        >
          <i className="fas fa-times-circle"></i>
        </div>
      </div>
    </div>
  );
}

export default DisplayCompleted;
