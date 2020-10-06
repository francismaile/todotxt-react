import React from 'react'
import Todo from './Todo'

/*
 sort todos by completed and not
 sort todos into categories by project, context or priority. todos can belong to more than one project or context
 display the list by project, context or priorty
*/
export default function Todolist({toggleShowCompleted, showCompleted, filter, todos, toggleCompleted, handleItemClick, editTodo, changePriority, setShowProjectList, setShowContextList}) {

	const [activeList, completedList] = [...todos].reduce( (list, todo) => {
		if(filter.value === 'all') { // show all todos...
			if(filter.tag === 'priority') { // ...assigned any priority
				if(todo.priority !== '') {
					list[0 + todo.completed].push(todo)
					return list
				} else return list
			} else if(filter.tag === 'project' || filter.tag === 'context') { //...assigned to any project or context

				if( todo[filter.tag].length !== 0 && todo[filter.tag].every( tag => (tag !== '') ) ) {
					list[0 + todo.completed].push(todo)
					return list
				} else return list
			} else { // show all todos
					list[0 + todo.completed].push(todo)
					return list
			}
		} else if(filter.value.split(' ')[0] === 'No') { // show todos not assigned...
			if(filter.tag === 'priority') { // ...a priority
				if(todo.priority === '') {
					list[0 + todo.completed].push(todo)
					return list
				} else return list
			} else if(filter.tag === 'project' || filter.tag === 'context' ) { // ...to a project or context
				if( todo[filter.tag].length === 0 || todo[filter.tag].every( tag => (tag === '') ) ) {
					list[0 + todo.completed].push(todo)
					return list
				} else return list
			}
		} else {
			if(filter.tag === 'priority') { // show todos assigned...
				if(todo.priority === filter.value) { // ...a particular priority
					list[0 + todo.completed].push(todo)
					return list
				} else return list
			} else if(filter.tag === 'project' || filter.tag === 'context' ) { // ...to a particular project or context
				if(todo[filter.tag].some( tag => tag === filter.value ) ) {
					list[0 + todo.completed].push(todo)
					return list
				} else return list
			}
		}
		return list
	}, [ [], [] ])

	/*
	if(filter.tag !== 'all' && filter.value.split(' ')[0] !== 'No') {
		activeList.sort( (a, b) => {
			const [first, second] = [a[filter.tag][0].toLowerCase(), b[filter.tag][0].toLowerCase()]
			if(first < second) return -1
			else if(first > second) return 1
			return 0
		})
		completedList.sort( (a, b) => {
			const [first, second] = [a[filter.tag][0].toLowerCase(), b[filter.tag][0].toLowerCase()]
			if(first < second) return -1
			else if(first > second) return 1
			return 0
		})
	}
	*/

	function groupBy(activeList, filterTag) {
		return activeList.reduce( (acc, cur) => {
			cur[filterTag].forEach( key =>{
				(acc[key] = acc[key] || []).push(cur)
			})
			return acc
		}, {})
	}

// 	if( (filter.tag === 'project' || filter.tag === 'project') && filter.tag !== 'all' ) {
// 		Object.entries(groupBy(activeList, filter.tag)).forEach( item => {
// 			console.log('Header:', item[0])
// 			item[1].forEach( todo => {
// 				console.log(todo)
// 			})
// 		})
// 	}
	
	return (
		<div id="todos">
			<div>
				{
				(() => {
					if( (filter.tag === 'project' || filter.tag === 'context') && filter.tag !== 'all' ) {
						return Object.entries(groupBy(activeList, filter.tag)).map( item => {
							return (
								<>
								<div className="tag-header">{item[0]}</div>
								{ item[1].map( todo => {
									return (
									<Todo key={todo.id} todo={todo} toggleCompleted={toggleCompleted} editTodo={editTodo} changePriority={changePriority} 
										setShowProjectList={setShowProjectList}
										setShowContextList={setShowContextList}
									/>
									)
									})
								}
								</>
							)
						})
					} else {
							return activeList.map( function(todo, index, todos) {
								const printHeader = (todo[filter.tag] !== undefined && (index < 1 || todos[index - 1][filter.tag][0] !== todo[filter.tag][0]) )
								return (
									<React.Fragment key={todo.id + 'fragment'}>
								{ printHeader && <div className="tag-header">{todo[filter.tag].join(' & ')}</div> }
									<Todo key={todo.id} todo={todo} toggleCompleted={toggleCompleted} editTodo={editTodo} changePriority={changePriority} 
										setShowProjectList={setShowProjectList}
										setShowContextList={setShowContextList}
									/>
									</React.Fragment>
								)
							})
					}
				})()
				}
			</div>
			<div className="toggleShowCompleted" onClick={toggleShowCompleted}><span>{showCompleted ? 'Hide' : completedList.length} completed todo{completedList.length === 1 ? '' : 's'}</span></div>
			<div>
				{showCompleted && completedList.map( (todo, index, todos) => {
					const printHeader = (todo[filter.tag] !== undefined && (index < 1 || todos[index - 1][filter.tag][0] !== todo[filter.tag][0]) )
					return (
						<React.Fragment key={todo.id + 'fragment'}>
						{ printHeader && <div className="tag-header">{todo[filter.tag]}</div> }
						<Todo
							key={todo.id}
							todo={todo}
							toggleCompleted={toggleCompleted}
							editTodo={editTodo}
							changePriority={changePriority}
							setShowProjectList={setShowProjectList}
							setShowContextList={setShowContextList}
						/>
						</React.Fragment>
					)
				})}
			</div>
		</div>
	)

}

