import React from 'react'
import ImportTodoTxt from './ImportTodoTxt'

export default function Navigation({filterTodos, filter, projects, contexts, parseTodoTxt}) {

	function NavMenu({menuName, list}) {
		return(
				
				<ul><div>{menuName}</div>
				{ list && list.map( listItem => {
						return (
							<li key={listItem} data-project-name={listItem}>{listItem}</li>
						)
					})
				}
			{ list && <li key={`no${menuName}`}>No {menuName}</li> }
				</ul>
		)
	}

	return (
		<div id="navigation">
		<ul onClick={filterTodos}>
			<li><NavMenu menuName='All' /></li>
			<li><NavMenu menuName='Project' list={projects}  /></li>
			<li><NavMenu menuName='Context' list={contexts}  /></li>
			<li><NavMenu menuName='Priority' list={['A', 'B', 'C']}  /></li>
			<li>Text</li>
		</ul>
		<ImportTodoTxt parseTodoTxt={parseTodoTxt} />
		</div>
	)
}
