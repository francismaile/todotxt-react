import React from 'react'
import Todo from './Todo'

// TODO-done handle no project, context or priority
// TODO-done click menu title should list all alphabetically

export default function Todolist({filter, todos, toggleCompleted, handleItemClick, editTodo, changePriority}) {
	const todoList = (() => {
		if(filter.tag === 'all') {
			return [...todos]
		} else if(filter.which.substring(0, 3) === 'No ') {
			return todos.filter( todo => todo[filter.tag] === '')
		} else if(filter.which === 'all') {
			return todos.filter( todo => todo[filter.tag] !== '').sort( (a, b) => {
				if(a[filter.tag].toLowerCase() < b[filter.tag].toLowerCase()) {
					return -1
				} else if(a[filter.tag] > b[filter.tag]) {
					return 1
				} else {
					return 0
				}
			})
		} else {
			return todos.filter( todo => todo[filter.tag] === filter.which)
		}
	})()
	return (
		todoList.map( (todo, index) => {
			return <Todo key={todo.id} todo={todo} toggleCompleted={toggleCompleted} editTodo={editTodo} changePriority={changePriority} />
		})
	)
}
