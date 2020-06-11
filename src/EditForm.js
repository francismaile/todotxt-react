import React, { useState } from 'react'

export default function EditTodo({todoToEdit, projects, contexts}) {

	const [todo, setTodo] = useState({ ...todoToEdit })
	
	console.log('todo:', todo)
	console.log('todo to edit :', todoToEdit)

	function formatDate(theDate) {
		if(!theDate) return 0
		theDate = typeof theDate === "string" ? new Date(theDate) : theDate
		const options = {year:'numeric',month:'2-digit',day:'2-digit'}
		const  [mm, dd, yyyy ] = theDate.toLocaleDateString('en-US', options).split('/')
		return `${yyyy}-${mm}-${dd}`
	}


	function handleChange(e) {
		console.log(e.target.name)
		console.log(e.target.value)
		setTodo({
			...todoToEdit,
			[e.target.name]: e.target.value
		})
	}
	

// TODO


	let keyIndex = 0;

	return (
			<div id="editTodo">
				<form onChange={handleChange}>
					<input type="text" name="description" value={todoToEdit.description} onChange={handleChange} />
					<label htmlFor="project">Choose a project:</label>
					<input onChange={handleChange} list="projects" id="project" name="project" value={todoToEdit.project} />
					
					<datalist id="projects" >
						{ projects.map( curr => {
							return ( <option key={curr.substring(0,3) + keyIndex++} value={curr} /> )
							})
						}
					</datalist>
					<label htmlFor="context">Choose a context:</label>
					<input onChange={handleChange} list="contexts" id="context" name="context" value={todoToEdit.context} />
					
					<datalist id="contexts" >
						{ contexts.map( curr => {
							return ( <option key={curr.substring(0,3) + keyIndex++} value={curr} /> )
							})
						}
					</datalist>
					<label htmlFor="created">Created:</label>
						<input type="date" id="created" name="created" onChange={handleChange} value={ formatDate( todoToEdit.created ) } />
					<label htmlFor="due">Due</label>
						<input type="date" id="due" name="due" onChange={handleChange} value={''} />
				</form>
			</div>
	)
}

/*
insert project list into project select
insert context list into context select
*/
