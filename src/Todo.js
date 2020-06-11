import React from 'react'

function MetaTags({tags}) {
	if( !tags ) return null;
	let metaTags = Array.from(tags)
	// move due date to the front of the list
	const dueIndex = metaTags.findIndex( element =>  Object.keys(element)[0] === 'due' )
	metaTags.push(...metaTags.splice(0, dueIndex))
	let uniqueKey = 0;
	return (
		metaTags.map( tag => {
			const [key, value] = [Object.keys(tag)[0], tag[Object.keys(tag)[0]]]
			return (
				<div key={uniqueKey++} className="custom-tag">
					<span className="custom-tag-key">{key}</span>
					<span className="custom-tag-value">{value}</span>
				</div>
			)
		})
	)
}

// TODO
// only if due date, produce due date component
// only if custom tags, produce custom tags
// only if completed, produce completed component

export default function Todo ({todo, toggleCompleted, editTodo}) {

	function handleCheckBoxClick() {
		toggleCompleted(todo.id)
	}

	function handleItemClick(e) {
		if( e.target.type  === 'checkbox' ) {
			console.log("check")
			toggleCompleted(todo.id)
		} else {
			editTodo(todo)
		}
		console.log('target:', e.target, 'todo id:', todo.id)
	}

	return (
		<div className="todoItem" onClick={handleItemClick} >
				<div className="priority {'priority' + todo.priority}" >{todo.priority}</div>
			<label className="css-label">
				<input type="checkbox" className="css-checkbox" checked={todo.completed} />
			</label>
				{todo.description}
			<div className="task-meta">
				<div id="project" className="project">{todo.project ? '+' + todo.project : ''}</div>
				<div id="context" className="context">{todo.context ? '@' + todo.context : ''}</div>
				<div className="custom-tags">
					<MetaTags tags={todo.tags} />
				</div>
			</div>
		</div>
	)
}
