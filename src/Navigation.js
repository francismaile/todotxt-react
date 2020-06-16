import React from 'react'

export default function Navigation({tempContent, projects, contexts}) {

	function showTodos(e) {
		console.log(e.target)
	}

	// console.log({projects}, {contexts})
	function navMenu(category) {
	}

	return (
		<div id="navigation">
		{tempContent}
		<ul onClick={showTodos}>
			<li>All</li>
			<li>Project</li>
			<li>Context</li>
			<li>Priority</li>
			<li>Text</li>
		</ul>
		</div>
	)
}
