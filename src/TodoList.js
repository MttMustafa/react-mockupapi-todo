import React, { Component } from 'react'
import Todo from './Todo'

export default function TodoList({todoData, updateTodo, deleteTodo}) {
  return (
    todoData.map(todo => {
        return <Todo key={todo.id} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo}/>
    })
  )
}
