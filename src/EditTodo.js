import React from 'react'

export default function EditTodo({todo, projects, contexts}) {

	function ProjectSelect({projects}) {
		let keyIndex = 0
		return (
			<label htmlFor="project">
				<select id="project">
					{ projects.map( curr =>
							<option key={curr.substring(0,3) + keyIndex++}>{curr}</option>
					) }
				</select>
			</label>
		)
	}

	function ContextSelect({contexts}) {
		let keyIndex = 0
		return (
			<label htmlFor="context">
				<select id="context">
					{ contexts.map( curr => {
						return ( <option key={curr.substring(0,3) + keyIndex++}>{curr}</option> )
					}
					) }
				</select>
			</label>
		)
	}

	return (
		<div id="edit-form">
			<form>
				<input type="text" value={todo.description} />
						<ProjectSelect projects={projects}/>
						<ContextSelect contexts={contexts}/>
				<label htmlFor="created">
					<input type="date" id="created" />
				</label>
				<label htmlFor="due">
					<input type="date" id="due" />
				</label>
			</form>
		</div>
	)
}

/*
insert project list into project select
insert context list into context select
*/
