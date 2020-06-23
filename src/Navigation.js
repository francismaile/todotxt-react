import React from 'react'

export default function Navigation({filterTodos, projects, contexts}) {


	function NavMenu({menuName, list}) {
		return(
				
				<ul>{menuName.replace(/^\w/, (c) => c.toUpperCase())}
				{ list.map( listItem => {
						return (
							<li key={listItem} data-project-name={listItem}>{listItem}</li>
						)
					})
				}
				<li key={`no${menuName}`}>No {menuName}</li>
				</ul>
		)
	}

	return (
		<div id="navigation">
		<ul onClick={filterTodos}>
			<li>All</li>
			<li><NavMenu menuName='Project' list={projects}  /></li>
			<li><NavMenu menuName='Context' list={contexts}  /></li>
			<li><NavMenu menuName='Priority' list={['A', 'B', 'C']}  /></li>
			<li>Text</li>
		</ul>
		</div>
	)
}
