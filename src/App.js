import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Todolist from './TodoList'
import Navigation from './Navigation'
import EditForm from './EditForm'

const LOCAL_TODOS = 'todoapp.todos'

// keep track of project names
// keep track of context names

function App() {
	const [todos, setTodos] = useState([])
		// TODO created and due are optional
	const [todoToEdit, setTodoToEdit] = useState({
		description: '',
		priority: '',
		completed: false,
		project: '',
		context: '',
		created: new Date(),
		due: 0
	})
	const todoDescrRef = useRef()
	const [projects, setProjects] = useState([])
	const [contexts, setContexts] = useState([])

	useEffect( () => {
		const storedTodos = JSON.parse(localStorage.getItem(LOCAL_TODOS))
		if(storedTodos) {
			setTodos(storedTodos)
		}
	},[])

	useEffect( () => {
		localStorage.setItem(LOCAL_TODOS, JSON.stringify(todos))
	}, [todos])

	function toggleCompleted(id) {
		let tasks = [...todos]
		const task = tasks.find( task => task.id === id )
		task.completed = !task.completed
		setTodos(tasks)
	}

	function handleAddTodo(e) {
		const description = todoDescrRef.current.value
		if( description === '') return
		// parse input in todo.txtformat
		// TODO created and due are optional
		setTodos(prevTodos => {
			return [...prevTodos,
				{
					priority: 'A',
					completed: false,
					description: description,
					id: todos.length,
					project: 'test 3',
					context: 'somewhere',
					created: new Date(2020,4,8),
					due: 0
				}
			]
		})
		todoDescrRef.current.value = null
	}

	function updateProjectList() {
		const projectList = todos.reduce( (acc, cur) => {
			if(cur.project && ! acc.includes(cur.project)) {
				acc.push(cur.project)
				return acc
			} else {
				return acc
			}
		}, [] )
		setProjects(projectList)
	}

	function updateContextList() {
		const contextList = todos.reduce( (acc, curr) => {
			if(curr.context && !acc.includes(curr.context) ) {
				acc.push(curr.context)
				return acc
			} else {
				return acc
			}
		}, [] )
		setContexts(contextList)
	}

	function editTodo(todo) {
		setTodoToEdit(todo)
		updateProjectList()
		updateContextList()
	}

	function NewTodo({todoDescrRef, handleAddTodo}) {
		return(
			<form>
				<input ref={todoDescrRef} type="text" size="150"/>
				<button onClick={handleAddTodo} >Add Todo</button>
			</form>
		)
	}
	
	/*
	 logic for EditForm
	*/

	function handleChange(e) {
		setTodoToEdit({
			...todoToEdit,
			[e.target.name]: e.target.value
		})
	}
	
	function formatDate(theDate) {
		if(!theDate) return 0
		theDate = typeof theDate === "string" ? new Date(theDate) : theDate
		const options = {year:'numeric',month:'2-digit',day:'2-digit'}
		const  [mm, dd, yyyy ] = theDate.toLocaleDateString('en-US', options).split('/')
		return `${yyyy}-${mm}-${dd}`
	}

	function handleSubmit(e) {
		e.preventDefault()
		console.log(todoToEdit)
		const todoIndex = todos.findIndex( todo => todo.id === todoToEdit.id )
		console.log(todoIndex)
	}

	/* end EditForm */

	return (
		<div className="App">
			<Navigation tempContent={"Navigation"}/>
			<div id="todo-list">
				<NewTodo todoDescrRef={todoDescrRef} handleAddTodo={handleAddTodo} />
				<Todolist todos={todos} toggleCompleted={toggleCompleted} editTodo={editTodo} />
			</div>
			<EditForm todoToEdit={todoToEdit} projects={projects} contexts={contexts} handleChange={handleChange} formatDate={formatDate} handleSubmit={handleSubmit}/>
		</div>
	);
}

export default App;

