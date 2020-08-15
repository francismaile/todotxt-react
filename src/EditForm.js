import React, { useState } from 'react'
// import React, { useState, useEffect } from 'react'
import CustomTags from './CustomTags'
import { v4 as uuidv4 } from 'uuid';

export default function EditTodo({todo,
																	setTodoToEdit,
																	projects,
																	contexts,
																	tags,
																	handleCustomTagChange,
																	handleUpdateTodo,
																	hideEditForm,
																	deleteTodo,
																	hilitedCustomTag,
																	setHilitedTag,
																	modalVisible,
																	setModalVisible }) {

	const [projectListVisible, setShowProjectList] = useState(false)
	const [contextListVisible, setShowContextList] = useState(false)
	
	function toggleShowProjectList() {
		setShowProjectList(!projectListVisible)
	}
	
	function toggleShowContextList() {
		setShowContextList(!contextListVisible)
	}
	
// 	useEffect( () => {
// 		setShowProjectList(false)
// 	}, [])

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
	
	function handleChange(e) {
		let newValue
		if(e.target.dataset.tag === 'project' || e.target.dataset.tag === 'context') {
			if(e.target.checked === false) {
				todo[e.target.dataset.tag].splice(todo[e.target.dataset.tag].indexOf(e.target.name), 1)
			}
		} else if(e.target.name === 'project' || e.target.name === 'context') {
			setShowProjectList(false)
			setShowContextList(false)
			if(! todo[e.target.name].includes( (newValue = e.target.value.replace(/\s/g,'') ) ) ) {
				if(newValue === '') return;
				setTodoToEdit({
					...todo,
					[e.target.name]: [...todo[e.target.name], newValue]
				})
			}
			e.target.value = ''
		} else {
			setTodoToEdit({
				...todo,
				[e.target.name]: e.target.value
			})
		}
	}
	
	// this is the one in branch: editform
	
	function formatDate(theDate) {
		if(!theDate) return ''
		theDate = typeof theDate === "string" ? new Date(theDate) : theDate
		return theDate.toISOString().split('T')[0]
	}


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
					<CustomTags modalVisible={modalVisible} setModalVisible={setModalVisible} hilitedCustomTag={hilitedCustomTag} setHilitedTag={setHilitedTag} todo={todo} handleChange={handleChange} />
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

