import React from 'react'

export default function EditTodo({todo, projects, contexts}) {


	function Select({id, labelText, options}) {
		let keyIndex = 0
		return (
			<label htmlFor={id}>{labelText}:&nbsp;
				<select id={id}>
					{ options.map( curr => {
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
				<Select id='project' labelText='Project' options={projects}/>
				<Select id='context' labelText='Context' options={contexts} />
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
