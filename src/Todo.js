import React from 'react'
import { v4 as uuidv4 } from 'uuid';

function MetaTags({tags}) {
	if( !tags ) return null;
	let metaTags = Array.from(tags)
	return (
		metaTags.map( tag => {
			return (
				<div key={uuidv4()} className="custom-tag">
					<span className="custom-tag-key">{tag.key}</span>
					<span className="custom-tag-value">{tag.value}</span>
				</div>
			)
		})
	)
}

export default function Todo ({todo, toggleCompleted, editTodo, changePriority}) {

	function handleItemClick(e) { // TODO move this to app.js
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
				<input type="checkbox" className="css-checkbox" defaultChecked={todo.completed} />
			</label>
				{todo.description}
			<div className="task-meta">
				{ todo.project.length !== 0 &&
					todo.project.map( project => {
						return (
							<div key={uuidv4()} className="project">+{ project }</div>
						)
					})
				}
				{ todo.context.length !== 0 && 
					todo.context.map( context => {
						return (
							<div key={uuidv4()} className="context">@{ context }</div>
						)
					})
				}
				{ todo.due && <div id="due" className="due"><span role="img" aria-label="calendar page">&#128198;</span>{ todo.due }</div> }
				<div className="custom-tags">
					<MetaTags tags={todo.tags} />
				</div>
			</div>
		</div>
	)
}
