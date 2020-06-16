import React from 'react'

export default function EditTodo({todoToEdit, projects, contexts, handleChange, formatDate, handleUpdateTodo}) {

	let keyIndex = 0;

	return (
			<div id="editTodo">
				<form onSubmit={handleUpdateTodo} >
					<input type="text" name="description" value={todoToEdit.description} onChange={handleChange} />
						<label htmlFor="priority_A"><input type="radio" name="priority" id="priority_A" value="A" checked={todoToEdit.priority==='A'} onChange={handleChange}  />A</label>
						<label htmlFor="priority_B"><input type="radio" name="priority" id="priority_B" value="B" checked={todoToEdit.priority==='B'} onChange={handleChange}  />B</label>
						<label htmlFor="priority_C"><input type="radio" name="priority" id="priority_C" value="C" checked={todoToEdit.priority==='C'} onChange={handleChange} />C</label>
					<label htmlFor="project">Choose a project:</label>
					<input onChange={handleChange} list="projects" id="project" name="project" value={todoToEdit.project} spellCheck="false" />
					
					<datalist id="projects" >
						{ projects.map( curr => {
							return ( <option key={curr.substring(0,3) + keyIndex++} value={curr} /> )
							})
						}
					</datalist>
					<label htmlFor="context">Choose a context:</label>
					<input onChange={handleChange} list="contexts" id="context" name="context" value={todoToEdit.context} spellCheck="false"/>
					
					<datalist id="contexts" >
						{ contexts.map( curr => {
							return ( <option key={curr.substring(0,3) + keyIndex++} value={curr} /> )
							})
						}
					</datalist>
					<label htmlFor="created">Created:</label>
						<input type="date" id="created" name="created" onChange={handleChange} value={ formatDate( todoToEdit.created ) } />
					<label htmlFor="due">Due</label>
						<input type="date" id="due" name="due" onChange={handleChange} value={ formatDate( todoToEdit.due ) } />
					<br />
					<input type="submit" value="Update" />
				</form>
			</div>
	)
}

