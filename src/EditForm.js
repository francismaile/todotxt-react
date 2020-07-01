import React from 'react'
import { v4 as uuidv4 } from 'uuid';

export default function EditTodo({todoToEdit, projects, contexts, handleChange, handleCustomTagChange, formatDate, handleUpdateTodo, hideEditForm, deleteTodo}) {

	// TODO add "none" option for priorities
	// TODO-done edit custom tags


	return (
			<div id="editTodo">
				<form onSubmit={handleUpdateTodo} >
					<input type="text" name="description" value={todoToEdit.description} onChange={handleChange} />
					<fieldset>
						<legend>Priority</legend>
						<label htmlFor="priority_A"><input type="radio" name="priority" id="priority_A" value="A" checked={todoToEdit.priority==='A'} onChange={handleChange}  />A</label>
						<label htmlFor="priority_B"><input type="radio" name="priority" id="priority_B" value="B" checked={todoToEdit.priority==='B'} onChange={handleChange}  />B</label>
						<label htmlFor="priority_C"><input type="radio" name="priority" id="priority_C" value="C" checked={todoToEdit.priority==='C'} onChange={handleChange} />C</label>
						<label htmlFor="priority_"><input type="radio" name="priority" id="priority_" value="" checked={todoToEdit.priority===''} onChange={handleChange} />None</label>
					</fieldset>
					<fieldset>
						<legend>Tags</legend>
						<label htmlFor="project">Choose a project:</label>
						<input onChange={handleChange} list="projects" id="project" name="project" value={todoToEdit.project} spellCheck="false" />
						
						<datalist id="projects" >
							{ projects.map( curr => {
								return ( <option key={uuidv4()} value={curr} /> )
								})
							}
						</datalist>
						<label htmlFor="context">Choose a context:</label>
						<input onChange={handleChange} list="contexts" id="context" name="context" value={todoToEdit.context} spellCheck="false"/>
						
						<datalist id="contexts" >
							{ contexts.map( curr => {
								return ( <option key={uuidv4()} value={curr} /> )
								})
							}
						</datalist>
					{ todoToEdit.tags &&
						<fieldset>
							<legend>Custom tags</legend>
								<table>
									<tbody>
										<tr>
											<th>Key</th>
											<th>Value</th>
										</tr>
									{ todoToEdit.tags.map( (tag, indx) => {
										return (
											<tr key={`tag${indx}`}>
												<td><input value={tag.key} id={`key_${tag.id}`} name="key" onChange={handleCustomTagChange} /></td>
												<td><input value={tag.value} id={`value_${tag.id}`} name="value" onChange={handleCustomTagChange} /></td>
											</tr>
										)
									})}
									</tbody>
								</table>
						</fieldset>
					}
					</fieldset>
					<label htmlFor="created">Created:</label>
						<input type="date" id="created" name="created" onChange={handleChange} value={ formatDate( todoToEdit.created ) } />
					<label htmlFor="due">Due</label>
						<input type="date" id="due" name="due" onChange={handleChange} value={ formatDate( todoToEdit.due ) } />
					<br />
					<input onClick={hideEditForm} type="button" value="Close" />
					<input type="submit" value="Update" />
					<input onClick={deleteTodo} type="button" value="Delete" />
				</form>
			</div>
	)
}

