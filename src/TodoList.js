import React from 'react'
import Todo from './Todo'

export default function Todolist({todos, toggleCompleted, handleItemClick, editTodo, changePriority}) {
	return (
		todos.map( (todo, index) => {
			return <Todo key={index} todo={todo} toggleCompleted={toggleCompleted} editTodo={editTodo} changePriority={changePriority} />
		})
	)
}
