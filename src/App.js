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
	const [editFormVisible, setEditFormVisible] = useState(false)
	const [todoToEdit, setTodoToEdit] = useState({
		description: '',
		priority: '',
		completed: false,
		project: '',
		context: '',
		created: new Date(),
		due: ''
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
					due: ''
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

	function NewTodo({todoDescrRef, handleAddTodo}) {
		return(
			<form onSubmit={ e => e.preventDefault() }>
				<input ref={todoDescrRef} type="text" size="150"/>
				<button type="submit" onClick={handleAddTodo} >Add Todo</button>
			</form>
		)
	}
	
	/*
	 logic for EditForm
	*/

	function editTodo(todo) {
		// auto focus description field
		setTodoToEdit(todo)
		updateProjectList()
		updateContextList()
		setEditFormVisible(true)
	}

	function handleChange(e) {
		setTodoToEdit({
			...todoToEdit,
			[e.target.name]: e.target.value
		})
	}
	
	function formatDate(theDate) {
		if(!theDate) return ''
		theDate = typeof theDate === "string" ? new Date(theDate) : theDate
		return theDate.toISOString().split('T')[0]
	}

	function handleSubmit(e) {
		// TODO validation: project and context names must be camelCase or single word
		// TODO tab updates and moves to next field, enter updates and hides form
		
		e.preventDefault()
		const tasks = [...todos]
		const editIndex = todos.findIndex( todo => todo.id === todoToEdit.id )
		tasks[editIndex] = todoToEdit
		setTodos(tasks)
		setEditFormVisible(false)
	}

	/* end EditForm */

	return (
		<div className="App">
			<Navigation tempContent={"Navigation"}/>
			<div id="todo-list">
				<NewTodo todoDescrRef={todoDescrRef} handleAddTodo={handleAddTodo} />
				<Todolist todos={todos} toggleCompleted={toggleCompleted} editTodo={editTodo} />
			</div>
		{ editFormVisible &&
			<EditForm
				todoToEdit={todoToEdit}
				projects={projects}
				contexts={contexts}
				handleChange={handleChange}
				formatDate={formatDate}
				handleSubmit={handleSubmit}
			/> }
		</div>
	);
}

export default App;

