import React from 'react'
import Todo from './Todo'


export default function Todolist({toggleShowCompleted, showCompleted, filter, todos, toggleCompleted, handleItemClick, editTodo, changePriority}) {
	console.clear()
	const [activeList, completedList] = [...todos].reduce( (list, todo) => {
			if(filter.tag !== 'all') {
				if(todo[filter.tag] === filter.value) { // list todos assigned to a particular project, context or priority
					list[0 + todo.completed].push(todo)
					return list
				} else if(filter.value === 'all') { // list all todos assigned to any project, context or priority
					if(todo[filter.tag] !== '') {
						list[0 + todo.completed].push(todo)
					}
					return list
				} else if(filter.value.split(' ')[0] === 'No') { // list all todos not assigned to a project, context or priority
					if(todo[filter.tag] === '') {
						list[0 + todo.completed].push(todo)
						return list
				} else {
					return list
				}
			} else if(filter.tag === 'all') {
				list[0 + todo.completed].push(todo)
				return list
				} else {
					return list
				}
			} else {
				list[0 + todo.completed].push(todo)
				return list
			}
		}, [ [], [] ])
	
	if(filter.tag !== 'all' && filter.value === 'all' ) {
		activeList.sort( (a, b) => {
			const [first, second] = [a[filter.tag].toLowerCase(), b[filter.tag].toLowerCase()]
			if(first < second) return -1
			else if(first > second) return 1
			return 0
		})
		completedList.sort( (a, b) => {
			const [first, second] = [a[filter.tag].toLowerCase(), b[filter.tag].toLowerCase()]
			if(first < second) return -1
			else if(first > second) return 1
			return 0
		})
	}

	/*
	track
		the tag we're tracking
		the current tag value
 */
	return (
		<>
			<div>
				{activeList.map( function(todo, index, todos) {
					const printHeader = (todo[filter.tag] !== undefined && (index < 1 || todos[index - 1][filter.tag] !== todo[filter.tag]) )
					return (
						<>
						{ printHeader && <div className="tag-header">{todo[filter.tag]}</div> }
						<Todo key={todo.id} todo={todo} toggleCompleted={toggleCompleted} editTodo={editTodo} changePriority={changePriority} />
						</>
					)
				})}
			</div>
			<div className="toggleShowCompleted" onClick={toggleShowCompleted}><span>{showCompleted ? 'Hide' : completedList.length } completed todos</span></div>
			<div>
				{showCompleted && completedList.map( (todo, index, todos) => {
					const printHeader = (todo[filter.tag] !== undefined && (index < 1 || todos[index - 1][filter.tag] !== todo[filter.tag]) )
					return (
						<>
						{ printHeader && <div className="tag-header">{todo[filter.tag]}</div> }
						<Todo key={todo.id} todo={todo} toggleCompleted={toggleCompleted} editTodo={editTodo} changePriority={changePriority} />
						</>
					)
				})}
			</div>
		</>
	)

}
