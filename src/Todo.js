import React from 'react'
import { v4 as uuidv4 } from 'uuid';

function MetaTags({tags}) {
	if( !tags ) return null;
	let metaTags = Array.from(tags)
	// console.log("tags:", metaTags)
	return (
		metaTags.map( tag => {
			// const [key, value] = Object.values(tag)
			// console.log({uniqueKey}, {key}, {value})
			return (
				<div key={uuidv4()} className="custom-tag">
					<span className="custom-tag-key">{tag.key}</span>
					<span className="custom-tag-value">{tag.value}</span>
				</div>
			)
		})
	)
}

// TODO
// only if due date, produce due date component
// only if custom tags, produce custom tags
// only if completed, produce completed component

export default function Todo ({todo, toggleCompleted, editTodo, changePriority}) {

	function handleItemClick(e) {
		if( e.target.type  === 'checkbox' ) {
			toggleCompleted(todo.id)
		} else if(e.target.id === 'priority') {
			changePriority(e.target.dataset.priority,todo.id )
		} else {
			editTodo(todo)
		}
	}

	return (
		<div className="todoItem" onClick={handleItemClick} >
				<div className={'priority priority' + (todo.priority ? '_set' : '')} id='priority' data-priority={todo.priority}>{todo.priority}</div>
			<label className="css-label">
				<input type="checkbox" className="css-checkbox" checked={todo.completed} readOnly/>
			</label>
				{todo.description}
			<div className="task-meta">
				{ todo.project && <div id="project" className="project">+{ todo.project }</div> }
				{ todo.context && <div id="context" className="context">@{ todo.context }</div> }
				{ todo.due && <div id="due" className="due"><span role="img" aria-label="calendar page">&#128198;</span>{ todo.due }</div> }
				<div className="custom-tags">
					<MetaTags tags={todo.tags} />
				</div>
			</div>
		</div>
	)
}
