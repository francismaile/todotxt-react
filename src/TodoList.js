import React from 'react'
import Todo from './Todo'

// TODO-done handle no project, context or priority
// TODO-done click menu title should list all alphabetically

/*
TODO-done shift all completed todos to the bottom and hide them
	create seperate list with completed todos
	render that list after the todo list
	seperate completed list for each sub-list?
*/

// {tag: "project", value: "No Project"}

export default function Todolist({filter, todos, toggleCompleted, handleItemClick, editTodo, changePriority}) {


	const [activeList, completedList] = todos.reduce( (list, todo) => {
			if(filter.tag !== 'all') {
				if(todo[filter.tag] === filter.value) { // list todos assigned to a particular project, context or priority
					list[0 + todo.completed].push(todo)
					return list
				} else if(filter.value === 'all') { // list all todos assigned to any project, context or priority
					if(todo[filter.tag] !== '') {
						list[0 + todo.completed].push(todo)
					}
					list[0].sort( (a, b) => {
						const [first, second] = [a[filter.tag], b[filter.tag]]
						if(first < second) return -1
						else if(first > second) return -1
						return 0
					})
					list[0].sort( (a, b) => {
						const [first, second] = [a[filter.tag], b[filter.tag]]
						if(first < second) return -1
						else if(first > second) return -1
						return 0
					})
					return list
				} else if(filter.value.split(' ')[0] === 'No') { // list all todos not assigned to a project, context or priority
					if(todo[filter.tag] === '') {
						list[0 + todo.completed].push(todo)
						return list
				} else {
					return list
				}
			} else if(filter.tag === 'all') {
					console.log('all') // why is this getting called
				list[0 + todo.completed].push(todo)
				return list
				} else {
					return list
				}
			} else {
					// console.log('end') // why is this getting called
				list[0 + todo.completed].push(todo)
				return list
			}
		}, [ [], [] ])
// const [activeList, completedList] = todoList.reduce( (list, todo) => {
// 	list[0 + todo.completed].push(todo)
// 	return list
// }, [ [], []] )
	

	return (
		[...activeList, ...completedList].map( (todo, index) => {
			return <Todo key={todo.id} todo={todo} toggleCompleted={toggleCompleted} editTodo={editTodo} changePriority={changePriority} />
		})
	)
}
