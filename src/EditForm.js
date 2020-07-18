import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

export default function EditTodo({todo,
																	projects,
																	contexts,
																	tags,
																	handleChange,
																	handleCustomTagChange,
																	formatDate,
																	handleUpdateTodo,
																	hideEditForm,
																	deleteTodo,
																	toggleShowProjectList,
																	projectListVisible,
																	toggleShowContextList,
																	contextListVisible,
																	setModalVisible,
																	modalVisible}) {

	function ProjectMenu() {
		if(projectListVisible) {
			return (
				<>
				<input onBlur={handleChange} list="projects" id="project" name="project" spellCheck="false" />
				
				<datalist id="projects" >
					{ projects.map( curr => {
							return todo.project.includes(curr) ? null : ( <option key={uuidv4()} value={curr} /> )
						})
					}
				</datalist>
				</>
			)
		} else {
			return null
		}
	}
	
	function ContextMenu() {
		if(contextListVisible) {
			return (
				<>
				<input onBlur={handleChange} list="contexts" id="context" name="context" spellCheck="false" />
				
				<datalist id="contexts" >
					{ contexts.map( curr => {
							return todo.context.includes(curr) ? null : ( <option key={uuidv4()} value={curr} /> )
						})
					}
				</datalist>
				</>
			)
		} else {
			return null
		}
	}


	const [customTagEdit, setCustomTagEdit] = useState({})
	
	function editCustomTag(indx) {
		setCustomTagEdit(todo.tags[indx])

		setModalVisible(true)
	}

	function updateTagEdit() {

	}
	// this is the one in branch: editform
	return (
		<div id="edit-todo">
			<form onSubmit={handleUpdateTodo} >
				<input type="text" name="description" value={todo.description} onChange={handleChange} />
				<fieldset>
					<legend>Priority</legend>
					<label htmlFor="priority_A"><input type="radio" name="priority" id="priority_A" value="A" checked={todo.priority==='A'} onChange={handleChange}  />A</label>
					<label htmlFor="priority_B"><input type="radio" name="priority" id="priority_B" value="B" checked={todo.priority==='B'} onChange={handleChange}  />B</label>
					<label htmlFor="priority_C"><input type="radio" name="priority" id="priority_C" value="C" checked={todo.priority==='C'} onChange={handleChange} />C</label>
					<label htmlFor="priority_"><input type="radio" name="priority" id="priority_" value="" checked={todo.priority===''} onChange={handleChange} />None</label>
				</fieldset>
				<fieldset>
					<legend>Projects</legend>
					<ul>
						{
							todo.project.map( project => {
								return (
									<li key={uuidv4()} ><label>
										<input type="checkbox" defaultChecked onChange={handleChange} data-tag="project" name={project} className="smallCheck"/>
											{project}
									</label></li>
								)
							})
						}
						<li>
							<button id="addProjectBtn" type="button" onClick={toggleShowProjectList}>+</button>
							<ProjectMenu />
						</li>
					</ul>
				</fieldset>
				<fieldset>
					<legend>Context:</legend>
					<ul>
						{
							todo.context.map( context => {
								return (
									<li key={uuidv4()} ><label><input type="checkbox" defaultChecked onChange={handleChange} data-tag="context" name={context} className="smallCheck"/>{context}</label></li>
								)
							})
						}
						<li>
							<button id="addContextBtn" type="button" onClick={toggleShowContextList}>+</button>
							<ContextMenu />
						</li>
					</ul>
				</fieldset>
				<fieldset id="edit-custom-tags">
					<legend>Custom tags</legend>
					{ modalVisible &&
						<div id="custom-tag-dialog">
							<label>Key: </label><input type="text" name="customTagKey" value={customTagEdit.key} onChange={updateTagEdit} />
							<label>Value: </label><input type="text" name="customTagValue" value={customTagEdit.value} onChange={updateTagEdit} /><br />
							<button id="addContextBtn" type="button" onClick={toggleShowContextList}>+</button>
						</div>
					}
					{ ( !modalVisible && todo.tags) &&
							<div id="custom-tag-list">
							{ todo.tags.map( (tag, indx) => {
								return (
								<div key={indx} onClick={() => editCustomTag(indx)}>{tag.key}:{tag.value}</div>
								)
							}) }
							</div>
					}
				</fieldset>
				<label htmlFor="created">Created:</label>
					<input type="date" id="created" name="created" onChange={handleChange} value={ formatDate( todo.created ) } />
				<label htmlFor="due">Due</label>
					<input type="date" id="due" name="due" onChange={handleChange} value={ formatDate( todo.due ) } />
				<br />
				<input onClick={hideEditForm} type="button" value="Close" />
				<input type="submit" value="Update" />
				<input onClick={deleteTodo} type="button" value="Delete" />
			</form>
		</div>
	)
}

