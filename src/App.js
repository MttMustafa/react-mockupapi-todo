import TodoList from './TodoList'
import React, { useState, useRef, useEffect } from "react";
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [username, setUsername] = useState([])
  const addTodoContent = useRef()
  const newUserVal = useRef()

  async function refreshTodos() {
    fetch('https://63231e00a624bced30878ff8.mockapi.io/todos', {
      method: 'GET',
      headers: {
          'Content-type': 'application/json'
      }
    })
    .then(resolve => resolve.json())
    .then(result => {setTodos(result)})  
  }


  async function updateTodo(id, content, isCompleted) {
    const todosCopy = [...todos]
    const todo  = todosCopy.find(todo => todo.id === id)
    todo.isCompleted = isCompleted
    setTodos(todosCopy)
    fetch('https://63231e00a624bced30878ff8.mockapi.io/todos/' + id, {
      method: 'PUT',
      headers: {
          'Content-type': 'application/json'
      },
      body: JSON.stringify({
        content: content,
        isCompleted: isCompleted
      })
    })
  }

  async function deleteTodo(id) {
    let todosCopy = [...todos]
    todosCopy.splice(todosCopy.map(todo => todo.id).indexOf(id),1)
    setTodos(todosCopy)
 
    fetch('https://63231e00a624bced30878ff8.mockapi.io/todos/' + id, {
      method: 'DELETE'
    })
  }

  async function addTodo() {
    const contentVal = addTodoContent.current.value
    if ((contentVal === '') || (contentVal.length < 3)) return
    addTodoContent.current.value = null
    
    let maxID = 0;
    todos.forEach(elem => {
      if(parseInt(elem.id) > parseInt(maxID)) maxID = elem.id
    })
    const id = (parseInt(maxID) + 1).toString()

    setTodos(prevTodos => {
      return [...prevTodos, {content: contentVal, isCompleted: false, id}]
    })

    fetch('https://63231e00a624bced30878ff8.mockapi.io/todos/', {
      method: 'POST',
      headers: {
          'Content-type': 'application/json'
      },
      body: JSON.stringify({
        content: contentVal,
        isCompleted: false
      })
    })

    // refreshTodos()
  }

  function newUser() {
    const usernameVal = newUserVal.current.value
    if (usernameVal === '') return
    newUserVal.current.value = null

    setUsername(usernameVal)

    localStorage.setItem("username", JSON.stringify(usernameVal))
  }
  
  useEffect(() => {
    refreshTodos()
    const storedUsername = JSON.parse(localStorage.getItem("username"))
    if(storedUsername) setUsername(storedUsername) 
  }, [])

  return (
    <>
      <div id='app-ctn'>
        <div id='control-ctn'>
          <div>User: {username}</div>
          <div>
            <input ref={newUserVal} placeholder='Username' type='text'></input>
            <button onClick={newUser}>New User</button>
          </div>
          <div>
            <textarea id='content-input' placeholder='Enter Todo' ref={addTodoContent}></textarea>
            <button onClick={addTodo}>Add Todo</button>
          </div>
          <p>To update a todo content double click on the task text, Type the replacing text and press enter.</p>
        </div>
        <div id='todo-list-wrp'>
          <TodoList todoData={todos} updateTodo={updateTodo} deleteTodo={deleteTodo}/>
        </div>
      </div>
    </>
  );
}

export default App;