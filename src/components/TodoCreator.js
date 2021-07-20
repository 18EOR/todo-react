import React, { useState, useEffect } from "react";
import TodoDisplay from "./TodoDisplay";
import DisplayCompleted from "./DisplayCompleted";

function TodoCreator({displayActive}) {
  const localActiveTodo = JSON.parse(localStorage.getItem('active-todos')) || []
  const localCompletedTodo = JSON.parse(localStorage.getItem('completed-todos')) || []

  const [text, setText] = useState("");
  const [todos, setTodos] = useState(localActiveTodo)
  const [completedTodos, setCompletedTodos] = useState(localCompletedTodo)

  const monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"]

  useEffect(() => {
    localStorage.setItem('active-todos', JSON.stringify(todos))
    localStorage.setItem('completed-todos', JSON.stringify(completedTodos))
  }, [todos, completedTodos])

  const addTodo = (e) =>{
    if(text){
      const todo = {
        text:text,
        id: todos.length+''+text
      }
      setTodos([todo, ...todos])
      setText("")
    }
    e.preventDefault()
  }

  const removeTodo = (id) => {
    const newArr = []
    for(let i = 0; i < todos.length; i++){
      if(todos[i].id !== id){
        newArr.push(todos[i])
      }
    }
    setTodos(newArr)
  }

  const removeCompletedTodo = (id) => {
    const newArr = []
    for(let i = 0; i < completedTodos.length; i++){
      if(completedTodos[i].id !== id){
        newArr.push(completedTodos[i])
      }
    }
    setCompletedTodos(newArr)
  }

  const getMonth = monthNum => {
    return monthsOfYear[monthNum]
  }

  const removeSeconds = time =>{
    return time.substring(0, time.length-3)
  }

  const addToCompleted = (todo) => {
    const date = new Date()
    const compTodo = {
      id: todo.id,
      text: todo.text,
      compTime: `${getMonth(date.getMonth())} ${date.getDate()}  ${removeSeconds(date.toLocaleTimeString())}`
    }
    //Add todo to array of completed todos
    const newArr = [compTodo, ...completedTodos]
    setCompletedTodos(newArr)

    //Then remove todo from active todo array
    removeTodo(todo.id)
  }

  const returnToActive = (comptodo) =>{
    //remove todo from completed list
    const newArr = []
    for(let i = 0; i < completedTodos.length; i++){
      if(completedTodos[i].id !== comptodo.id){
        newArr.push(completedTodos[i])
      }
    }
    setCompletedTodos(newArr)

    //Add todo to active array list
    const activeTodo = {
      id: comptodo.id,
      text: comptodo.text
    }
    setTodos([activeTodo, ...todos])
  } 

  function TodoCreator(){
    return (
      <div className="todo-creator">
        <form onSubmit={addTodo}>
          <input type="text" value={text} onChange={(e) => {setText(e.target.value)}}/>
          <input type="submit"  value="Add Todo"/>
        </form>
        <div className="todo-display-wrapper">
          {
            todos.length > 0 ? todos.map(todo => <TodoDisplay key={todo.id} todo={todo} remove={removeTodo} addToCompleted={addToCompleted}/>) : <h3>You Have No Active Tasks</h3>
          }
        </div>
      </div>
    )
  }

  function DisplayCompletedTodos(){
    return(
      <div className="completed-display-wrapper">
        {
          completedTodos.length > 0 ? completedTodos.map(todo => <DisplayCompleted key={todo.id} todo={todo} returnToActive={returnToActive} removeCompleted={removeCompletedTodo} />) : <h3>You Have No Completed Tasks</h3>
        }
      </div>
    )
  }

  return displayActive ? TodoCreator() : DisplayCompletedTodos()
}

export default TodoCreator;
